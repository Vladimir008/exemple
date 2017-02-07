// Ячейка
var mapCell = function(obj){
	this.default_data = {
		 id:0,
		 x:0,
		 y:0,
	 };
	this.class="map-cell";
	return this.reset(obj);
}
mapCell.prototype = Object.create(constr.prototype);
mapCell.prototype.constructor = mapCell;
// Попупляция
var Population = function(obj){
	this.default_data = {
		 //id:0,
		 x:0,
		 y:0,
		 count:2,
		 year:0,
	 };
	this.class="population";
	return this.reset(obj);
}
Population.prototype = Object.create(constr.prototype);
Population.prototype.constructor = Population;