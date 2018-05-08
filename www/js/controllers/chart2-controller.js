angular.module('ApiExchanges')
    .controller('Chart2Controller', function($scope, $http, $filter, findDataChartCdk) {

		$scope.disaclamer = '';
		$scope.mensagem = {} ;
		var endpoint = endPointCdk();// 'http://192.168.2.102:3000/charts/cdkCharts'
		var meusServicos = findDataChartCdk.getItem();

		function atualisaListaCdk(){			
			if(meusServicos.infoEstado()){
				var dados = findDataChartCdk.getDadosMontados();
				$scope.geraGraficoCdk(dados);
				$scope.disaclamer = findDataChartCdk.getDadosMontados().disclaimer;
			}
			else{
				meusServicos.buscaDados(endpoint)
				.then(function(dados){
					$scope.geraGraficoCdk(dados);
					$scope.disaclamer = dados.disclaimer;
				})
				.catch(function(err){
					console.log(err);
					$scope.mensagem = err.mensagem;
					erro();
				})
			}
		}

	    $scope.geraGraficoCdk = function(dados){
	    	var minhasDatas = Object.keys(dados.bpi);
	    	var i = 0;
			var meusValores =[];

			novasDatas = minhasDatas.map((dado)=> {
				return dado[8] + dado[9];
			});
			angular.forEach(minhasDatas,function(value){
				meusValores[i] = dados.bpi[value];
				i++;				
			})

			$scope.mensagem = meusValores;

			var ctx = document.getElementById('myChart2').getContext('2d');
			var chart = new Chart(ctx, {
			    // The type of chart we want to create
			    type: 'bar',

			    // The data for our dataset
			    data: {
			        labels: novasDatas,
			        datasets: [{
			        	borderWidth: 0.3,
			        	pointStyle: 'line',
			            label: "Bitcoin by Coindesk",
			            data: meusValores,
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

			    // Configuration options go here
			    options: {
			    }
			});	    

	    };

        function erro(){
            var tela = document.querySelector(".mensagemErroChart");
            tela.classList.toggle("hide");
        }; 	    

	    atualisaListaCdk();
	   // $scope.geraGraficoCdk();

	   function endPointCdk(){
		   	var endDate = dataFormat(new Date());
		   	var startDate = dataFormat (previousDate());
		   	var myEndpoint = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + startDate + '&end=' + endDate;
		   	console.log(myEndpoint);
		   	return myEndpoint;
	   }

	   function previousDate(){
	   		var data = new Date();
	   		var novaData = new Date().getDate() - 6;
	   		data.setDate(novaData);
	   		return data;
	   }

	    function dataFormat(data){
    		var newDate = $filter('date')(data, 'yyyy-MM-dd');
    		return newDate;
    	};


    	endPointCdk();

//https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-03-21&end=2018-03-27
	    
/*
	    function dataFormat(data){
    		var newDate = $filter('date')(data, 'yyyy-MM-dd');
    		var endDate = newDate;
    	};
    	dataFormat(new Date());*/    

 


});

