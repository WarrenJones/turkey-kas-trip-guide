import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const octoberFirst = html.match(/<div class="date">10\.01<\/div>[\s\S]*?<div class="date">10\.02<\/div>/)?.[0] ?? '';
const octoberSecond = html.match(/<div class="date">10\.02<\/div>[\s\S]*?<div class="date">10\.03<\/div>/)?.[0] ?? '';

assert.doesNotMatch(html, /Kekova|Simena|Bermuda|book-kekova/i, 'the cancelled Kekova day and booking guide must be removed everywhere');

assert.match(octoberFirst, /D400[\s\S]{0,500}Kaş Seyir Terası[\s\S]{0,900}Kaputaş[\s\S]{0,1200}Patara[\s\S]{0,1200}蝴蝶谷崖顶[\s\S]{0,1600}(?:滑翔伞|paragliding)/i, 'October 1 should combine the bounded D400 scenery stops with paragliding');
assert.match(octoberFirst, /14:30[\s\S]{0,500}ReAction/i, 'October 1 should reserve the 14:30 ReAction paragliding slot');
assert.match(octoberFirst, /住：(?:厄吕代尼兹|Ölüdeniz)[\s\S]{0,120}第1晚/i, 'October 1 should begin a two-night Ölüdeniz stay');

assert.match(octoberSecond, /Dragon[\s\S]{0,500}(?:海盗船|pirate)[\s\S]{0,900}10:30[–-]17:00/i, 'October 2 should use the full-day Dragon pirate boat');
assert.match(octoberSecond, /午餐[\s\S]{0,300}(?:DJ|泡沫派对)|(?:DJ|泡沫派对)[\s\S]{0,300}午餐/i, 'the pirate-boat card should state its included lunch and party character');
assert.match(octoberSecond, /住：(?:厄吕代尼兹|Ölüdeniz)[\s\S]{0,120}第2晚/i, 'October 2 should keep the same Ölüdeniz hotel for a second night');

assert.match(html, /id="book-oludeniz-paragliding"/, 'the guide should have a dedicated paragliding booking block');
assert.match(html, /reaction-paragliding\.com/i, 'the paragliding block should link the selected operator directly');
assert.match(html, /1 October 2026[\s\S]{0,1200}2 adults[\s\S]{0,1200}14:30/i, 'the paragliding enquiry should be prefilled for the actual date, travellers and slot');
assert.match(html, /保险[\s\S]{0,500}(?:天气|weather)[\s\S]{0,800}(?:改期|退款|refund)/i, 'the paragliding guide should cover insurance and weather disruption');

assert.match(html, /id="book-pirate-boat"/, 'the guide should have a dedicated pirate-boat booking block');
assert.match(html, /dragonboatoludeniz\.info\/daytrip/i, 'the pirate-boat block should link the official day-trip page');
assert.match(html, /2 October 2026[\s\S]{0,1200}2 adults[\s\S]{0,1200}10:30/i, 'the pirate-boat enquiry should be prefilled for the actual date, travellers and departure');
assert.match(html, /滑翔伞[^<]{0,120}(?:取消|停飞|改期)[\s\S]{0,1000}(?:海盗船[^<]{0,80}二选一|补飞[^<]{0,120}海盗船[^<]{0,80}二选一)/, 'the contingency should not promise both activities after a weather cancellation');

assert.match(html, /Kaş Seyir Terası[\s\S]{0,900}10[–-]15\s*分[\s\S]{0,900}kas\.bel\.tr\/proje\/kas-seyir-terasi-projesi-3184/i, 'the D400 guide should include the municipal Kaş viewpoint with a bounded stop');
assert.match(html, /Kaş[→—–-]+Kaputaş[\s\S]{0,1000}(?:行车看景|不停车|乘客拍照)/, 'the D400 guide should distinguish the scenic driving segment from a roadside stop');
assert.match(html, /Kalkan[\s\S]{0,300}(?:只经过|不停车|不专门停)/, 'Kalkan should be a pass-through rather than a parking-dependent stop');
assert.match(html, /Patara[\s\S]{0,400}(?:第一可删|首个可删|可选)/, 'Patara should be the first optional scenic stop when the drive runs late');
assert.match(html, /蝴蝶谷崖顶[\s\S]{0,600}(?:不下谷|禁止下谷)/, 'the fixed Butterfly Valley viewpoint should retain its safety rule');

assert.match(html, /Kaş Seyir Terası[\s\S]{0,500}07:00[\s\S]{0,300}10[–-]15分钟/, 'the route board and D400 guide should show the Kaş viewpoint with its date and bounded stop');
assert.doesNotMatch(html, /const mapEl = document\.getElementById\('trip-map'\)|L\.polyline|world-atlas/, 'the retired interactive-map implementation must be removed');

assert.match(html, /Kaş Old Town Hotel &amp; Beach[\s\S]{0,220}<td>2晚/, 'the stay table should keep the confirmed two-night Kaş booking');
assert.match(html, /Ölüdeniz Turquoise Hotel[\s\S]{0,220}<td>2晚/i, 'the stay table should keep the confirmed two-night Ölüdeniz booking');
assert.match(html, /滑翔伞[^<]{0,100}<\/td><td>¥2,000～2,300/, 'the budget should include a realistic two-person paragliding range');
assert.match(html, /海盗船[^<]{0,100}<\/td><td>¥450～650/, 'the budget should include a realistic two-person pirate-boat range');

assert.match(html, /4个日历日[^<]{0,100}约500 km自驾|约500 km自驾[^<]{0,100}4个日历日/, 'the hero should use the exact four-day rental window');
assert.match(html, /9\/29[^<]{0,120}10:30[^<]{0,120}(?:取车|主方案)/, 'the rental plan should use the 10:30 pickup aligned with the return time');
assert.doesNotMatch(html, /五日海岸自驾|5个日历日租车/, 'the old five-calendar-day rental wording should be removed');

console.log('Coast replan regression test passed');
