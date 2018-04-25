(function () {
    'use strict';
    
    angular.module('TicketingTool')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    
      // Redirect to home page if no other URL matches
      $urlRouterProvider.when('', '/home');
      //$urlRouterProvider.otherwise('/');
    
      // *** Set up UI states ***
      $stateProvider
    
      // Home page
      .state('home', {
        url: '/home',
        templateUrl: 'src/templates/home.template.html',
        controller: 'ReportController as rpt',
        resolve: {
          ticketData: ['ReportDataService', function (ReportDataService) {
            return ReportDataService.getAllApi();
          }]
        }
      })
      .state('search',{
        url:'/search/{value}',
        templateUrl: 'src/templates/search-view.template.html',
        controller: 'SearchController as srch',
        resolve: {
          ticketData: ['$stateParams','ReportDataService', function ($stateParams,ReportDataService) {
            console.log($stateParams.value);
            return ReportDataService.getFilteredRecords($stateParams.value);
          }]
        }
      })
    }
  }
)();