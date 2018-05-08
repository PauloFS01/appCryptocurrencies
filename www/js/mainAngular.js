	angular.module('ApiExchanges', ['ngAnimate', 'ngRoute', 'ngResource','minhaBusca',
        'buscaMoedas','buscaCurrencies', 'buscaOrdens','minhaBuscaChart'])
    
    .config(function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'partials/listBR.html',
            controller: 'ExchangesBRController'
        });
        $routeProvider.when('/currencies', {
            templateUrl: 'partials/currencies.html',
            controller: 'CurrenciesController'
        });        

        $routeProvider.when('/orders', {
            templateUrl: 'partials/orders.html',
            controller: 'OrdersController'
        });     

        $routeProvider.when('/blockchain', {
            templateUrl: 'partials/blockchain.html',
            controller: 'BlockchainController'
        });  

        $routeProvider.otherwise({redirectTo: '/'});

    });