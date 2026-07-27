import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(html, /id="d400-guide"/, 'the guide should include a dedicated D400 driving section');
assert.match(html, /卡什[^<]{0,40}Kaputaş[^<]{0,40}Kalkan/, 'the guide should identify the scenic Kaş–Kaputaş–Kalkan section');
assert.match(html, /只在正规停车位|不要在路肩停车/, 'the D400 guide should include a safe-stop rule');
assert.match(html, /乘客负责拍照/, 'the D400 guide should make the passenger responsible for photos');
assert.match(html, /Kalkan[^<]{0,120}(?:先跳过|优先跳过)/, 'the D400 guide should state the first stop to cut when late');

assert.match(html, /guide-images\/d400-kas-kalkan-road\.jpg/, 'the D400 drive should have its own road photograph');
assert.match(html, /guide-images\/kas-harbor\.jpg/, 'Kaş old town and harbour should have a dedicated photograph');
assert.match(html, /guide-images\/limanagzi\.jpg/, 'the Kaş swimming day should show Limanağzı');
assert.match(html, /guide-images\/kekova-bay\.jpg/, 'the Kekova boat day should show a bay or boat view');
assert.match(html, /guide-images\/patara-dunes\.jpg/, 'Patara should show its beach and dunes');
assert.match(html, /guide-images\/fethiye-marina\.jpg/, 'Fethiye marina should not reuse an Ölüdeniz photograph');

const theatreUses = html.match(/guide-images\/kas-theatre\.jpg/g) ?? [];
assert.ok(theatreUses.length <= 2, `Kaş theatre photograph should be used at most twice, found ${theatreUses.length}`);

const kasDay = html.match(/<div class="date">09\.30<\/div>[\s\S]*?<div class="date">10\.01<\/div>/)?.[0] ?? '';
const kasDayImages = [...kasDay.matchAll(/<img src="([^"]+)"/g)].map((match) => match[1]);
assert.equal(kasDayImages.length, 3, 'September 30 should show three real Kaş experiences');
assert.equal(new Set(kasDayImages).size, 3, 'September 30 should not repeat one photograph across all cards');
assert.match(kasDay, /Limanağzı/, 'September 30 should include a concrete swimming and snorkelling plan');

assert.match(html, /Patara 沙丘＋海滩/, 'Patara should prioritize nature for this traveller');
assert.doesNotMatch(html, /Patara 古城优先/, 'Patara should no longer prioritize architecture');
assert.match(html, /slots slots-four/, 'the D400 itinerary day should visualize the road plus its three major stops');

assert.doesNotMatch(html, /guide-images\/oludeniz\.jpg" alt="费特希耶/, 'Fethiye must not reuse the Ölüdeniz image');
assert.doesNotMatch(html, /guide-images\/cappadocia-balloon\.jpg" alt="卡帕多奇亚地貌"[\s\S]{0,180}SAW→NAV/, 'a flight card must not reuse a balloon photograph');

console.log('Itinerary content and image mapping regression test passed');
