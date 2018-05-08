angular.module('ApiExchanges')
    .controller('ChartController', function($scope, $http, findDataChartBCK) {

    	var meusServicos = findDataChartBCK.getItem();
    	var resultado = [];
        $scope.periodoOP = [ 
		    {
		    	descricao: '1 Sem',
		        valor:'https://api.blockchain.info/charts/market-price?timespan=1week&rollingAverage=8hours&format=json' 
		    },        		   
		    {
		    	descricao: '15 Dias',
		        valor: 'https://api.blockchain.info/charts/market-price?timespan=2week&rollingAverage=8hours&format=json'
		    },
		    {
		    	descricao: '1 Mês',
		        valor: 'https://api.blockchain.info/charts/market-price?timespan=1months&rollingAverage=8hours&format=json'
		    }
	    ];	
	    $scope.mensagem = {};

		function atualisaLista(){
			if(meusServicos.infoEstado()){
				resultado = findDataChartBCK.getDadosMontados();
				console.log('Nao fez uma busca');
				$scope.novaConsulta('https://api.blockchain.info/charts/market-price?timespan=1week&rollingAverage=8hours&format=json');			
			}else{
				meusServicos.buscaDados()
				.then(function(dados){
					resultado = dados;
					$scope.novaConsulta('https://api.blockchain.info/charts/market-price?timespan=1week&rollingAverage=8hours&format=json');
					console.log('Fez uma busca');
				})
				.catch(function(err){
					console.log(err);
					$scope.mensagem = err.mensagem;
					erro();
				})	
			}
		}        

	    $scope.geraGraficoBck = function(dados){

	    	var minhasDatas = dados.map((dado)=>{
				var data = new Date(dado.x*1000).getDate();
				return data;
			});

			meusValores = dados.map((dado)=> dado.y);

			var ctx = document.getElementById('myChart').getContext('2d');
			var chart = new Chart(ctx, {
			    // The type of chart we want to create
			    type: 'line',
			    // The data for our dataset
			    data: {
			        labels: minhasDatas,
			        datasets: [{
			        	borderWidth: 1.5,
			        	pointStyle: 'line',
			            label: "Bitcoin by Blockchain",
				        backgroundColor: 'transparent',
			            borderColor: '#ff6d00',
			            data: meusValores,
			        }]
			    },
			    // Configuration options go here
			    options: {
			    }
			});	    
	    }

	    $scope.novaConsulta = function(endpoint){
	    	console.log(endpoint);
	    	$scope.geraGraficoBck(resultado[endpoint]);			  	
	    }

	    atualisaLista();

        function erro(){
            var tela = document.querySelector(".mensagemErroChart");
            tela.classList.toggle("hide");
        };  	    

    });