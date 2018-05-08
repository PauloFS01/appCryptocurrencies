angular.module('ApiExchanges')
    .controller('BlockchainController', function($scope, $http, $timeout,$interval, buscador) {



        var meusServicos = buscador.getServico();
        var endpoint = "https://blockchain.info/pt/ticker"
        $scope.resultado = [];
        $scope.chaves = [];
        $scope.mensagem = {} ;        

        function atualisaLista(){
            if(meusServicos.estado(endpoint)){
                console.log('Nao fez a busca');
                extrair(meusServicos.resultado(endpoint));
            }else{
                telaLoad();
                meusServicos.busca(endpoint)
                .then(function(dados){
                    console.log('Fez a busca');
                    extrair(dados);
                    $timeout(function(){telaLoad();},500);
                })
                .catch(function(err){
                    console.log(err);
                    $scope.mensagem = err.mensagem;
                    $timeout(function(){telaLoad();},500);
                    erro();                    
                });
            }

        }

        function extrair(obj){
            var i = 0;
            $scope.chaves = Object.keys(obj);
            angular.forEach(obj,function(){
            
                $scope.resultado[i] = obj[$scope.chaves[i]];
                ++i;
            })
        };

        function telaLoad(){
            var tela = document.querySelector("#loadScreen");
            tela.classList.toggle("hide");
        };
        function erro(){
            var tela = document.querySelector(".mensagemErro");
            tela.classList.toggle("hide");
        };        

       

        atualisaLista();
        $interval(function(){ console.log('atualizacao temporaria'); atualisaLista();},360000);

    });    