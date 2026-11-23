# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Bill calculator for Kopi Corner, a 3-outlet café in Singapore. Zero dependencies, plain CommonJS, Node's built-in test runner. Not a git repository.

## Commands

- Run all tests: `npm test` (runs `node --test`)
- Run one test file: `node --test bill.test.js`
- Run one test by name: `node --test --test-name-pattern="member gets 10% off" bill.test.js`

No build or lint step exists.

## Architecture

All logic lives in `billTotal(items, { member, serviceCharge })` in `bill.js`. Items are `{ name, price, qty }`, where `price` is in SGD dollars (as in `menu.json`). The function returns `{ subtotal, discount, serviceCharge, gst, total }`, all in dollars.

Pricing pipeline, in order:
1. Subtotal: sum of `price × qty`.
2. Member discount: 10% of the subtotal.
3. Service charge: 10% of the discounted subtotal, applied only for dine-in (`serviceCharge: true`).
4. GST: 9% of the discounted subtotal plus the service charge.
5. Total: discounted subtotal + service charge + GST, rounded to the nearest 5 cents (Singapore cash rounding).

Conventions to preserve:
- All arithmetic is in whole cents (`Math.round(price * 100)`). Convert to dollars only when building the return object. Percentages go through `percentOf`, and cash rounding through `roundTo5`.
- Rates are the constants at the top of `bill.js`.
- `menu.json` is reference data only. `bill.js` does not read it.
