(function() {
  'use strict';

  angular
    .module('dominode')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/view/view.html',
        controller: 'Controller as vm'
      });

    $urlRouterProvider.otherwise('/');
  }
})();
