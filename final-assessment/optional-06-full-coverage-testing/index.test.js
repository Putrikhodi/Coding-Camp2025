import test from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

test('sum should return the correct sum of two positive numbers', () => {
  assert.strictEqual(sum(2, 3), 5);
});

test('sum should return 0 if either argument is not a number', () => {
  assert.strictEqual(sum('a', 3), 0);
  assert.strictEqual(sum(2, 'b'), 0);
  assert.strictEqual(sum('a', 'b'), 0);
});

test('sum should return 0 if either argument is negative', () => {
  assert.strictEqual(sum(-2, 3), 0);
  assert.strictEqual(sum(2, -3), 0);
  assert.strictEqual(sum(-2, -3), 0);
});

test('sum should return the correct sum when both numbers are zero', () => {
  assert.strictEqual(sum(0, 0), 0);
});