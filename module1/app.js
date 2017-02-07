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
  var menu ='';
  for (var j = 0; j < $scope.lunchmenu.length; j++){
    if($scope.lunchmenu[j] != ' '){
      menu += $scope.lunchmenu[j];
    }
  }

var lunchmenu = menu.split(',');
var cleanedlunchmenu = [];


for (var i = 0; i <= lunchmenu.length; i++){
  if (lunchmenu[i] != '' && lunchmenu[i] != null && lunchmenu[i] != undefined){
    cleanedlunchmenu.push(lunchmenu[i]);
    console.log(cleanedlunchmenu);
  }

  $scope.lunch = lunchmenu;
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
