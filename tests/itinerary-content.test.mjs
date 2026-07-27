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
assert.match(html, /guide-images\/saklikent-canyon\.jpg/, 'the southern extension should show Saklıkent canyon');

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

assert.match(html, /NAV\s*进[，、·\s]*ASR\s*出/, 'the guide should clearly distinguish the inbound NAV airport from outbound ASR');
assert.match(html, /9\/28[\s\S]{0,360}PC3503[\s\S]{0,180}22:05[\s\S]{0,100}23:25/, 'September 28 should use the direct PC3503 evening flight');
assert.match(html, /<div class="date">09\.28<\/div>[\s\S]{0,3600}(?:AYT|Lara)[\s\S]{0,180}(?:住宿|入住)/, 'September 28 should finish at an Antalya or Lara hotel');
assert.doesNotMatch(html, /<h3>Paşabağ＋Zelve<\/h3>/, 'the compressed Cappadocia plan should remove the old third-day architecture stop');
assert.match(html, /格雷梅[\s\S]{0,220}<td>2晚<\/td>/, 'the stay table should reduce Göreme to two nights');
assert.match(html, /安塔利亚机场[\s\S]{0,220}<td>1晚<\/td>/, 'the Antalya airport or Lara night should be fixed, not optional');
assert.match(html, /<div class="date">10\.03<\/div>[\s\S]{0,3600}Saklıkent[\s\S]{0,900}(?:晚班|傍晚)[\s\S]{0,300}DLM→IST/, 'October 3 should visit Saklıkent before an evening DLM flight');

function extractDivBlocksByClass(source, className) {
  const classPattern = new RegExp(`<div\\s+[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>`, 'g');
  const blocks = [];
  for (const opening of source.matchAll(classPattern)) {
    const tagPattern = /<div\b[^>]*>|<\/div>/g;
    tagPattern.lastIndex = opening.index + opening[0].length;
    let depth = 1;
    let tag;
    while ((tag = tagPattern.exec(source))) {
      depth += tag[0].startsWith('</') ? -1 : 1;
      if (depth === 0) {
        blocks.push(source.slice(opening.index, tagPattern.lastIndex));
        break;
      }
    }
  }
  return blocks;
}

const attractionCards = extractDivBlocksByClass(html, 'attraction-card');
assert.ok(attractionCards.length >= 22, `the itinerary should identify at least 22 attraction cards, found ${attractionCards.length}`);
for (const [index, card] of attractionCards.entries()) {
  assert.match(card, /<a class="authority-link" href="https:\/\//, `attraction card ${index + 1} should contain an HTTPS authority link`);
  assert.match(card, /target="_blank"/, `attraction card ${index + 1} should open its authority link separately`);
  assert.match(card, /rel="noopener noreferrer"/, `attraction card ${index + 1} should isolate the external authority page`);
}
assert.match(html, /web\.shgm\.gov\.tr[\s\S]{0,480}shmkapadokya\.kapadokya\.edu\.tr/, 'the balloon card should link both licensed operators and the official flight status');
assert.match(html, /whc\.unesco\.org\/en\/tentativelists\/1411/, 'Kekova should link to its UNESCO record');
assert.match(html, /ekotaban\.tarimorman\.gov\.tr\/alan\/49/, 'Saklıkent should link to the national park authority');

console.log('Itinerary content and image mapping regression test passed');
