import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import { test } from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const enhancement = readFileSync(new URL('../guide-enhancements.js', import.meta.url), 'utf8');
const dining = html.match(/<section class="section" id="restaurants">([\s\S]*?)<\/section>/)?.[1] ?? '';
const placesBlock = enhancement.slice(enhancement.indexOf('const mapUrl ='), enhancement.indexOf('const days ='));
const { slotLocations } = Function(`${placesBlock}\nreturn {slotLocations}`)();
const mealsBlock = enhancement.slice(enhancement.indexOf('const meal ='), enhancement.indexOf('const tbody ='));
const { meals } = Function(`${placesBlock}\n${mealsBlock}\nreturn {meals}`)();

test('dining uses one illustrated daily table, not duplicate restaurant and cafe card lists', () => {
  assert.match(dining, /<table[^>]*class="illustrated-meals"/);
  assert.equal(meals.length, 11);
  for (const [date, ...entries] of meals) {
    assert.equal(entries.length, 4, `${date} must have breakfast, lunch, dinner and coffee/waterpipe`);
    for (const entry of entries) {
      assert.ok(entry.address && entry.query && entry.photo, `${date}: every cell needs an address, map query and photo`);
      assert.ok(existsSync(new URL(`../guide-images/${entry.photo}`, import.meta.url)), `${date}: photo ${entry.photo} must exist`);
    }
  }
  assert.match(enhancement, /img\.className = 'meal-photo'/);
  assert.doesNotMatch(dining, /class="restaurant-grid"|class="cafe-grid"/);
});

test('daily slots show an address or explicit pickup point and a route link', () => {
  assert.match(enhancement, /const slotLocations =/);
  assert.match(enhancement, /slot-address/);
  assert.match(enhancement, /slot-map/);
  assert.match(enhancement, /Belcekız Beach.*Dragon|Dragon.*Belcekız Beach/s);
  assert.equal(slotLocations.length, 11);
  assert.deepEqual(slotLocations.map(day => day.length), [6, 6, 3, 5, 5, 3, 3, 5, 3, 5, 3]);
  for (const [day, slots] of slotLocations.entries()) for (const [index, pins] of slots.entries()) {
    assert.ok(pins.length, `day ${day + 1} slot ${index + 1} needs a location`);
    for (const pin of pins) assert.ok(pin.name && pin.address && pin.query, `day ${day + 1} slot ${index + 1} needs address and map query`);
  }
});
