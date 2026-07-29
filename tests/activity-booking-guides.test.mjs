import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.doesNotMatch(html, /id="map-oct3"|10\/3 三选一|Plan B — Dalyan|id="oct3-options"/, 'the mistakenly added October 3 A/B/C package should be removed');
assert.match(html, /id="activity-bookings"/, 'the guide should have a dedicated activity-booking section');
assert.match(html, /1\. Limanağzı 游泳＋浮潜/, 'booking guide 1 should cover Limanağzı');
assert.match(html, /\+90 538 899 32 72/, 'Limanağzı guide should include the Bay Nuri WhatsApp number');
assert.match(html, /wa\.me\/905388993272\?text=[^"']{180,}/, 'Limanağzı should open WhatsApp with its dated enquiry prefilled');
assert.match(html, /30 September 2026[\s\S]{0,900}15:30 or 16:00/, 'Limanağzı guide should include a dated copyable enquiry and return-time request');

assert.match(html, /2\. 地面追(?:热气球|球)/, 'booking guide 2 should cover ground balloon watching rather than a flight');
assert.match(html, /getyourguide\.com[^"']*t526609/, 'the ground-watching guide should link the weather-refundable shared chase option');
assert.match(html, /cappadociaconcepttravel\.com\/en\/classic-car-tours-cappadocia-t2080/, 'the guide should link the selected direct classic-car product');
assert.match(html, /wa\.me\/905308698850/, 'the guide should provide a one-click WhatsApp path for the selected classic-car operator');
assert.match(html, /wa\.me\/905308698850\?text=[^"']{300,}/, 'the selected classic-car WhatsApp link should open with the full enquiry prefilled');
assert.match(html, /一键带入[^<]{0,20}(?:询价|话术)/, 'the guide should tell the user that the WhatsApp enquiry is prefilled');
assert.match(html, /27 September 2026[\s\S]{0,1200}ground balloon watching and chasing[\s\S]{0,1200}not a balloon flight[\s\S]{0,1200}100% refund/i, 'the ground-watching guide should include a dated enquiry and weather-cancellation question');
assert.match(html, /US\$29[–-]51\/人[\s\S]{0,800}€90\/车/, 'the guide should distinguish the planning prices for shared chasing and the selected classic car');
assert.match(html, /同级比价[\s\S]{0,900}(?:按风向|追随风向)[\s\S]{0,900}(?:至少两个|2[–-]3个).*观景点/s, 'the guide should compare shared and classic-car products by actual chasing capability, not label one as an automatic upgrade');
assert.match(html, /共享追球[^<]{0,20}(?:直接下单|预订步骤)[\s\S]{0,1600}老爷车[^<]{0,20}(?:直接询价|预订步骤)/, 'both options should have an explicit booking path');
assert.match(html, /停飞[^<]{0,80}(?:明确回复|书面回复).*Yes[\s\S]{0,600}(?:否则|不是|含糊)[\s\S]{0,300}Rush/, 'the guide should make the classic-car versus Rush decision for the user');
assert.match(html, /Rush[\s\S]{0,900}起飞(?:准备)?区[^<]{0,80}(?:1个|一个)后续观景点[^<]{0,80}(?:总共|合计)[^<]{0,30}2点/, 'the Rush fallback should promise only the two total viewpoints published by the product');
assert.doesNotMatch(html, /两种车都必须[^<]{0,120}起飞区[^<]{0,100}至少两个/, 'the guide should not impose the classic-car three-stop requirement on Rush');
assert.match(html, /private classic car sunrise balloon-watching tour[\s\S]{0,1000}total price for one car[\s\S]{0,1000}professional photography[\s\S]{0,1000}100% refund/i, 'the classic-car option should include a dated copyable enquiry covering route, extras and cancellation');
assert.doesNotMatch(html, /默认订共享追球车|老爷车只在想拍|老爷车[^<]{0,30}仅作为.*升级/, 'the guide should not automatically demote classic cars when the two-person totals overlap');
assert.doesNotMatch(html, /9\/27 在格雷梅用共享追球车/, 'the trip summary should not contradict the classic-car-first decision rule');
assert.doesNotMatch(html, /共享追球通常 1\.5[–-]2 小时|<strong>共享团酒店接送<\/strong>/, 'the itinerary timing should remain valid after either classic-car or shared selection');
assert.match(html, /地面追(?:热气球|球)(?:（二选一）)?<\/td><td>¥420～740/, 'the trip budget should use a realistic two-person ground-watching range');
assert.doesNotMatch(html, /<h3>2\. 热气球<\/h3>|Turquaz|First Ascent|€270\/人|€290\/人|¥4,500～5,000/, 'the abandoned flight product and price should be removed');

assert.match(html, /3\. Kekova 海湾出航/, 'booking guide 3 should cover the Kekova cruise');
assert.match(html, /\+90 532 676 24 11/, 'Kekova guide should include the Bermuda WhatsApp number');
assert.match(html, /wa\.me\/905326762411\?text=[^"']{180,}/, 'Kekova should open WhatsApp with its dated enquiry prefilled');
assert.match(html, /1 October 2026[\s\S]{0,1200}(?:09:30|09:45)[\s\S]{0,1200}(?:18:00|return)/i, 'Kekova guide should include the dated enquiry and operating window');

assert.match(html, /id="book-ihlara-driver"/, 'the guide should provide a dedicated Ihlara private-driver booking block');
assert.match(html, /cappatransfer\.com\/en\/our-services\/chauffeur-driven-car-rental/, 'the Ihlara booking block should link the selected licensed chauffeur service');
assert.match(html, /cappatransfer\.com\/en\/tours\/cappadocia-green-tour/, 'the selected operator should publish the same Ihlara-Belisirma-Narligol route');
assert.match(html, /cappadocia-private-dream-day-tour-t2638/, 'the Ihlara booking block should link a second licensed operator with the same route');
assert.match(html, /wa\.me\/905443609425\?text=[^"']{350,}[\s\S]{0,3500}wa\.me\/905308698850\?text=[^"']{350,}/, 'both licensed Ihlara contacts should have the exact custom route prefilled');
assert.match(html, /28 September 2026[\s\S]{0,1400}08:00[\s\S]{0,1400}(?:main stair entrance|2号)[\s\S]{0,1400}Belis(?:ı|i)rma[\s\S]{0,1400}13:00[\s\S]{0,1400}Narl(?:ı|i)göl[\s\S]{0,1400}16:15/i, 'the Ihlara enquiry should specify the complete timed one-way hike logistics');
assert.equal((html.match(/officially%20closed%20or%20severe%20weather/g) || []).length, 2, 'both Ihlara WhatsApp enquiries should ask for a closure and severe-weather exception');
assert.match(html, /即使不足 ?24 ?小时[^<]{0,80}(?:全退|免费改为安全路线)/, 'the Ihlara booking gate should require written last-minute closure or severe-weather protection');
assert.match(html, /司机[^<]{0,100}(?:€190|EUR 190)[\s\S]{0,700}(?:€15\/人|€30\/两人)[\s\S]{0,700}(?:整项|合计)[^<]{0,100}¥1,850/, 'the private-driver and ticket limits should use one coherent total-budget rule');
assert.match(html, /无需预约 Plan B[\s\S]{0,1000}Zemi Valley[\s\S]{0,1000}18:30/, 'the fixed nature day should have an executable no-booking fallback before the airport transfer');

console.log('Activity booking guides regression test passed');
