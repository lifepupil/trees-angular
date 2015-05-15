'use strict';

angular.module('trees')
.controller('GameCtrl', function($window, $rootScope, $scope, Life, Tree){
  Life.find()
  .then(function(lifeResponse){
    $rootScope.lives = lifeResponse.data.lives;

    Tree.find()
    .then(function(treeResponse){
      $scope.trees = treeResponse.data.trees;
    });
  });

  $scope.$on('remove', function(event, data){
    $window._.remove($scope.trees, function(tree){
      return tree._id === data;
    });
  });

  $scope.plantTree = function(){
    Tree.create()
    .then(function(response){
      $scope.trees.push(response.data);
    });
  };
});
