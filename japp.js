(function () {
    'use strict';
    
    angular.module('GroceryApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('listItemDescription',ListItemDescription)
    .directive('listItem',ListItem);

    function ListItem() {
      var ddo = { 
        templateUrl: 'listItem.html' 
      };
      return ddo;
    }
    function ListItemDescription() {
      var ddo = {
        template: '{{item.quantity}} of {{item.name}}'
      };
      return ddo;
    }
    
    // LIST #1 - controller
    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
      var list = this;
    
      // Use factory to create new shopping list service
      var shoppingList = ShoppingListFactory();
    
      list.items = shoppingList.getItems();
    
      list.itemName = "";
      list.itemQuantity = "";
    
      list.addItem = function () {
        shoppingList.addItem(list.itemName, list.itemQuantity);
      }

      list.removeItem = function (itemIndex) {
        shoppingList.removeItem(itemIndex);
      };
    }
    
    
    // If not specified, maxItems assumed unlimited
    function ShoppingListService(maxItems) {
      var service = this;
    
      // List of shopping items
      var items = [];
    
      service.addItem = function (itemName, quantity) {
        if ((maxItems === undefined)){
          var item = {
            name: itemName,
            quantity: quantity
          };
          items.push(item);
        }
      };
    
      service.removeItem = function (itemIndex) {
        items.splice(itemIndex, 1);
      };
    
      service.getItems = function () {
        return items;
      };
    }
    
    function ShoppingListFactory() {
      var factory = function (maxItems) {
        return new ShoppingListService(maxItems);
      };
    
      return factory;
    }
    
    })();
