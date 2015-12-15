   function render(element, jsonData){
      switch(true){
      case Array.isArray(jsonData):
         var item, old = element.cloneNode(true), frag = document.createDocumentFragment();
         for(item in jsonData){
            if(jsonData.hasOwnProperty(item)){
               frag.appendChild(loopy(old, jsonData[item]));
            }
         }
         element.parentNode.replaceChild(frag, element);
         return;
      case typeof jsonData === "object":
         element.parentNode.replaceChild(loopy(element, jsonData), element);
      }
   }

   function loopy(old, temp){
      var attr, ele, newCopy = old.cloneNode(true);
      for(attr in temp){
         if(temp.hasOwnProperty(attr) && (ele = newCopy.querySelector('[name=' + attr + '], .' + attr+ ', #' + attr))) {
            if(typeof temp[attr] === "object" && !Array.isArray(temp[attr])){
               render(ele, temp[attr]);
            }else {
               assignText(ele, temp[attr]);
            }
         }
      }
      return newCopy;
   }

   function assignText(element, value){
      switch(element.tagName){
      case "INPUT":
         element.value = value;
         return;
      }
      element.textContent = value;
   }
