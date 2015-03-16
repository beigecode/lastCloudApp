'use strict'

app.service('lfmService', ['$http', function($http){
  
  this.getTopTracks = function(username) {
    return $http.get(lfmApiUrl + '?method=user.gettoptracks&user='+ username +'&period=6month&api_key=' + lfmApiKey + '&format=json');
  }

   this.getArtistInfo = function(artist) {
    return $http.get(lfmApiUrl + '? method=artist.getinfo&artist='+ artist +'&api_key=' + lfmApiKey + '&format=json');
  }

}])