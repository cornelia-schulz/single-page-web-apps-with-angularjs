(function(){
'use strict'

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems)
.directive('foundItemDescription', FoundItemDescription)
.filter('food', FoodFilter);

function FoundItems() {
  var ddo = {
    restrict: 'E',
    templateUrl: 'foundItem.html',
    scope: {
      narrowDown: '=foundItem'
    }
  };
  return ddo;
}

function FoundItemDescription() {
  var ddo = {
    template: '<h3>{{ category.name }}</h3> <p>Category: {{ category.short_name }}</p><p>{{ category.description }}</p>'
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService', 'foodFilter'];
function NarrowItDownController(MenuSearchService, foodFilter){
  var narrowItDown = this;
  narrowItDown.itemName = '';

  var promise = MenuSearchService.getMenuCategories();

  promise.then(function (response) {
    narrowItDown.categories = response.data.menu_items;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  narrowItDown.useFoodFilter = function(item, categories){
    narrowItDown.found = foodFilter(narrowItDown.itemName, narrowItDown.categories);
  };

  narrowItDown.removeItem = function(itemIndex){
    narrowItDown.found.splice(itemIndex, 1);
  }

  narrowItDown.getMenuItems = function (itemName) {
    var promise = MenuSearchService.getMatchedMenuItems(itemName);

    promise.then(function (response) {
       console.log(response);
      narrowItDown.found = response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
  };
}

function FoodFilter(){
  return function(input, list){
    input = input || "";
    var filteredList = [];
    if(input != ""){
      for(var i=0; i<list.length; i++){
        if(list[i].description.toLowerCase().includes(input.toLowerCase())){
          filteredList.push(list[i]);
        }
      }
    }
    return filteredList;
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json/")
    });

    return response;
  };

  service.getMatchedMenuItems = function(itemName){
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json/"),
      params: {
        name: itemName
      }
    });
    return response;
  };

}


})();
