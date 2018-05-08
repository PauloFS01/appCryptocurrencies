angular.module('minhaBuscaChart',[])
    .service('findDataChartCdk', function($http, $q) {

        var resultadoCdk =  'ok' ;
        var ultimaConsulta ='';
        var service = {};

        service.buscaDados = function (endpoint){

            return $q(function(resolve, reject){
                $http.get(endpoint)// para testar no dispositivo'http://192.168.2.102:3000'
                .success(function(retorno) {
                resultadoCdk = retorno;
                resolve(retorno);
                ultimaConsulta = new Date();
               
                })
                .error(function(erro){
                    console.log('erro ao acessar dados tente novamente mais tarde: ' + erro);
                    reject({mensagem: 'erro ao acessar dados' })
                });
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
                return resultadoCdk;
            }
        }   
    });