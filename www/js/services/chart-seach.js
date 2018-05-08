angular.module('minhaBusca',[])
    .service('findDataChartBCK', function($http, $q) {

    	var ultimaConsulta ='';  	
    	var arrayEndPoint = ['https://api.blockchain.info/charts/market-price?timespan=1week&rollingAverage=8hours&format=json',
        'https://api.blockchain.info/charts/market-price?timespan=2week&rollingAverage=8hours&format=json',
        'https://api.blockchain.info/charts/market-price?timespan=1months&rollingAverage=8hours&format=json'];

        var resultado = [];
        var service = {};     

        service.buscaDados = function(){
            return $q(function(resolve, reject){
                angular.forEach(arrayEndPoint,function(endpoint){
                    console.log(endpoint);
                    $http.get(endpoint)// para testar no dispositivo'http://192.168.2.102:3000'
                    .success(function(retorno) {
                        console.log(retorno);
                        resultado[endpoint] = retorno.values; 
                        if(endpoint == 'https://api.blockchain.info/charts/market-price?timespan=1months&rollingAverage=8hours&format=json'){
                            ultimaConsulta = new Date();
                            resolve(resultado);
                        }                                                    
                    })
                    .error(function(erro) {
                        console.log(erro);
                        reject({mensagem : 'erro ao buscar dados'});
                    })                 
                })    
            })
        }

        service.infoEstado = function(){

            var camparacao = new Date();
            var subtraiMinutos = new Date().getDay() -1;
            camparacao.setDate(subtraiMinutos);  
            if(ultimaConsulta == '' | ultimaConsulta < camparacao){
                return false;
            }else{
                return true;
            }
        }
     	return {
    		getItem: function(){
                return service;
    		},
    		getDadosMontados: function(){
    			return resultado;                
    		}
        }      

    })