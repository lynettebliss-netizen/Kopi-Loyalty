// Kopi Corner bill calculator.
// All maths is done in whole cents to avoid floating-point surprises.

const MEMBER_DISCOUNT_PCT = 10;
const SERVICE_CHARGE_PCT = 10;
const GST_PCT = 9;

// Take a percentage of an amount in cents, rounded to the nearest cent.
function percentOf(cents, pct) {
  return Math.round((cents * pct) / 100);
}

// Singapore cash rounding: nearest 5 cents.
function roundTo5(cents) {
  return Math.round(cents / 5) * 5;
}

function billTotal(items, { member = false, serviceCharge = false } = {}) {
  // Add up price x qty for every item.
  let subtotal = 0;
  for (const item of items) {
    subtotal += Math.round(item.price * 100) * item.qty;
  }

  // Members get 10% off the subtotal.
  const discount = member ? percentOf(subtotal, MEMBER_DISCOUNT_PCT) : 0;
  const discounted = subtotal - discount;

  // Dine-in bills carry a 10% service charge on the discounted subtotal.
  const service = serviceCharge ? percentOf(discounted, SERVICE_CHARGE_PCT) : 0;

  // Work out the 9% GST. It applies to the service charge as well.
  const gst = percentOf(discounted + service, GST_PCT);

  // Final amount is rounded to the nearest 5 cents.
  const total = roundTo5(discounted + service + gst);

  return {
    subtotal: subtotal / 100,
    discount: discount / 100,
    serviceCharge: service / 100,
    gst: gst / 100,
    total: total / 100,
  };
}

module.exports = { billTotal };
