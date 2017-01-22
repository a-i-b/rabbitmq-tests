angular.module('rmq.app', [])
  .controller('home', function($rootScope, $scope, $http) {
    $scope.previewStateText = "Start";
    $scope.captureStateText = "Start";
    $scope.captureState = false;
    $scope.previewState = false;
    $scope.responses = [];
    $scope.stompClient = null;
    $scope.resolutions = ['640x480@30', '800x600@30', '1280x720@30', '1280x720@11', '1920x1080@25', '1920x1080@30'];
    $scope.img_src = "api/mjpeg";

    $scope.onChangePreviewState = function() {
    	$http.get('/api/preview?isToStart='+(!$scope.previewState)+'&resolution=' + $scope.singleSelect).
    		then(function(response) {
    			var reply = response.data;  	
    			$scope.previewState = reply.isStarted;
    			$scope.previewStateText = $scope.previewState ? "Stop" : "Start";
    			$scope.image_url = $scope.img_src + '#' + new Date().getTime(); 
    	});
    }

    $scope.onChangeCaptureState = function() {
    	$http.get('/api/capture?isToStart='+(!$scope.captureState)+'&fileName=vid' + new Date().getTime()+'.mp4').
    		then(function(response) {
    			var reply = response.data;  	
    			$scope.captureState = reply.isRunning;
    			$scope.captureStateText = $scope.captureState ? "Stop" : "Start";
    	});
    }

    $scope.showMessage = function(message)  {
    	console.log(message);
    	$scope.responses.push(message)    
    }
    
    function connect() {
    	var socket = new WebSocket('ws://localhost:8080/myws');
    	$scope.stompClient = Stomp.over(socket);    	
    	$scope.stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            $scope.stompClient.subscribe('/topic/messages', function (data) {
            	$rootScope.$apply(function() {
            		 $scope.showMessage(JSON.parse(data.body));
            	});
            });
        });        
    }
  
   // connect();
})
