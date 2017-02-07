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
			     {count:59,x:1,y:2},
			     //{count:randomInt(10,40),x:14,y:14}, 
			],
			populationGrowthIndex : 0.1,
		}		
	}
	this.params = this.getParams();
	this.year = 1;
	this.create = function(){
		////console.log(this);
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
	this.findPlacePopulation = function(x,y){
		let	new_x = x - 1,
			new_y = y - 1;
		while (new_x <= x+1){
			if (new_x>0 && new_x<=this.params.row){
				new_y = y - 1;
				while (new_y <= y+1){
					////console.log(new_x,new_y);
					if (new_y>0 && new_y<=this.params.col){
						let findPop = document.querySelector(".population[data-x='"+new_x+"'][data-y='"+new_y+"']");						
						if (findPop==null && (new_x!=x || new_y != y)){							
							return {x:new_x,y:new_y};	
						}
					}
					new_y = new_y + 1;
				}
			}
			new_x = new_x +1;
		}
		return false;
	}
	this.migrationPoputation = function(elem){
		// findPlace
		let data = population.readData(elem).getData();
		data.x = Number(data.x);
		data.y = Number(data.y);
		let newPlace = this.findPlacePopulation(data.x,data.y);
		
		if (newPlace!=false){
			 console.log(123);
			 document.querySelector(".map-cell[data-x='"+newPlace.x+"'][data-y='"+newPlace.y+"']").appendChild(elem);
			 population.update({x:newPlace.x,y:newPlace.y}).log().writeData(elem);
		}
		else{elem.remove()}
	}
	this.progress = function(){
		//console.log("Новый ход");
		//console.log("----------");
		//progress population
		let arPops = document.getElementsByClassName(population.class);
		console.log(1,arPops);
		for (i = 0; i < arPops.length; i++) {
			let data = population.readData(arPops[i]).getData();
			// population growth				
			
			data.count = Number(data.count);
			data.count += Number((data.count * this.params.populationGrowthIndex).toFixed()); 
			if (data.count>100){
				// population separation
				let  first_count = data.count - 40,
				 	 second_count = data.count - first_count,
				 	 PopsNew = arPops[i].cloneNode();
				 
				 population.update({count:first_count}).reset(data).writeData(arPops[i]); 
				
				 arPops[i].parentNode.appendChild(PopsNew);
				 population.update({count:second_count,year:this.year}).log().writeData(PopsNew);
				 console.log(2,arPops);
				 this.migrationPoputation(PopsNew);
				 data.count = first_count;
			}
			else{
				population.reset(data).writeData(arPops[i]);
			}
			// save population
			
		}
		
		this.year += 1;
	};
}




$(document).ready(function(){
	var g = new game();
	g.create();
	$("#button-progress").click(function(){

		for (var i = 1; i<=10;i++){	
			g.progress();
		}	
	});
});
