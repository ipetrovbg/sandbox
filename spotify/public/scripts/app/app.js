;(function(){
	'use strict';
	angular.module('SpotifyApp', ['ui.router', 'ngMaterial'])
	.config(['$stateProvider','$urlRouterProvider', '$mdThemingProvider', function ($stateProvider,$urlRouterProvider, $mdThemingProvider) {
		$urlRouterProvider.otherwise('/');
		$mdThemingProvider.definePalette('amazingPaletteName', {
		    '50': 'ffebee',
		    '100': 'ffcdd2',
		    '200': 'ef9a9a',
		    '300': 'e57373',
		    '400': 'ef5350',
		    '500': 'f44336',
		    '600': 'e53935',
		    '700': 'd32f2f',
		    '800': 'c62828',
		    '900': 'b71c1c',
		    'A100': 'ff8a80',
		    'A200': 'ff5252',
		    'A400': 'ff1744',
		    'A700': 'd50000',
		    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
		                                        // on this palette should be dark or light

		    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
		     '200', '300', '400', 'A100'],
		    'contrastLightColors': undefined    // could also specify this if default was 'dark'
		  });
		$mdThemingProvider.theme('amazingPaletteName').backgroundPalette('blue').dark();
		$mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
		$mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
		$mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
		$mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();

		 $stateProvider
	      .state('/', {
		        url:'/',
		        templateUrl: url + 'public/views/home/home.html',
		        controller: 'MainController',
		        controllerAs: 'vm'
		    })
	      .state('/canvas', {
		        url:'/canvas',
		        templateUrl: url + 'public/views/home/canvas.html',
		        controller: 'CanvasController',
		        controllerAs: 'vm'
		    });
	}]);
}());