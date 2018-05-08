angular.module('ApiExchanges')
    .controller('CurrenciesController', function($scope, $http, findDataCurrencie, $timeout) {

    	$scope.btcUsd = {};
        $scope.cryptoCurrencies = {};
        $scope.mensagem = {};
        var dados = {};
        var endpoint = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,LTC,BCH,ETH,XRP,EOS,QTUM,XLM,ETC,XMR,BTG,TRX,BNB,DASH,NEO,GAS,ONT,ZEC,IOT,GVT,DGD' ;      
        var meusSevicos = findDataCurrencie.getItem();
        var nomes = {
            "LTC": "Litecoin",
            "BCH": "Bitcoin Cash",
            "ETH": "Ethereum",
            "XRP": "Ripple",
            "EOS": "EOS",
            "QTUM": "Qtum",
            "XLM": "Stellar",
            "ETC": "Ethereum Classic",
            "XMR": "Monero",
            "BTG": "Bitcoin Gold",
            "TRX": "Tronix",
            "BNB": "Binance",
            "DASH":"DiritalCash",
            "NEO": "NEO",
            "GAS": "GAS",
            "ONT": "Ontology",
            "ZEC": "ZCash",
            "IOT": "IOTA",
            "GVT": "Genesis Vision",
            "DGD": "Digix DAO"       
        }

        function atualisaLista(){
            if(meusSevicos.infoEstado()){
                $scope.btcUsd = findDataCurrencie.dadosMontados()['USD'];
                renomeia(findDataCurrencie.dadosMontados());
                console.log('nao fez a busca');
            }else{
                telaLoad();
                meusSevicos.buscaDados(endpoint)
                .then(function(dados){
                    $scope.btcUsd = dados['USD'];
                    console.log('currencies-controller fez a busca');
                    renomeia(dados);
                    $timeout(function(){telaLoad();},500);
                })
                .catch(function(err){
                    console.log(err);
                    $scope.mensagem = err.mensagem;
                    erro();
                    $timeout(function(){telaLoad();},500);
                })
            }
        }

        function renomeia(obj){
            var i = 0;
            angular.forEach(obj, function(value){
                var key = Object.keys(obj)[i];
                if(key !== "USD"){
                 $scope.cryptoCurrencies[key] = {
                        "nome" : nomes[key],
                        "valorBTC" : 1 /value,
                        "valorUSD" : $scope.btcUsd/ value
                    };                    
                }
                i++;             
            });            
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