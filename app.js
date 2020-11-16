(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getItems();
  showList.transferItem = function (itemIndex) {
    ShoppingListCheckOffService.transferItem(itemIndex);

  };



}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showBoughtItemsList = this;
  showBoughtItemsList.boughtItems = ShoppingListCheckOffService.geBoughtItems();

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items to buy
  var items = [];



 // Method to add items in the to buy list
  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  // Initialize To Buy list
  service.addItem("Bag of chips",1);
  service.addItem("Bottles of wine",2);
  service.addItem("Bottles Soda",3);
  service.addItem("Cans of beer",6);
  service.addItem("Packs of napkins",2);

  // Method to remove items from to buy list
  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  //Method to return items from to buy list
  service.getItems = function () {
    return items;
  };

  //Method to return the name of a specific item of the to buy list
  service.getItemName = function (itemIndex) {
    return items[itemIndex].name;
  };

  //Method to return the quantity of a specific item of the to buy list
  service.getItemQty = function (itemIndex) {
    return items[itemIndex].quantity;
  };

  //Method to return the total count of items in the to buy list
  service.getItemsCount = function () {
    return items.length;
  };

  // List of shopping items already bought
  var boughtItems = [];

 // Method to add items in the bought list
  service.addBoughtItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);
  };
  //Methor to return items from bought list
  service.geBoughtItems = function () {
    return boughtItems;
  };

  //Method to return the total count of items in the bought list
  service.getBoughtItemsCount = function () {
    return boughtItems.length;
  };


  service.transferItem = function (itemIndex) {
    var removedItemName = service.getItemName(itemIndex);
    var removedItemQty = service.getItemQty(itemIndex);
    service.removeItem(itemIndex);
    service.addBoughtItem(removedItemName,removedItemQty);

  };

}

})();
