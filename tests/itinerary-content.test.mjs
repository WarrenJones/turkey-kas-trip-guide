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
assert.match(html, /slots slots-five/, 'the D400 itinerary day should visualize the road plus its four major natural stops');

const octoberSecond = html.match(/<div class="date">10\.02<\/div>[\s\S]*?<div class="date">10\.03<\/div>/)?.[0] ?? '';
assert.match(octoberSecond, /蝴蝶谷崖顶观景台/, 'October 2 should include Butterfly Valley viewpoint as a fixed mainline stop');
assert.match(octoberSecond, /15:50–16:20/, 'Butterfly Valley viewpoint should have a concrete arrival window');
assert.match(octoberSecond, /guide-images\/butterfly-valley-viewpoint\.jpg/, 'Butterfly Valley viewpoint should have its own matching photograph');
assert.match(octoberSecond, /fethiye\.gov\.tr\/kelebekler-vadisi/, 'Butterfly Valley viewpoint should link to the local government guide');
assert.match(octoberSecond, /36\.5002863%2C29\.1281400/, 'Butterfly Valley viewpoint should provide exact-coordinate navigation');
assert.doesNotMatch(octoberSecond, /蝴蝶谷[^<]{0,80}(?:可选|有空|天气好才去)/, 'Butterfly Valley viewpoint must not be described as optional');

assert.match(html, /name:'蝴蝶谷崖顶观景台（Faralya）'[\s\S]{0,180}stay:'10\/2固定主线'/, 'the route map should include Butterfly Valley as a fixed October 2 stop');
assert.match(html, /不下谷/, 'the guide should clearly prohibit descending from the cliff viewpoint');
assert.match(html, /只在[^<]{0,80}(?:合法|明确划出|正规)[^<]{0,40}停车/, 'the viewpoint guide should retain a legal-parking safety rule');

