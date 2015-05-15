'use strict';

angular.module('cmTreeModule', [])
.directive('cmTree', function(){
  var o = {};

  o.restrict = 'A';
  o.templateUrl = '/directives/cm-tree/cm-tree.html';
  o.scope = {
    height: '=',
    health: '=',
    id: '='
  };
  // o.link = function($scope, element, attrs){};
  o.controller = function($rootScope, $window, $scope, Tree){
    function getState(){
      $scope.state = $window._.find($rootScope.lives, function(life){
        return (life.min <= $scope.height) && ($scope.height <= life.max);
      });
    }

    function remove(){
      $scope.$emit('remove', $scope.id);
    }

    function getHealthBar(){
      var color;
      var health = $scope.health;

      if(health >= 90){
        color = '#99ff00';
      }else if(health >= 80){
        color = '#00ff66';
      }else if(health >= 70){
        color = '#0099ff';
      }else if(health >= 60){
        color = '#6600ff';
      }else if(health >= 50){
        color = '#ff0099';
      }else if(health >= 40){
        color = '#ff6600';
      }else if(health >= 30){
        color = '#ffff00';
      }else if(health >= 20){
        color = '#cc6600';
      }else if(health >= 10){
        color = '#ff3333';
      }else{
        color = '#cc3366';
      }

      $scope.healthBar = {'background-color': color, width: $scope.health + '%'};
    }

    getState();
    getHealthBar();

    $scope.grow = function(){
      Tree.grow($scope.id)
      .then(function(response){
        $scope.height = response.data.height;
        $scope.health = response.data.health;

        if($scope.health <= 0){ remove(); }
        getState();
        getHealthBar();
      });
    };
  };

  return o;
});
