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

function insertAfter(newElement, targetElement){
	var parents = targetElement.parentNode;
	if(parents.lastChild == targetElement)
		parents.appendChild(newElement);
	else{
		parents.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass(element, value){
	if(!element.className)
		element.className = value;
	else{
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

function highlightPage(){
	var headers = document.getElementsByTagName('header');
	if(headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if(navs.length == 0) return false;
	var links = navs[0].getElementsByTagName('a');
	var linkurl;
	for(var i = 0; i < links.length; i++){
		linkurl = links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl) != -1){
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}

function moveElement(elementID, final_x, final_y, interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.movement)
		clearTimeout(elem.movement);
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);

	if(xpos == final_x && ypos == final_y)
		return true;
	if(xpos < final_x)
		xpos++;
	if(xpos > final_x)
		xpos--;
	if(ypos < final_y)
		ypos++;
	if(ypos > final_y)
		ypos--;

	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"', "+final_x+", "+final_y+")";
	elem.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("intro")) return false;
  var intro = document.getElementById("intro");
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id","slideshow");
  var frame = document.createElement("img");
  frame.setAttribute("src","images/frame.gif");
  frame.setAttribute("alt","");
  frame.setAttribute("id","frame");
  slideshow.appendChild(frame);
  var preview = document.createElement("img");
  preview.setAttribute("src","images/slideshow.gif");
  preview.setAttribute("alt","a glimpse of what awaits you");
  preview.setAttribute("id","preview");
  slideshow.appendChild(preview);
  insertAfter(slideshow,intro);
  var links = document.getElementsByTagName("a");
  for (var i=0; i<links.length; i++) {
    links[i].onmouseover = function() {
      var destination = this.getAttribute("href");
      if (destination.indexOf("index.html") != -1) {
        moveElement("preview",0,0,5);
      }
      if (destination.indexOf("about.html") != -1) {
        moveElement("preview",-150,0,5);
      }
      if (destination.indexOf("photos.html") != -1) {
        moveElement("preview",-300,0,5);
      }
      if (destination.indexOf("live.html") != -1) {
        moveElement("preview",-450,0,5);
      }
      if (destination.indexOf("contact.html") != -1) {
        moveElement("preview",-600,0,5);
      }
    }
  }
}

function getHTTPObject(){
	if(typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function(){
			try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
			catch(e){}

			return false;
		}
		return new XMLHttpRequest();
}

function submitFormWithAjax(whichform, thetarget){
	var request = getHTTPObject();
	if(!request)
		return false;
	var dataParts = [];
	var element;
	for(var i = 0; i < whichform.elements.length; i++){
		element = whichform.elements[i];
		dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
	}
	var data = dataParts.join('&');
	request.open('POST',whichform.getAttribute("action"), true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function(){
		if(request.readyState == 4){
			if(request.status == 200 || request.status == 0){
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if(matches.length > 0)
					thetarget.innerHTML = matches[1];
				else
					thetarget.innerHTML = '<p>Ops,sorry.</p>'
			}
			else
				thetarget.innerHTML = '<p>' + request.statusText + '</p>';
		}
	};
	request.send(data);
	return true;
}

function prepareForms(){
	for(var i =0; i<document.forms.length; i++){
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function(){
			if(!validateForm(this))
				return false;
			var article = document.getElementsByTagName('article')[0];
			if(submitFormWithAjax(this,article))
				return true;
		}
	}
	}


addLoadEvent(prepareSlideshow);
addLoadEvent(highlightPage);