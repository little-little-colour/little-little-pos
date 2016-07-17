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

/*
  查找促销类型
*/
function findPromotionType(barcode, promotions) {
  for (var i = 0; i < promotions.length; i++) {
    var promotion = promotions[i];
    if (isBarcodeExist(barcode, promotion.barcodes)) {

      return promotion.type;
    }
  }
}

/*
  通过条形码判断是否是促销商品
*/
function isBarcodeExist(barcode, barcodes) {
  for (var i = 0; i < barcodes.length; i++) {
    if (barcodes[i] == barcode)

      return true;
  }
  return false;
}

/*
小计购物车单品价格
*/
function buildReceiptItems(cartItems, promotions) {
  var receiptItems = [];

  cartItems.forEach(function (cartItem) {
    var saved = 0;
    var subTotal = cartItem.count * cartItem.item.price;

    var promotionType = findPromotionType(cartItem.item.barcode, promotions);

    if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
      var saveCount = parseInt(cartItem.count / 3);
      saved = saveCount * cartItem.item.price;
      subTotal -= saved;
    }
    if (promotionType === '95_DISCOUNT') {
      saved = subTotal * 0.05;
      subTotal -= saved;
    }

    receiptItems.push({cartItem: cartItem, saved: saved, subTotal: subTotal});
  });

  return receiptItems;
}



module.exports = {
  buildCartItems:buildCartItems,
  buildReceiptItems:buildReceiptItems
};
