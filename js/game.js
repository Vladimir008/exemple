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
	this.migrationPoputation = function(elem){
		console.log(elem);
	}
	this.progress = function(){
		console.log("Новый ход");
		console.log("----------");
		//progress population
		let arPops = document.getElementsByClassName(population.class);

		for (i = 0; i < arPops.length; i++) {
			let data = population.readData(arPops[i]).getData();
			// population growth				
			//console.log(this.params.populationGrowthIndex);
			data.count = Number(data.count);
			data.count += Number((data.count * this.params.populationGrowthIndex).toFixed()); 
			if (data.count>100){
				 let first_count = data.count - 40,
				 	 second_count = data.count - first_count,
				 	 PopsNew = arPops[i].cloneNode();
				 console.log( data.count,first_count,second_count);
				 data.count = second_count;
				 arPops[i].parentNode.appendChild(PopsNew);
				 population.update(data).writeData(PopsNew);
				 this.migrationPoputation(PopsNew);
				 data.count = first_count;
			}
			// save population
			population.update(data).writeData(arPops[i]);
		}
	};
}




$(document).ready(function(){
	var g = new game();
	g.create();
	$("#button-progress").click(function(){
			g.progress();		
	});
});
