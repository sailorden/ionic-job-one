angular.module('starter.controllers', [])

.controller('NewTitleCtrl', function($scope, $timeout, NewBookList) {
    $scope.items = [];

    NewBookList.getBookList.then(function(res){
        var booklist = res.data.newBookList;
        $scope.items = booklist;

    },function(error){
        console.log(error.data);
    });

    $scope.loadMoreData = function() {
            NewBookList.getBookList.then(function(res){
                var tmpItems = $scope.items,
                    newBookList = res.data.addBookList;
                $timeout(function(){
                    $scope.items = tmpItems.concat(newBookList);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                },1000);

            },function(error){
                console.log(error.data);
            });

    };

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMoreData();
    });
    $scope.moreDataCanBeLoaded = function(){
        if($scope.items.length >= 20){
            return false;
        } else {
            return true;
        }
    };

        $scope.mark = function(item){
            alert('Share Item: ' + item.title);
        };
    //$scope.doRefresh = function(){
    //  $timeout( function() {
    //    //simulate async response
    //    $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);
    //
    //    //Stop the ion-refresher from spinning
    //    $scope.$broadcast('scroll.refreshComplete');
    //
    //  }, 1000);
    //};
})

.controller('BookmarksCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});