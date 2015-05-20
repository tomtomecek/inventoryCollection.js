var inventory;

(function() {
  inventory = {
    last_id: 0,
    items: [],
    init: function() {
      this.setDate();      
      this.cacheTemplate();
      this.bindEvents();
    },
    setDate: function() {
      var currentDate = new Date();
      $("#time").text(currentDate.toUTCString());
    },
    cacheTemplate: function() {
      this.template = $("#template").html();
      $("#template").remove();
    },
    add: function() {
      this.last_id++
      var item = {
        id: this.last_id,
        name: "",
        stock_number: "",
        quantity: 1
      }

      this.items.push(item);
      return item;
    },
    update: function($item) {
      var id = findId($item),
          item = this.getItem(id);

      item.name = $parent.find("[name='item-name']").val();
      item.stock_number = $parent.find("[name='stock-number']").val();
      item.quantity = +$parent.find("[name='quantity']").val();
    },
    remove: function($item) {
      var id = findId($item),
          newItems = this.items.filter(function(item) {
            return item.id !== id;
          });
      this.items = newItems;
    },
    findParent: function(e) {
      return $(e.target).closest("li");
    },
    getItem: function(id) {
      var item;

      this.items.forEach(function(i) {
        if (i.id === id) { 
          item = i;
          return false;
        }
      });

      return item;
    },
    findId: function($item) {
      return +$item[0].id;
    },
    newItem: function() {
      var item = this.add(),
          $item = $(this.template.replace(/ID/g, item.id));
      $("ul").append($item);
    },
    updateItem: function(e) {
      var $item = this.findParent(e);
      this.update($item);
    },
    deleteItem: function(e) {
      var item = this.findParent(e).remove();
      this.remove(item);
    },
    bindEvents: function() {
      $("#add_item").on("click", $.proxy(this.newItem, this));
      $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      $("ul").on("blur", ":input", $.proxy(this.updateItem, this));
    }
  }
})();

$($.proxy(inventory.init, inventory));
window.inventory = inventory;