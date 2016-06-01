function insertAfter(newElement, targetElement){
	var parents = targetElement.parentNode;
	if(parents.lastChild == targetElement)
		parents.appendChild(newElement);
	else{
		parents.insertBefore(newElement,targetElement.nextSibling);
	}
}

function showPic(whichpic)
{
	//if(!document.getElementById("placeholder"))
		//return false;	

	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	//if(placeholder.nodeName != "IMG")
		//return false;
	placeholder.setAttribute("src",source);
	//if(document.getElementById("description")){
		var text = whichpic.getAttribute("title");
		var description = document.getElementById("description");
		//if(description.firstChild.nodeType == 3)
			description.firstChild.nodeValue = text;
	//}
	//alert("1");
	//return false;
}

function preparePlaceholder(){
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","image/blank.jpg");
	placeholder.setAttribute("alt","Put an image here");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var txt = document.createTextNode("choose an image");
	description.appendChild(txt);
	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
}

function prepareGallery(){
	//if(!document.getElementsByTagName) 
		//return false;
	//if(! document.getElementById)
		//return false;

	//var links = document.getElementById("imagegallery").getElementsByTagName("a");
	//for (var i = 0; i < links.length; i++) {
		//links[i].onclick = function(){
			//showPic(links[0]);
		//}
		//links[i].onkeypress = links[i].onclick;
	//}
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i = 0; i<4;i++){
		links[0].onclick = showPic(links[i]);
		//}
	}
}

function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}
	else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

/*function countBodyChildren(){
	var body_element = document.getElementsByTagName("body")[0];
	alert(body_element.childNodes.length);
}

window.onload = countBodyChildren();   //页面加载时调用*/