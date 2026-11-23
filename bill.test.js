const test = require('node:test');
const assert = require('node:assert');
const { billTotal } = require('./bill');

const order = [
  { name: 'Kopi O', price: 1.8, qty: 2 },
  { name: 'Kaya Toast Set', price: 5.2, qty: 1 },
];

test('takeaway bill, non-member', () => {
  const bill = billTotal(order, { member: false, serviceCharge: false });
  assert.deepStrictEqual(bill, {
    subtotal: 8.8,
    discount: 0,
    serviceCharge: 0,
    gst: 0.79,
    total: 9.6,
  });
});

test('takeaway bill, member gets 10% off', () => {
  const bill = billTotal(order, { member: true, serviceCharge: false });
  assert.strictEqual(bill.total, 8.65, `total: expected 8.65 (8.80 - 0.88 + 0.71 GST, rounded), got ${bill.total}`);
  assert.strictEqual(bill.discount, 0.88, `discount: expected 0.88, got ${bill.discount}`);
  assert.strictEqual(bill.gst, 0.71, `gst: expected 0.71, got ${bill.gst}`);
});

test('empty order costs nothing', () => {
  const bill = billTotal([], { member: false, serviceCharge: false });
  assert.deepStrictEqual(bill, {
    subtotal: 0,
    discount: 0,
    serviceCharge: 0,
    gst: 0,
    total: 0,
  });
});