assert.doesNotMatch(html, /guide-images\/oludeniz\.jpg" alt="费特希耶/, 'Fethiye must not reuse the Ölüdeniz image');
assert.doesNotMatch(html, /guide-images\/cappadocia-balloon\.jpg" alt="卡帕多奇亚地貌"[\s\S]{0,180}SAW→NAV/, 'a flight card must not reuse a balloon photograph');

assert.match(html, /NAV\s*进[，、·\s]*ASR\s*出/, 'the guide should clearly distinguish the inbound NAV airport from outbound ASR');
assert.match(html, /9\/28[\s\S]{0,360}PC3503[\s\S]{0,180}22:05[\s\S]{0,100}23:25/, 'September 28 should use the direct PC3503 evening flight');
assert.match(html, /PC3503[^<]{0,100}(?:已订|已预订)[^<]{0,100}(?:待确认出票|出票待确认)/, 'PC3503 should be marked as booked while ticket issuance is still awaiting confirmation');
assert.match(html, /订单提示[^<]{0,80}提前\s*3\s*小时[^<]{0,100}(?:到机场|抵达机场)/, 'the guide should preserve the booking app recommendation to reach ASR three hours early');
assert.match(html, /17:30[^<]{0,100}(?:ASR|开塞利)/, 'the airport transfer should leave Göreme at 17:30');
assert.doesNotMatch(html, /18:30(?:\s*左右)?(?:从格雷梅出发|离开格雷梅|共同去ASR|乘接送去开塞利)|18:30\s*出发/, 'the superseded 18:30 airport-transfer departure should be removed');
assert.match(html, /1\. 确认 PC3503 出票与行李/, 'the checklist should verify ticket issuance and baggage instead of asking the traveller to book PC3503 again');
assert.match(html, /4\. 订\s*10\/3\s*DLM→IST/, 'the remaining-flight checklist item should only ask the traveller to book the unbooked October 3 flight');
assert.doesNotMatch(html, /订三段境内机票/, 'the checklist should no longer imply that all three domestic flights remain unbooked');
assert.match(html, /<div class="date">09\.28<\/div>[\s\S]{0,4800}(?:AYT|Lara)[\s\S]{0,180}(?:住宿|入住)/, 'September 28 should finish at an Antalya or Lara hotel');
assert.match(html, /<div class="date">09\.26<\/div>[\s\S]{0,2600}<img src="guide-images\/goreme-night\.jpg" alt="格雷梅镇区与洞穴建筑亮灯夜景">[\s\S]{0,220}<span class="slot-time">17:30–19:30<\/span>[\s\S]{0,160}<h3>格雷梅日落观景台＋洞穴镇夜景<\/h3>[\s\S]{0,420}日落后继续停留 30–45 分钟[\s\S]{0,260}天黑后不进入山谷小径/, 'September 26 should explicitly retain the Göreme blue-hour and illuminated cave-town night view with a matching night photograph');
assert.doesNotMatch(html, /<h3>Paşabağ＋Zelve<\/h3>/, 'the compressed Cappadocia plan should remove the old third-day architecture stop');

const septemberTwentyEighth = html.match(/<div class="date">09\.28<\/div>[\s\S]*?<div class="date">09\.29<\/div>/)?.[0] ?? '';
assert.match(septemberTwentyEighth, /9\/27[^<]{0,60}取消[\s\S]{0,500}热气球/, 'September 28 should reserve the second balloon attempt only when September 27 is cancelled');
assert.match(septemberTwentyEighth, /9\/27[^<]{0,60}成功[\s\S]{0,500}Ihlara/, 'September 28 should activate Ihlara only when the first balloon flight succeeds');
assert.match(septemberTwentyEighth, /guide-images\/ihlara-valley\.jpg/, 'the Ihlara branch should have its own matching photograph');
assert.match(septemberTwentyEighth, /08:00[\s\S]{0,180}15:00/, 'the Ihlara branch should have a bounded morning-to-afternoon window');
assert.match(septemberTwentyEighth, /muze\.gov\.tr\/muze-detay\?DistId=IH1&amp;SectionId=IH101/, 'the Ihlara branch should link to the official museum page');
assert.match(septemberTwentyEighth, /aksaray\.ktb\.gov\.tr\/TR-232541\/ihlara-vadisi39nde-trekking\.html/, 'the Ihlara branch should link to the official trekking information');
assert.match(septemberTwentyEighth, /私人司机|包车司机/, 'the Ihlara branch should specify controlled private transport');
assert.doesNotMatch(septemberTwentyEighth, /<h3>爱情谷轻量观景<\/h3>/, 'Love Valley should not remain the formal September 28 fallback');

assert.match(html, /9\/28[\s\S]{0,220}Ihlara[^<]{0,100}4公里[\s\S]{0,520}12:45/, 'the duration matrix should show the short Ihlara route and hard departure time');
assert.match(html, /name:'Ihlara峡谷（热气球成功分支）'[\s\S]{0,220}time:'9\/28 · 09:30–12:45'/, 'the Cappadocia map should include the conditional Ihlara stop and time');
assert.match(html, /普通绿线团[\s\S]{0,160}(?:不参加|不要参加|不建议)/, 'the guide should reject an uncontrolled group Green Tour before the airport transfer');
assert.match(html, /2号[^<]{0,40}(?:主入口|入口)[\s\S]{0,280}出发前一周[\s\S]{0,220}(?:关闭|改走|取消)/, 'the guide should require a final check rather than assuming Ihlara gate 2 remains open');
assert.match(html, /38\.264252%2C34\.290615/, 'the Ihlara plan should provide an exact Belisırma pickup coordinate');
assert.match(html, /格雷梅[\s\S]{0,220}<td>2晚<\/td>/, 'the stay table should reduce Göreme to two nights');
assert.match(html, /安塔利亚机场[\s\S]{0,220}<td>1晚<\/td>/, 'the Antalya airport or Lara night should be fixed, not optional');
assert.match(html, /<div class="date">10\.03<\/div>[\s\S]{0,3600}Saklıkent[\s\S]{0,900}(?:晚班|傍晚)[\s\S]{0,300}DLM→IST/, 'October 3 should visit Saklıkent before an evening DLM flight');

assert.match(html, /\.slot-time\s*\{[^}]*font-size:\s*15px/, 'daily itinerary time labels should use a readable 15px desktop size');
assert.match(html, /\.leg-date\s*\{[^}]*font-size:\s*14px/, 'route-card date and time labels should be larger than the previous 12px size');
assert.match(html, /\.time-pill\s*\{[^}]*font-size:\s*15px/, 'duration-table time pills should use a readable 15px size');
assert.match(html, /\.duration-row:not\(\.header\)\s*>\s*:last-child\s*\{[^}]*font-size:\s*15px/, 'duration-table deadline times should use a readable 15px size');
assert.match(html, /@media \(max-width: 620px\)[\s\S]{0,1600}\.slot-time,\s*\.leg-date,\s*\.time-pill\s*\{[^}]*font-size:\s*16px/, 'primary time labels should increase to 16px on phones');

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
