	function render(element, jsonData){
		switch(true){
		case Array.isArray(jsonData):
			var item, old = element.cloneNode(true), fragment = document.createDocumentFragment();
			for(item in jsonData){
				if(jsonData.hasOwnProperty(item)){
					fragment.appendChild(loopy(old, jsonData[item]));
				}
			}
			element.parentNode.replaceChild(fragment, element);
			return;
		case typeof jsonData === "object":
			element.parentNode.replaceChild(loopy(element, jsonData), element);
		}
	}

	function loopy(parentElement, jsonData){
		var attr, element;
		parentElement = parentElement.cloneNode(true);
		for(attr in jsonData){
			if(jsonData.hasOwnProperty(attr) && (element = parentElement.querySelector('[name=' + attr + '], .' + attr+ ', #' + attr+', [data-h=' + attr + ']'))) {
				if(typeof jsonData[attr] === "object" && !Array.isArray(jsonData[attr])){
					render(element, jsonData[attr]);
				}else {
					assignText(element, jsonData[attr]);
				}
			}
		}
		return parentElement;
	}

	function assignText(element, value){
		switch(element.tagName){
		case "INPUT":
			element.setAttribute('value', value);
			return;
		}
		element.textContent = value;
	}
