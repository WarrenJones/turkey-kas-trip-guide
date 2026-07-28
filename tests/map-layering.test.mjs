import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(html, /id="map-cappadocia"/, 'map should offer a Cappadocia detail view');
assert.match(html, /id="map-fethiye"/, 'map should offer a Fethiye and Butterfly Valley detail view');
assert.match(html, /id="map-return"/, 'map should offer an Istanbul return detail view');
assert.match(html, /青色实线[^<]{0,80}(?:D400|轨道交通)[^<]{0,160}橙色虚线[^<]{0,100}境内航班[^<]{0,160}蓝色虚线[^<]{0,100}渡轮/, 'the legend should distinguish roads and rail, flights, and the ferry transfer');
assert.match(html, /const hubMarkers = L\.layerGroup\(\)/, 'map should have a city-level marker layer');
assert.match(html, /const detailMarkers = L\.layerGroup\(\)/, 'map should have a detail marker layer');
assert.match(html, /map\.on\('zoomend', updateMarkerVisibility\)/, 'marker layers should react to zoom level');
assert.doesNotMatch(html, /L\.marker\(\[p\.lat,p\.lng\][\s\S]{0,160}\.addTo\(map\)/, 'detail markers must not always render on the nationwide map');
assert.match(html, /cappadociaBounds = L\.latLngBounds\(points\.filter\(\(p\) => p\.n >= 2 && p\.n <= 5\)/, 'the Cappadocia detail view should exclude distant ASR so valley markers do not overlap');
assert.match(html, /class="leg-date"/, 'route cards should show a dedicated date and time row');
for (const date of ['2026-09-26', '2026-09-28', '2026-09-29', '2026-10-01', '2026-10-02', '2026-10-03']) {
  assert.match(html, new RegExp(`datetime="${date}"`), `route cards should include ${date}`);
}

assert.doesNotMatch(html, /地下水宫|Basilica Cistern/i, 'the cancelled Basilica Cistern visit must not remain in the guide');
assert.match(html, /14:40[\s\S]{0,240}博斯普鲁斯短线/, 'September 25 should include the 14:40 short Bosphorus cruise');
assert.doesNotMatch(html, /Myra|米拉/i, 'the replaced Myra stop must not remain in the guide');
assert.match(html, /下杜登瀑布/, 'the airport-side Lower Duden waterfall stop should be included');
assert.match(html, /9\/29[\s\S]{0,260}(?:08:30|上午)[\s\S]{0,260}下杜登瀑布/, 'Lower Duden should be a planned morning stop after the Antalya overnight');
assert.match(html, /DLM\s*→\s*SAW/, 'the October 3 route card should show the confirmed Dalaman-to-SAW direction');
assert.match(html, /DLM\s*→\s*SAW[\s\S]{0,320}<time datetime="2026-10-03">10\/3[^<]*<\/time><span>VF3135[^<]*13:40[–—-]15:00[^<]*<\/span>/, 'the October 3 DLM-to-SAW route card should show the confirmed flight number and schedule');
assert.match(html, /name:'达拉曼机场 DLM'[\s\S]{0,180}10:30[–—-]10:50[^']*还车[\s\S]{0,120}11:10[^']*航站楼[\s\S]{0,160}13:40起飞/, 'the DLM map point should separate car return, terminal arrival and flight time');
assert.match(html, /9\/26[\s\S]{0,220}格雷梅日落＋蓝调夜景[\s\S]{0,260}约2小时[\s\S]{0,100}19:30/, 'the duration table should include the restored September 26 night-view window');
assert.match(html, /name:'格雷梅日落＋夜景（Aydınkırağı）'[\s\S]{0,180}time:'9\/26 · 17:30–19:30'/, 'the Cappadocia map popup should identify the restored night-view stop and time');
assert.match(html, /name:'Ihlara峡谷（热气球成功分支）'[\s\S]{0,120}lat:38\.253762[\s\S]{0,80}lng:34\.302209[\s\S]{0,220}time:'9\/28 · 09:30–12:45'/, 'the Cappadocia map should include the conditional Ihlara route with the main stair-gate coordinates and time');
assert.match(html, /热气球\s*\/\s*Ihlara\s*二选一[\s\S]{0,220}9\/28[^<]{0,30}周一[\s\S]{0,280}18:30共同去ASR/, 'the map-side route card should show the September 28 branch and revised airport deadline');
assert.match(html, /开塞利 ASR\s*→\s*安塔利亚 AYT[\s\S]{0,320}PC3503[^<]{0,100}(?:已订|已预订)/, 'the map-side flight card should mark PC3503 as booked');
assert.match(html, /name:'蝴蝶谷崖顶观景台（Faralya）'[\s\S]{0,220}lat:36\.5002863[\s\S]{0,80}lng:29\.12814[\s\S]{0,220}stay:'10\/2固定主线'/, 'the coast map should include the exact Butterfly Valley viewpoint as a fixed stop');
assert.match(html, /maps:'https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=36\.5002863%2C29\.1281400'/, 'the viewpoint popup should override fuzzy name search with exact coordinates');
assert.match(html, /const mapsUrl = p\.maps \|\|/, 'map popups should honor exact-coordinate navigation overrides');
assert.match(html, /\{n:18,\s*name:'[^']*SAW'/, 'return-map point 18 should be Sabiha Gökçen Airport');
assert.match(html, /\{n:19,\s*name:'[^']*Kadıköy[^']*'/, 'return-map point 19 should be Kadıköy');
assert.match(html, /\{n:20,\s*name:'[^']*(?:Gayrettepe|Levent)/, 'return-map point 20 should be the Gayrettepe or Levent hotel area');
assert.match(html, /\{n:21,\s*name:'[^']*IST'/, 'return-map point 21 should be Istanbul Airport');
assert.match(html, /returnBounds = L\.latLngBounds\(points\.filter\(\(p\) => p\.n >= 18 && p\.n <= 21\)/, 'the Istanbul return view should fit SAW through IST points 18–21');
assert.match(html, /coastBounds = L\.latLngBounds\(points\.filter\(\(p\) => p\.n >= 7 && p\.n <= 17\)/, 'the coast view should include AYT through DLM points 7–17');
assert.match(html, /fethiyeBounds = L\.latLngBounds\(points\.filter\(\(p\) => p\.n >= 14 && p\.n <= 17\)/, 'the Fethiye view should include Butterfly Valley through DLM points 14–17');
assert.match(html, /map\.getZoom\(\) >= 9/, 'nearby Fethiye markers should only appear at a zoom where they can be distinguished');
assert.match(html, /\[29\.128326,36\.500616\]/, 'the coastal route geometry should visibly reach the Butterfly Valley viewpoint road');
assert.doesNotMatch(html, /格雷梅3晚/, 'the map should no longer describe a three-night Göreme stay');
assert.doesNotMatch(html, /9\/29[^<]{0,80}(?:ASR|Kayseri)[^<]{0,20}(?:→|&rarr;)\s*(?:AYT|安塔利亚)/, 'the old September 29 flight date must be removed');
assert.doesNotMatch(html, /10\/3–10\/5/, 'the Istanbul return hub should end on the October 4 departure date, not the October 5 Beijing arrival date');

console.log('Map marker layering regression test passed');
