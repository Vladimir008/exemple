
// # РАЗДЕЛ 0 - Вспомогательные функции
function randomInt(min, max) {
				var rand = min - 0.5 + Math.random() * (max - min + 1)
				rand = Math.round(rand);
				return rand;
}

function constr(obj){
	 this.default_data = {
		 x:0,
		 y:0,
		 count:0,
	 };
	 this.class = "constr";
}

constr.prototype.reset = function(obj){
	this.data = $.extend(this.default_data,obj);
	return this;
};
constr.prototype.constructor = function(obj){
	return this.reset(obj);
}
constr.prototype.update = function(obj){
	
	this.data = $.extend(this.data,obj);
	return this;
}
constr.prototype.getData = function(){
	return this.data;
}
constr.prototype.log = function(){
	console.log(this.data);
	return this;
}

constr.prototype.readData = function(e){
	var new_data = {};
	for (var key in e.dataset) {
		if (this.default_data[key] !==undefined) new_data[key] = e.dataset[key];
	}
	this.data = $.extend(this.default_data,new_data);
	return this;
}
constr.prototype.writeData = function(e){
	for (var key in e.dataset) {
		if (this.data[key] !== undefined)
			e.dataset[key] = this.data[key];
		else
			delete e.dataset[key];
	}
	//console.log(e.dataset);
	return this;
}

constr.prototype.html = function (obj){
	if (obj==undefined) obj = {};
	let strHtml = "";
	strHtml +="<div";
	strHtml +=" class='"+this.class+"'";
	for (var key in this.data){
		strHtml += " data-"+key+"='"+this.data[key]+"'";
	}
	if (obj.style!=undefined) strHtml += " style='"+obj.style+"'";
	strHtml +="></div>";
	return strHtml;
}




