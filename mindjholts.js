'use strict';
var m = {
	render: function (element, obj){
		if(!element){
			return console.warn('No element supplied');
		}
		if(Array.isArray(obj)){
			var item, clone = element.cloneNode(true), fragment = document.createDocumentFragment();
			for(item in obj){
				if(obj.hasOwnProperty(item)){
					fragment.appendChild(m.recurser(clone, obj[item]));
				}
			}
			element.parentNode.replaceChild(fragment, element);
		}else if(typeof obj === 'object'){
			element.parentNode.replaceChild(m.recurser(element, obj), element);
		}else{
			m.assignValue(element, obj);
		}
	},
	json: function(element, jsonData){
		if(jsonData === '' || typeof jsonData !== 'string') return;

		try{
			jsonData = JSON.parse(jsonData);
		}catch(e) {
			return console.error(e);
		}
		m.render(element, jsonData);
	},
	recurser: function(parentElement, obj){
		var querySelector = [], element;
		parentElement = parentElement.cloneNode(true);
		for(var attr in obj){
			if(obj.hasOwnProperty(attr)){
				//Check if attribute is an integer. Not using typeof here because JavaScript converts integer object keys to strings.
				if(typeof attr === 'number' || attr === ~~attr + ''){
					querySelector = ':nth-child(' + (~~attr + 1) + ')';
				}else{
					if (!attr.startsWith('#')){
						querySelector.push('#' + attr);
					}
					querySelector.push('[name=' + attr + ']');
					if (!attr.startsWith('.')) {
						querySelector.push('.' + attr);
					}
					if (!attr.startsWith('#') && !attr.startsWith('.')) {
						querySelector.push(attr);
					}
					querySelector = querySelector.join(',');
				}
				if(element = parentElement.querySelector(querySelector)){
					if(typeof obj[attr] === 'object' && !Array.isArray(obj[attr])){
						m.render(element, obj[attr]);
					}else{
						m.assignValue(element, obj[attr]);
					}
				}else{
					console.log('No element found for', querySelector, 'with contents', obj[attr]);
				}
			}
		}
		return parentElement;
	},
	assignValue: function(element, value){
		switch(element.tagName){
			case 'INPUT': return element.setAttribute('value', value);
			case 'IMG': return element.setAttribute('src', value);
			case 'BR' || 'HR': return;
			default: element.textContent = value;
		}
	}
};
