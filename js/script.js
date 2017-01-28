
// # РАЗДЕЛ 0 - Вспомогательные функции
function randomInteger(min, max) {
				var rand = min - 0.5 + Math.random() * (max - min + 1)
				rand = Math.round(rand);
				return rand;
}

function constructor(obj){
	this.reset = function(obj){
		 this.default_data = {
			 x:{value:0},
			 y:{value:0},
			 count:{value:0},
		 };
		
		 this.data = $.extend(default_data,obj);
		return this;
	};
	return this.reset(obj);
}
/*function GetStrXml(name,value){	
	var str = "",
		recurs = false,
		type = typeof value,
		show = true;
	
	switch (type){
		case "object":
			recurs = true;
			break;
		case "function":
			show = false;
		break;		
	}	
	str = "<"+name+" data-type_value='"+type+"'>";
	if (recurs){
		for (var key in value) {
			str += GetStrXml(key,value[key]);   
		}
	}
	else{
		str += value;
	}
	str += "</"+name+">";
	return str;
};
// РАЗДЕЛ 1 - Основные классы - модель
// Основной конструктор
function Constructor(obj){
	this.reset = function(obj){
		var default_property = {x:1};
		this.property = $.extend(default_property,obj);
		return this;
	};
	return this.reset(obj);
}
Constructor.prototype.xmlTarget = "property";
Constructor.prototype.update = function(obj){
	this.property = $.extend(this.property,obj);
	return this;
}
Constructor.prototype.log = function(){
	console.log(this.property);
	return this;
}
Constructor.prototype.createXml = function(target){
	target.html(GetStrXml(this.xmlTarget,this.property));
	//console.log();
	return this;
};

//Популяция
var Population = function(obj){
	//this.xmlTarget = "population";
	this.reset = function(obj){
		var default_property = {count:0,position:{x:0,y:0}};
		this.property = $.extend(default_property,obj);
		return this;
	};
	return this.reset();
}
Population.prototype = Object.create(Constructor.prototype);
Population.prototype.constructor = Population;

 // # Раздел 3 - логика игры 
var population = new Population();

function game(){
	this.map = {
		target:$("#map"),
		col:15,
		row:15,
	}
	this.map.create = function(){
		console.log();
		$map = this.target;
		//console.log(map);
		for (var i = 1; i<=this.row;i++){
			for (var j = 1; j<=this.col;j++){
				$map.append("<div class='map-cell'"+
							" data-row="+i+
							" data-col="+j+
							" style='width:"+100/this.row+"%;height:"+100/this.col+"%'>"+
							"</div>");
			}
		}
	};
	this.population= {
		list :[
		     {count:10,position:{x:1,y:1}},
		     {count:20,position:{x:5,y:3}},
		     {count:15,position:{x:4,y:8}},
		     {count:14,position:{x:2,y:3}}
		]
	}
	
	this.population.create = function (){
		
		this.list.forEach(function(item) {
			var $map_cell = $(".map-cell[data-col=" + item.position.x + "][data-row=" + item.position.y + "]");
			$map_cell.append("<div class='population'></div>");
			population.reset().update(item).createXml($map_cell.find(".population"));
		});
	}
	this.create = function(){
		this.map.create();
		this.population.create();
	}
}

var pop2 = new Population();
var pop = new Constructor();


$(document).ready(function(){
	var g = new game();
	g.create();
});
*/