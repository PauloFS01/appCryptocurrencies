
var dayName = new Array ("Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab");
var xhttp = new XMLHttpRequest();
var endpoint = 'bckChartSem';//alterar o valor atravez do evento de clique

xhttp.open("GET", "http://localhost:3000/exchangesBR/" + endpoint, true);

xhttp.addEventListener("load", function() {
    var dados = JSON.parse(xhttp.responseText).values;
   
   	minhasDatas = dados.map((dado)=>{

		var data = dayName[new Date(dado.x*1000).getDay()];
		return data;

	});

	meusValores = dados.map((dado)=> dado.y);



	var ctx = document.getElementById('myChart2').getContext('2d');
		var chart = new Chart(ctx, {
		    // The type of chart we want to create
		    type: 'line',

		    // The data for our dataset
		    data: {
		        labels: minhasDatas,
		        datasets: [{
		        	borderWidth: 0.3,
		        	pointStyle: 'line',
		            label: "My First dataset",
		            backgroundColor:'#e3f2fd',
		            borderColor: '#3f51b5',
		            data: meusValores,
		        }]
		    },

		    // Configuration options go here
		    options: {}
		});

  });

xhttp.send();

/*	dados = {
	  "status": "ok",
	  "name": "Market Price (USD)",
	  "unit": "USD",
	  "period": "day",
	  "description": "Average USD market price across major bitcoin exchanges.",
	  "values": [
	    {
	      "x": 1520726400,
	      "y": 9761.396666666666
	    },
	    {
	      "x": 1520812800,
	      "y": 9182.843333333332
	    },
	    {
	      "x": 1520899200,
	      "y": 9154.699999999999
	    },
	    {
	      "x": 1520985600,
	      "y": 8151.531666666667
	    },
	    {
	      "x": 1521072000,
	      "y": 8358.121666666666
	    },
	    {
	      "x": 1521158400,
	      "y": 8530.402
	    }
	  ]
	}

	var dadosMtb = [
 
  
	  {
	    "date": 1521382552,
	    "price": 25100.1,
	    "amount": 0.03292,
	    "tid": 2256980,
	    "type": "sell"
	  },
	  {
	    "date": 1521382575,
	    "price": 25125.2001,
	    "amount": 0.01657521,
	    "tid": 2256981,
	    "type": "sell"
	  },
	  {
	    "date": 1521382575,
	    "price": 25100.1,
	    "amount": 0.00528479,
	    "tid": 2256982,
	    "type": "sell"
	  },
	  {
	    "date": 1521382626,
	    "price": 25150,
	    "amount": 0.02147117,
	    "tid": 2256983,
	    "type": "buy"
	  },
	  {
	    "date": 1521382641,
	    "price": 25125.20012,
	    "amount": 0.03876952,
	    "tid": 2256984,
	    "type": "sell"
	  },
	  {
	    "date": 1521382641,
	    "price": 25125.20011,
	    "amount": 0.01660299,
	    "tid": 2256985,
	    "type": "sell"
	  },
	  {
	    "date": 1521382641,
	    "price": 25102,
	    "amount": 0.02823786,
	    "tid": 2256986,
	    "type": "sell"
	  },
	  {
	    "date": 1521382653,
	    "price": 25150,
	    "amount": 0.01937376,
	    "tid": 2256987,
	    "type": "buy"
	  }
	]

minhasDatasMtb = dadosMtb.map((dado)=>{

		var hora = new Date(dado.date*1000).getHours();
		var minutos = new Date(dado.date*1000).getMinutes();
		var time = hora + ':'+ minutos;
		return time;

	});

	meusValoresMtb = dadosMtb.map((dado)=> dado.price);



	var ctx = document.getElementById('myChart').getContext('2d');
		var chart = new Chart(ctx, {
		    // The type of chart we want to create
		    type: 'line',

		    // The data for our dataset
		    data: {
		        labels: minhasDatasMtb,
		        datasets: [{
		        	lineTension:0.1,
		        	borderWidth: 5,
		            label: "Bitcon",
		            backgroundColor:'transparent',
		            borderColor: '#f39c12	',
		            data: meusValoresMtb,
		        }]
		    },

		    // Configuration options go here
		    options:{}

		});


minhasDatas = dados.values.map((dado)=>{

		var data = dayName[new Date(dado.x*1000).getDay()];
		return data;

	});

	meusValores = dados.values.map((dado)=> dado.y);


		var ctx = document.getElementById("myChart2").getContext('2d');
		var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: minhasDatas,
		        datasets: [{
		            label: 'Bitcoin',
		            data:  meusValores,
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.2)',
		                'rgba(54, 162, 235, 0.2)',
		                'rgba(255, 206, 86, 0.2)',
		                'rgba(75, 192, 192, 0.2)',
		                'rgba(153, 102, 255, 0.2)',
		                'rgba(255, 159, 64, 0.2)'
		            ],
		            borderColor: [
		                'rgba(255,99,132,1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)',
		                'rgba(255, 159, 64, 1)'
		            ],
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});

*/

/*var xhttp2 = new XMLHttpRequest();

xhttp.open("GET", "http://localhost:3000/exchangesBR/mbtcharts", true);

xhttp.addEventListener("load", function() {
    var dadosMtb = JSON.parse(xhttp.responseText);
    var inicio = 0;
    var e = 0;
    console.log(dadosMtb[0].date);

    if(dadosMtb.length > 8){
    	inicio = dadosMtb.length - 8;
    };

    

    for (var  i = inicio; i < dadosMtb.length; i++){
    	console.log(i);
		
    	minhasDatasMtb[e] = '';
    	meusValoresMtb[e] = dadosMtb[i].price;
    	e++;

    };

	var ctx = document.getElementById('myChart').getContext('2d');
	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'line',

	    // The data for our dataset
	    data: {
	        labels: minhasDatasMtb,
	        datasets: [{
	        	borderWidth: 0.1,
	        	pointStyle: 'line',
	            label: "My First dataset",
	            backgroundColor:'#ffe0b2',
	            borderColor: '#ff9800',
	            data: meusValoresMtb,
	        }]
	    },

	    // Configuration options go here
	    options: {}
	});

});

xhttp.send();
*/