'use strict'

app.service('scloudService', ['$http', function($http){

  this.getUser = function(scUserID, scClientID) {
    return $http.get(scApiUrl + '/users/' + scUserID + scClientID);
  };

  this.getUserTracks = function(username) {
      return $http.get(resolvedUrl + '/tracks?' + scClientID);
  };

  this.getUserByUsername = function(username){
    return $http.get(scApiUrl + '/resolve.json?url=https://soundcloud.com/' + username + '&' + scClientID);
  };

  this.getUserLikes = function(username) {
    return $http.get(scApiUrl + '/resolve.json?url=https://soundcloud.com/' + username + '/likes' + '&' + scClientID)
  }

}])