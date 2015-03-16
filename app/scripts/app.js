
'use strict';

//soundCloud defaults
var scClientID = 'client_id=b01d73c6e71275a21a725997d6bd281c', 
scUserID = '19729363', 
scApiUrl = 'https://api.soundcloud.com',
resolvedUrl,
// lastfm defaults
lfmApiKey = 'd5fd9d6e736ae00f8758fa6b258a616e',
lfmApiUrl = 'https://ws.audioscrobbler.com/2.0/';


// intialize soundcloud API
SC.initialize({
  client_id: scClientID
});

var app = angular
.module('gg-app', ['angularModalService','ngSanitize','angularUtils.directives.dirPagination'])
.controller('PlayerController', ['$scope','$http','scloudService','lfmService','ModalService', function($scope, $http, scloudService, lfmService, ModalService) {

  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.user = {};
  $scope.lfmUser = {};
  $scope.username = 'dj';
  $scope.lfmUsername = 'last.hq';
  $scope.artist = {};
  $scope.currentPage = 1;
  $scope.pageSize = 10;


  $scope.search = function(username) {

    scloudService.getUserByUsername(username)
    .success(function(data, status) { 
      $scope.user = data;
      resolvedUrl = $scope.user.uri;
    })
    .then(function(data) { 
      scloudService.getUserTracks(username)
      .success(function(data) { 
        $scope.user.tracks = data; 
        $('.gg-container').css('background-image', 'url(' + $scope.user.avatar_url + ')');
        console.log($scope.user) 
      }) 
    })

  }

  $scope.searchLfm = function(lfmUsername){

    lfmService.getTopTracks(lfmUsername)
    .success(function(data) {
      $scope.lfmUser.traks = data.toptracks.track;
      console.log($scope.lfmUser.traks);
    })

  };

  $scope.openModal = function (trak) {


  };

  $scope.show = function(trak) {
    ModalService.showModal({
      templateUrl: 'views/modalContent.html',
      controller: "PlayerController"
    }).then(function(modal) {
      lfmService.getArtistInfo(trak.artist.name)
      .success(function(data) {;
        modal.scope.artist = data;
        modal.element.modal();

      })
    });
  };

  $scope.play = function (track) {

    if ($scope.playing) { 
      $scope.audio.pause(); 
      $scope.playing = false;
    } else {
      var url = track.stream_url + '?' + scClientID;
      $scope.audio.src = url;
      $scope.audio.play();
      $scope.playing = true;
    }
  }

  $scope.stop = function () {
    $scope.audio.pause();
    $scope.playing = false;
  }

  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop()
    });
  });

}])
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, artist) {

  $scope.artist = artist;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})

.directive('scloudLink', function() {
 return {
  require: ['^ngModel'],
  replace: true,
  scope: {
   ngModel: '=',
   play: '&'
 },
 templateUrl: '/views/scloudListItem.html',
 link: function(scope, el, attr) {
   scope.duration = scope.ngModel.duration;

   $(el).click(function() { 
    scope.$parent.$parent.playing ? 
    el.addClass('playing') : el.removeClass('playing');
  })
 }
}
})
.directive('btnStack', function(){
    // Runs during compile
    return {
      templateUrl:'/views/btnStack.html',
      link: function($scope, iElm, iAttrs, controller) {

      }
    };
  })
.directive('lfmList', function(){
  // Runs during compile
  return {
    templateUrl:'/views/lfmListItem.html',
    link: function($scope, iElm, iAttrs, controller) {

    }
  };
});
