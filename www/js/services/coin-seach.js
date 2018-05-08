angular.module('buscaMoedas',[])
    .service('buscador', function($http, $q) {

        var service = {};
        var resultado = [];
        var resultadoForeig = [];
        var ultimaConsulta = [];

        service.busca = function(endpoint){
            return $q(function(resolve, reject){
                $http.get(endpoint)
                .success(function(retorno){
                    resultado[endpoint] = retorno;
                    ultimaConsulta[endpoint] = new Date();
                    resolve(retorno)
                })
                .error(function(erro){
                    console.log(erro);
                    reject({mensagem: 'erro ao consutar dados'});
                })                
            })
        }   
        service.estado = function(endpoint){
            var camparacao = new Date();
            var subtraiMinutos = new Date().getMinutes() -5;
            camparacao.setMinutes(subtraiMinutos);      
                  
            if(!ultimaConsulta[endpoint] | ultimaConsulta[endpoint] < camparacao){
                return false;
            }else{
                return true;   
            }            

        }

        service.resultado = function(endpoint) {
            return resultado[endpoint];
        }

        return {
            getServico : function(){
                return service;
            },
            setForeing : function(dados){
                resultadoForeig = dados;
            },
            getForeing : function(){
                return resultadoForeig;
            }
        }

});