/*
  通过条形码查找对应的商品信息
*/
function findItem(barcode, items) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (barcode === item.barcode)

      return item;
  }
}

/*
  查找购物车商品信息
*/
function findCartItem(item, cartItems, count) {
  for (var i = 0; i < cartItems.length; i++) {
    if (item === cartItems[i].item) {
      cartItems[i].count += count;

      return cartItems;
    }
  }
  cartItems.push({item: item, count: count});

  return cartItems;
}

/*
  构建购物车商品信息
*/
function buildCartItems(inputs, allItems) {
  var cartItems = [];

  inputs.forEach(function (input) {
    var str = input.split("-");
    var barcode = str[0];
    var count = parseInt(str[1] || 1);
    var item = findItem(barcode, allItems);
    cartItems = findCartItem(item, cartItems, count);
  });

  return cartItems;
}


module.exports = {
  buildCartItems:buildCartItems
};
