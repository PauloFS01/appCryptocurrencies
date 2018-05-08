angular.module('buscaCurrencies',[])
    .service('findDataCurrencie', function($http,$q) {
    	var service ={};
    	var result = {};
    	var ultimaConsulta = '';


    	service.buscaDados = function(endpoint){
    		return $q(function(resolve, reject){
		    	$http.get(endpoint)
		    	.success(function(retorno){
		    		result = retorno;
		            ultimaConsulta = new Date();
		            resolve(retorno);
		    	})
		    	.error(function(erro){
		    		console.log(erro);
		    		reject({
		    			mensagem: 'erro ao buscar dados'
		    		})
		    	});     			
    		})
    	};

        service.infoEstado = function(){
            var camparacao = new Date();
            var subtraiMinutos = new Date().getMinutes() -5;
            camparacao.setMinutes(subtraiMinutos);   
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
    		dadosMontados: function(){
    			return result;
    		}
    	}


    })