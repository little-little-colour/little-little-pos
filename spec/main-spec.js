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
