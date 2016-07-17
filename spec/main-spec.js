var mainData = require('../src/main.js');

describe('intergation test', function() {
  var allItems;
  var inputs;

  beforeEach(function() {
    allItems = loadAllItems();

    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
});

  it("print correct text", fucntion(){

    spyOn(console, 'log');

    printReceipt(inputs);

    var expectText =
     '***<没钱赚商店>收据***\n' +
     '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
     '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
     '名称：方便面，数量：2袋，单价：5.50(元)，小计：10.45(元)\n' +
     '----------------------\n' +
     '买二赠一商品：\n' +
     '名称：雪碧，数量：1瓶\n' +
     '名称：荔枝，数量：0斤\n' +
     '----------------------\n' +
     '总计：52.45(元)\n' +
     '节省：3.55(元)\n' +
     '**********************';

   expect(console.log).toHaveBeenCalledWith(expectText);

  });
}
