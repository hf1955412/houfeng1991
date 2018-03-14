function Drag(id){
	if(!id)	return;
	this.oDiv = document.getElementById(id);
	this.disX = 0;
	this.disY = 0;
	this.init();
}
Drag.prototype.init = function(){
	var _this = this;
	this.oDiv.onmousedown = function(ev){
		var oEvent = ev || event;
		_this.fnDown(oEvent);
		return false;
	}
}
Drag.prototype.fnDown = function(e){
	this.disX = e.clientX-this.oDiv.offsetLeft;
	this.disY = e.clientY-this.oDiv.offsetTop;
	var _this = this;
	document.onmousemove = function(ev){
		var oEvent = ev || event;
		_this.fnMove(oEvent);
	}
	document.onmouseup = function(){
		_this.fnUp();
	}
}
Drag.prototype.fnMove = function(e){
	// console.log(this);
	var l = e.clientX-this.disX;
	var t = e.clientY-this.disY;
	this.oDiv.style.left = l+'px';
	this.oDiv.style.top = t+'px';
}
Drag.prototype.fnUp = function(){
	document.onmousemove = null;
	document.onmouseup = null;
}