'use strict';
var m = {
	render: function (element, jsonData){
		if(Array.isArray(jsonData)){
			var item, old = element.cloneNode(true), fragment = document.createDocumentFragment();
			for(item in jsonData){
				if(jsonData.hasOwnProperty(item)){
					fragment.appendChild(m.recurser(old, jsonData[item]));
				}
			}
			element.parentNode.replaceChild(fragment, element);
		}else if(typeof jsonData === 'object'){
			element.parentNode.replaceChild(m.recurser(element, jsonData), element);
		}
	},
	recurser: function(parentElement, jsonData){
		var querySelector, element;
		parentElement = parentElement.cloneNode(true);
		for(var attr in jsonData){
			if(jsonData.hasOwnProperty(attr)){
				//Check if attribute is an integer. Not using typeof here because Javascript converts integer object keys to strings.
				if(attr === ~~attr + ''){
					querySelector = ':nth-child(' + (~~attr + 1) + ')';
				}else{
					querySelector = '#' + attr + ', .' + attr + ', [name=' + attr + ']';
				}
				if(element = parentElement.querySelector(querySelector)){
					if(typeof jsonData[attr] === 'object' && !Array.isArray(jsonData[attr])){
						m.render(element, jsonData[attr]);
					}else{
						m.assignValue(element, jsonData[attr]);
					}
				}
			}
		}
		return parentElement;
	},
	assignValue: function(element, value){
		switch(element.tagName){
		case 'INPUT':
			element.setAttribute('value', value);
			return;
		}
		element.textContent = value;
	}
};
