(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ShoppingListAddController.$inject = ['ShoppingListService'];
function ShoppingListAddController(ShoppingListService) {
  var addToList = this;

  addToList.itemName = '';
  addToList.itemQuantity = '';

  addToList.addItem = function(){
    ShoppingListService.addItem(addToList.itemName, addToList.itemQuantity);
  }
}

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService){
  var toBuy = this;

  toBuy.items = ShoppingListService.getItems();

  toBuy.removeItem = function(itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  }

  toBuy.addBoughtItem = function(itemIndex){
    ShoppingListService.addBoughtItem(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService){
  var alreadyBought = this;

  alreadyBought.boughtItems = ShoppingListService.getBoughtItems();

}


function ShoppingListService(){
  var service = this;

  //Initial Shopping List
  var items = [
    {name:'apples', quantity:'1 bags'},
    {name:'oranges', quantity: '3 bags'},
    {name:'cookies', quantity: '2 packs'},
    {name:'dog food', quantity: '5 tins'},
    {name:'sparkling water', quantity: '3 bottles'},
    {name:'lamb sausages', quantity:'1 pack'}
  ];

  var boughtItems = [];

  service.addItem = function(itemName, quantity){
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function(itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.addBoughtItem = function(itemIndex){
    var boughtItem = {
      name: items[itemIndex].name,
      quantity: items[itemIndex].quantity
    };
    boughtItems.push(boughtItem);
  };


  service.getItems = function(){
    return items;
  }

  service.getBoughtItems = function(){
    return boughtItems;
  }

}

})();
