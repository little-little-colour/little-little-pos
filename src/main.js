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

/*
构建“买二赠一”的打折商品
*/
function promotionItems(receiptItems) {
  var promotionItems = [];
  var promotions = loadPromotions();

  receiptItems.forEach(function (receiptItem) {
    var cartItems = receiptItem.cartItem;

    var promotionType = findPromotionType(cartItems.item.barcode, promotions);

    if (promotionType == 'BUY_TWO_GET_ONE_FREE') {
      var saveCount = parseInt(cartItems.count / 3);

      promotionItems.push({
        name: cartItems.item.name,
        unit: cartItems.item.unit,
        saveCount: saveCount,
        promotionType: promotionType
      });
    }
  });

  return promotionItems;
}

/*
计算所有商品的总价和节省价
*/
function buildReceipt(receiptItems) {
  var receipt;
  var total = 0;
  var savedTotal = 0;

  receiptItems.forEach(function (receiptItem) {
    total += receiptItem.subTotal;
    savedTotal += receiptItem.saved;
  });
  receipt = {receiptItem: receiptItems, savedTotal: savedTotal, total: total};

  return receipt;
}

/*
  构建小票基本信息
*/
function buildReceiptText(receipt, receiptItems) {

  return '***<没钱赚商店>收据***\n' + text(receipt) +  (promotionsText(receiptItems) || '') +'----------------------\n' +
    '总计：' + formatPrice(receipt.total) + '(元)\n' + '节省：' + formatPrice(receipt.savedTotal) + '(元)\n' + '**********************';
}

/*
  构建小票商品信息
*/
function text(receipt) {
  var text = '';
  var receiptItems = receipt.receiptItem;

  receiptItems.forEach(function (receiptItem) {
    var cartItem = receiptItem.cartItem;
    text += '名称：' + cartItem.item.name + '，数量：' + receiptItem.cartItem.count + cartItem.item.unit + '，单价：' + formatPrice(cartItem.item.price) + '(元)，小计：' + formatPrice(receiptItem.subTotal) + '(元)\n';
  });

  return text;
}

/*
“买二赠一”的优惠信息
*/
function promotionsText(receiptItems) {
  var text = '';
  var title = '';
  var promotions = promotionItems(receiptItems);

  promotions.forEach(function (promotion) {
    text += '名称：' + promotion.name + '，数量：' + promotion.saveCount + promotion.unit + '\n';
    title = (promotion.promotionType == 'BUY_TWO_GET_ONE_FREE')?('----------------------\n买二赠一商品：\n') : '';
  });
  text = title + text;

  return text;
}

/*
  价格输出格式化
*/
function formatPrice(price) {

  return price.toFixed(2);
}


module.exports = {
  buildCartItems:buildCartItems,
  buildReceiptItems:buildReceiptItems,
  buildReceipt:buildReceipt
};
