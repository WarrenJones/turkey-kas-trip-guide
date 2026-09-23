import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(html, /data-route-board/, 'route navigator should render without an external map');
for (const panel of ['route-all', 'route-cappadocia', 'route-coast', 'route-return']) {
  assert.match(html, new RegExp(`id="${panel}"`), `route navigator should include ${panel}`);
}
assert.match(html, /<h2>路线地图<\/h2>/, 'route navigator should stay compact');
assert.doesNotMatch(html, /route-facts|本路线板完全随网页本地加载|VF3268＋住2晚/, 'route navigator should not duplicate day-by-day summaries or technical notes');
assert.doesNotMatch(html, /<div class="route-stop">[\s\S]{0,180}<small>/, 'route stops should contain only date and place labels');
assert.doesNotMatch(html, /<script src="vendor\/(?:leaflet|topojson)/, 'the route board must not depend on old map libraries');
assert.match(html, /data-route-target="route-coast"/, 'route tabs should expose the coast view');
assert.match(html, /button\.dataset\.routeTarget/, 'route tabs should switch panels locally');
assert.doesNotMatch(html, /地下水宫|Basilica Cistern/i, 'the cancelled Basilica Cistern visit must stay removed');
assert.match(html, /Kekova[^<]{0,120}沉没之城＋Kaleköy/, 'the coast route board should show the restored Kekova day');

console.log('Static route navigator regression test passed');
