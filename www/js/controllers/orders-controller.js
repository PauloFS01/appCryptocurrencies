angular.module('ApiExchanges')
    .controller('OrdersController', function($scope, $http, $timeout, findDataOrders) {

    	$scope.ordens = {};
    	$scope.mensagem = {};
    	var meusSevicos = findDataOrders.getItem();
    	var endpoint = 'https://api.bitvalor.com/v1/order_book_stats.json';
		var names =  {
		    'ARN': 'Arena Bitcoin',
		    'B2U': 'BitcoinToYou',
		    'BAS': 'Basebit',
		    'BIV': 'Bitinvest',
		    'BSQ': 'Bitsquare',
		    'BTD': 'BitcoinTrade',
		    'BZX': 'Brazilex',
		    'FLW': 'FlowBTC',
		    'FOX': 'FoxBit',
		    'LOC': 'LocalBitcoins',
		    'MBT': 'Mercado Bitcoin',
		    'NEG': 'Negocie Coins',
		    'PAX': 'Paxful',
		    'total':'Total'
        };

        function atualisaLista(){
            if(meusSevicos.infoEstado()){
               $scope.ordens = $scope.extrair(findDataOrders.getDados());
                console.log('nao fez a busca');
            }else{
            	telaLoad();
                meusSevicos.buscaDados(endpoint)
                .then(function(dados){
                    console.log('orders fez a busca');
                   $scope.ordens = $scope.extrair(dados);
                   $timeout(function(){telaLoad();},500);                    
                })
                .catch(function(err){
                    console.log(err);
                    $timeout(function(){telaLoad();},500);
                    $scope.mensagem = err.mensagem;
                    erro();
                })
            }
        }        

		 $scope.extrair = function(objOr){
	        var objDest= [];
	         var i = 0;
	        angular.forEach(objOr,function(value){
	            
	            var sigla = Object.keys(objOr)[i];
	            objDest[i] = {
	                'nome': names[sigla],
	                'compra' : value.bid,
	                'volCompra' : value.bid_vol,	                
	                'venda' : value.ask,
	                'volVenda' : value.ask_vol
	            };
	            i++;
	        });
	        objDest.pop();
	        return objDest.reverse();

		}
        function telaLoad(){
            var tela = document.querySelector("#loadScreen");
            tela.classList.toggle("hide");
        };
        function erro(){
            var tela = document.querySelector(".mensagemErro");
            tela.classList.toggle("hide");
        };  
		atualisaLista();
		setInterval(function(){ console.log('atualizacao temporaria'); atualisaLista();},360000);

    });