import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(html, /data-route-board/, 'route navigator should render without an external map');
for (const panel of ['route-all', 'route-cappadocia', 'route-coast', 'route-return']) {
  assert.match(html, new RegExp(`id="${panel}"`), `route navigator should include ${panel}`);
}
assert.match(html, /路线一眼看懂：日期、交通和落脚点/, 'route navigator should explain its purpose clearly');
assert.match(html, /9\/28–10\/4住宿已确认[\s\S]{0,160}¥5,271/, 'overview should include the confirmed six-night total');
assert.match(html, /18:15后不寄存、不去Moda/, 'return panel should expose the luggage fallback');
assert.doesNotMatch(html, /<script src="vendor\/(?:leaflet|topojson)/, 'the route board must not depend on old map libraries');
assert.match(html, /data-route-target="route-coast"/, 'route tabs should expose the coast view');
assert.match(html, /button\.dataset\.routeTarget/, 'route tabs should switch panels locally');
assert.doesNotMatch(html, /地下水宫|Basilica Cistern/i, 'the cancelled Basilica Cistern visit must stay removed');
assert.doesNotMatch(html, /Kekova|Simena|Bermuda|book-kekova/i, 'the cancelled Kekova route must stay removed');

console.log('Static route navigator regression test passed');
