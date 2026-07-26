import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(html, /id="map-cappadocia"/, 'map should offer a Cappadocia detail view');
assert.match(html, /const hubMarkers = L\.layerGroup\(\)/, 'map should have a city-level marker layer');
assert.match(html, /const detailMarkers = L\.layerGroup\(\)/, 'map should have a detail marker layer');
assert.match(html, /map\.on\('zoomend', updateMarkerVisibility\)/, 'marker layers should react to zoom level');
assert.doesNotMatch(html, /L\.marker\(\[p\.lat,p\.lng\][\s\S]{0,160}\.addTo\(map\)/, 'detail markers must not always render on the nationwide map');
assert.match(html, /class="leg-date"/, 'route cards should show a dedicated date and time row');
for (const date of ['2026-09-26', '2026-09-29', '2026-10-01', '2026-10-02', '2026-10-03']) {
  assert.match(html, new RegExp(`datetime="${date}"`), `route cards should include ${date}`);
}

assert.doesNotMatch(html, /地下水宫|Basilica Cistern/i, 'the cancelled Basilica Cistern visit must not remain in the guide');
assert.match(html, /14:40[\s\S]{0,240}博斯普鲁斯短线/, 'September 25 should include the 14:40 short Bosphorus cruise');

console.log('Map marker layering regression test passed');
