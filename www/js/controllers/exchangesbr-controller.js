angular.module('ApiExchanges')
    .controller('ExchangesBRController', function($scope, $http, buscador, $interval, $timeout) {

    var meusServicos = buscador.getServico();
    var endpoint = 'https://api.bitvalor.com/v1/ticker.json';
    $scope.exchanges = {};
    $scope.mensagen = '';
    $scope.names =  {
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
        'PAX': 'Paxful'
        };

    function atualisaLista(){
        if(meusServicos.estado(endpoint)){
            $scope.exchanges = $scope.extrair(meusServicos.resultado(endpoint).ticker_24h.exchanges);
            console.log('Nao fez a busca');
        }else{
            telaLoad();
            meusServicos.busca(endpoint)
            .then(function(dados){
                $scope.exchanges = $scope.extrair(dados.ticker_24h.exchanges);
                console.log('Fez a busca');
                $timeout(function(){telaLoad();},500);
            })
            .catch(function(err){
                console.log(err.mensagem);
                $timeout(function(){telaLoad();},500);
                $scope.mensagen = err.mensagem;
                erro();
                
            })
        }        
    }
    
    $scope.extrair = function(objOr){
        var objDest= [];
         var i = 0;
        angular.forEach(objOr,function(value){
            
            var sigla = Object.keys(objOr)[i];
            var dados = $scope.calculaPorcentagem(value.last, value.open);
            objDest[i] = {
                'nome': $scope.names[sigla],
                'low' : value.low,
                'high' : value.high,
                'last' : value.last,
                'money' : value.money,
                'percentual': dados['porcentagem'],
                'classe' :  dados['classe']
            };
            i++;
        });
        return objDest;
    }


    $scope.calculaPorcentagem = function(ultimo, abertura){

        var novosDados = []
        var diferenca = ultimo - abertura;
        percentual = (diferenca *100)/abertura;

        if(percentual > 0){
            novosDados['classe'] = 'setaVerde';
        }else{
            novosDados['classe'] = 'setaVermelha';
        }
        novosDados['porcentagem'] = percentual.toFixed(2);
        return novosDados;
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