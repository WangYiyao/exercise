function test(){
	var txt10 = document.createTextNode("my");
	var node1 = document.createElement("em");
	node1.appendChild(txt10);
	var txt00 = document.createTextNode("This is");
	var txt03 = document.createTextNode("content.");
	var node0 = document.createElement("p");
	node0.appendChild(txt00);
	node0.appendChild(node1);
	node0.appendChild(txt03);
	var tr = document.getElementById("testdiv");
	tr.appendChild(node0);
}
window.onload = test();