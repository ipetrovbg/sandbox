;(function(){
	'use strict';
	angular.module('SpotifyApp')
		.factory('artists', artists);

		artists.$inject = ['$http'];
		function artists( $http ){
			var endpoint = 'https://api.spotify.com/v1/';
			var service = {
				getWithLimit: getWithLimit
			}
			return service;

			function getWithLimit( artist, limit ){
				return $http.get( endpoint + 'search?q='+ artist +'&type=artist&limit=' + limit)
					.then(function(artists){
						return artists.data.artists.items;
					});
			}
		};

}());