
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

// Сущности

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

var Population = function(obj){
	this.default_data = {
		 //id:0,
		 x:0,
		 y:0,
		 count:2,
	 };
	this.class="population";
	return this.reset(obj);
}
Population.prototype = Object.create(constr.prototype);
Population.prototype.constructor = Population;

var cell = new mapCell(); 
var population = new Population();



// Игра
function game(){
	this.getParams = function(){
		return {
			target:$("#map"),
			col:15,
			row:15,
			population:[
			     {count:randomInt(10,40),x:1,y:2},
			     {count:randomInt(10,40),x:1,y:3},
			     {count:randomInt(10,40),x:1,y:4},
			     {count:randomInt(10,40),x:1,y:5},
			     {count:randomInt(10,40),x:1,y:6},
			     {count:randomInt(10,40),x:1,y:7},
			     {count:randomInt(10,40),x:1,y:8},
			     {count:randomInt(10,40),x:1,y:9},
			     {count:randomInt(10,40),x:1,y:10},
			     {count:randomInt(10,40),x:5,y:3},
			     {count:randomInt(10,40),x:4,y:8},
			     {count:randomInt(10,40),x:2,y:3}
			],
			populationGrowthIndex : 0.1,
		}		
	}
	this.params = this.getParams();
	this.create = function(){
		console.log(this);
		// creating map
		$map = this.params.target;
		for (var i = 1; i<=this.params.row;i++){
			for (var j = 1; j<=this.params.col;j++){
				let id = (i-1)*this.params.row + j;
				let style = "width:"+(100/this.params.col) + "%; height:"+(100/this.params.col)+"%";
				$map.append(cell.reset({id:id,x:i,y:j}).html({style:style}));
			}
		}
		// creating first population
		this.params.population.forEach(function(item) {
			var $map_cell = $(".map-cell[data-x="+item.x+"][data-y="+item.y+"]");
			$map_cell.append(population.reset(item).html());
			
		});
	}
	this.progress = function(){
		console.log("Новый ход");
		console.log("----------");
		//progress population
		let arPops = document.getElementsByClassName(population.class);

		for (i = 0; i < arPops.length; i++) {
			let data = population.readData(arPops[i]).getData();
			let data2 = population.readData(arPops[i]).getData();
			// population growth				
			//console.log(this.params.populationGrowthIndex);
			data.count = Number(data.count);
			data.count += Number((data.count * this.params.populationGrowthIndex).toFixed()); 
			console.log(data.count,this.params.populationGrowthIndex);
			// save population
			population.update(data).writeData(arPops[i]);
		}
	}
}




$(document).ready(function(){
	var g = new game();
	g.create();
	$("#button-progress").click(function(){
			g.progress();		
	});
});

