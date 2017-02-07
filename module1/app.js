(function(){
'use strict';

angular.module('LunchChecker', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.message= '';
  $scope.lunchmenu='';
  $scope.lunch='';


$scope.getLunchMenu = function(){

var lunchmenu = $scope.lunchmenu.split(',');
var cleanedlunchmenu = [];


for (var i = 0; i < lunchmenu.length; i++){
  if (lunchmenu[i] != ''){
    cleanedlunchmenu.push(lunchmenu[i]);
  }
  $scope.lunch = cleanedlunchmenu;
}


if ($scope.lunchmenu == ''){
  $scope.message = "Please enter data first"
}
else if (cleanedlunchmenu.length <= 3){
  $scope.message = "Enjoy!";
}
else {
  $scope.message = "Too much!"
}
};
}

})();
