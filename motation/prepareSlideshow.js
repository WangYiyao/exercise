function prepareSlideshoe(){
	if(!document.getElementsByName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("linklist")) return false;
	if(!document.getElementById("preview")) return false;

	var preview = document.getElementById("preview");
	preview.style.position = "absolute";
	preview.style.left = "0px";
	preview.style.top = "0px";

	var list = document.getElementById("linklist");
	var lists = document.getElementsByTagName("a");
	lists[0].onmouseover = function(){
		moveElement("preview",-100, 0, 10);
	}
	lists[1].onmouseover = function(){
		moveElement("preview", -200, 0, 10);
	}
	lists[2].onmouseover = function(){
		moveElement("preview", -300, 0, 10);
	}

}

addLoadEvent(prepareSlideshoe);