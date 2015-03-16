"use strict";var scClientID="client_id=b01d73c6e71275a21a725997d6bd281c",scUserID="19729363",scApiUrl="https://api.soundcloud.com",resolvedUrl,lfmApiKey="d5fd9d6e736ae00f8758fa6b258a616e",lfmApiUrl="https://ws.audioscrobbler.com/2.0/";SC.initialize({client_id:scClientID});var app=angular.module("gg-app",["angularModalService","ngSanitize","angularUtils.directives.dirPagination"]).controller("PlayerController",["$scope","$http","scloudService","lfmService","ModalService",function(a,b,c,d,e){a.playing=!1,a.audio=document.createElement("audio"),a.user={},a.lfmUser={},a.username="dj",a.lfmUsername="last.hq",a.artist={},a.currentPage=1,a.pageSize=10,a.search=function(b){c.getUserByUsername(b).success(function(b){a.user=b,resolvedUrl=a.user.uri}).then(function(){c.getUserTracks(b).success(function(b){a.user.tracks=b,$(".gg-container").css("background-image","url("+a.user.avatar_url+")"),console.log(a.user)})})},a.searchLfm=function(b){d.getTopTracks(b).success(function(b){a.lfmUser.traks=b.toptracks.track,console.log(a.lfmUser.traks)})},a.openModal=function(){},a.show=function(a){e.showModal({templateUrl:"views/modalContent.html",controller:"PlayerController"}).then(function(b){d.getArtistInfo(a.artist.name).success(function(a){b.scope.artist=a,b.element.modal()})})},a.play=function(b){if(a.playing)a.audio.pause(),a.playing=!1;else{var c=b.stream_url+"?"+scClientID;a.audio.src=c,a.audio.play(),a.playing=!0}},a.stop=function(){a.audio.pause(),a.playing=!1},a.audio.addEventListener("ended",function(){a.$apply(function(){a.stop()})})}]).controller("ModalInstanceCtrl",["$scope","$modalInstance","artist",function(a,b,c){a.artist=c,a.cancel=function(){b.dismiss("cancel")}}]).directive("scloudLink",function(){return{require:["^ngModel"],replace:!0,scope:{ngModel:"=",play:"&"},templateUrl:"/views/scloudListItem.html",link:function(a,b){a.duration=a.ngModel.duration,$(b).click(function(){a.$parent.$parent.playing?b.addClass("playing"):b.removeClass("playing")})}}}).directive("btnStack",function(){return{templateUrl:"/views/btnStack.html",link:function(){}}}).directive("lfmList",function(){return{templateUrl:"/views/lfmListItem.html",link:function(){}}});app.service("scloudService",["$http",function(a){this.getUser=function(b,c){return a.get(scApiUrl+"/users/"+b+c)},this.getUserTracks=function(){return a.get(resolvedUrl+"/tracks?"+scClientID)},this.getUserByUsername=function(b){return a.get(scApiUrl+"/resolve.json?url=https://soundcloud.com/"+b+"&"+scClientID)},this.getUserLikes=function(b){return a.get(scApiUrl+"/resolve.json?url=https://soundcloud.com/"+b+"/likes&"+scClientID)}}]),app.service("lfmService",["$http",function(a){this.getTopTracks=function(b){return a.get(lfmApiUrl+"?method=user.gettoptracks&user="+b+"&period=6month&api_key="+lfmApiKey+"&format=json")},this.getArtistInfo=function(b){return a.get(lfmApiUrl+"? method=artist.getinfo&artist="+b+"&api_key="+lfmApiKey+"&format=json")}}]);