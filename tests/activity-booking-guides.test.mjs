import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.doesNotMatch(html, /id="map-oct3"|10\/3 三选一|Plan B — Dalyan|id="oct3-options"/, 'the mistakenly added October 3 A/B/C package should be removed');
assert.match(html, /id="activity-bookings"/, 'the guide should have a dedicated activity-booking section');
assert.match(html, /1\. Kaş 出发 Kekova 一日船游/, 'booking guide 1 should cover the Kaş-departure Kekova day cruise');
assert.match(html, /\+90 539 694 41 60/, 'Kekova guide should include the operator WhatsApp number');
assert.match(html, /wa\.me\/905396944160\?text=[^"']{300,}/, 'Kekova should open WhatsApp with its dated enquiry prefilled');
assert.match(html, /30 September 2026[\s\S]{0,1200}Kaş Harbour at 10:00[\s\S]{0,900}Simena\/Kaleköy landing/, 'Kekova guide should include the date, Kaş departure and Kaleköy landing request');

assert.match(html, /2\. 老爷车地面追球/, 'booking guide 2 should be the selected classic-car ground-watching plan');
assert.match(html, /房东回复€80、可供2人[^<]{0,120}(?:整车总价|整车两人总价)[^<]{0,120}(?:确认|写清)/, 'the guide should record the ambiguous EUR 80 classic-car offer without inventing a per-car unit');
assert.match(html, /Airbnb[^<]{0,80}订单聊天[\s\S]{0,900}€80[^<]{0,120}整车总价/i, 'the host-arranged classic car should be confirmed inside the accommodation order conversation');
assert.match(html, /private classic car sunrise balloon-watching tour[\s\S]{0,1000}total price for one car[\s\S]{0,1000}professional photography[\s\S]{0,1000}100% refund/i, 'the classic-car option should include a dated copyable enquiry covering route, extras and cancellation');
assert.doesNotMatch(html, /Rush Travel|t526609|US\$29[–-]51\/人|共享团订单聊天备用话术/, 'abandoned shared-chase modules should be removed');
assert.match(html, /老爷车地面追球<\/td><td>约 ¥620/, 'the budget should keep only the selected classic-car plan');
assert.doesNotMatch(html, /<h3>2\. 热气球<\/h3>|Turquaz|First Ascent|€270\/人|€290\/人|¥4,500～5,000/, 'the abandoned flight product and price should be removed');

assert.match(html, /id="book-oludeniz-paragliding"/, 'the guide should provide a dedicated Ölüdeniz paragliding booking block');
assert.match(html, /reaction-paragliding\.com/i, 'the selected paragliding option should link ReAction directly');
assert.match(html, /1 October 2026[\s\S]{0,1800}2 adults[\s\S]{0,1400}14:30/i, 'the paragliding enquiry should use the actual date, party size and reserved slot');
assert.match(html, /(?:双人滑翔伞|tandem paragliding)[\s\S]{0,1000}(?:不是|not)[^<]{0,100}(?:飞机跳伞|skydiving)/i, 'the booking guide should distinguish tandem paragliding from aircraft skydiving');
assert.match(html, /(?:保险|insurance)[\s\S]{0,900}(?:天气|weather)[\s\S]{0,1200}(?:退款|refund|改期|reschedul)/i, 'the paragliding guide should confirm passenger insurance and weather disruption terms');

assert.match(html, /id="book-pirate-boat"/, 'the guide should provide a dedicated pirate-boat booking block');
assert.match(html, /dragonboatoludeniz\.info\/daytrip/i, 'the pirate-boat option should link the official Dragon day-trip page');
assert.match(html, /2 October 2026[\s\S]{0,1800}2 adults[\s\S]{0,1400}10:30/i, 'the pirate-boat enquiry should use the actual date, party size and departure time');
assert.match(html, /Dragon[\s\S]{0,1200}10:30[–-]17:00[\s\S]{0,1200}(?:午餐|lunch)/i, 'the Dragon guide should state its full-day operating window and included lunch');
assert.match(html, /(?:DJ|泡沫派对|foam party)/i, 'the guide should disclose the pirate boat\'s party character');
assert.match(html, /滑翔伞[^<]{0,160}(?:取消|停飞|改期)[\s\S]{0,1200}(?:海盗船[^<]{0,100}二选一|补飞[^<]{0,160}海盗船[^<]{0,100}二选一)/, 'a weather-cancelled flight should not be promised alongside the October 2 boat');

assert.match(html, /id="book-avanos-red-tour"/, 'the guide should provide a dedicated platform-bookable Red Tour and Avanos block');
assert.match(html, /getyourguide\.com\/avanos-l983\/red-tour-cappadocia-t689055\//, 'the primary September 28 option should link the selected GetYourGuide Red North Tour');
assert.match(html, /28 September 2026[\s\S]{0,1800}(?:2位成人|2\s*adults)[\s\S]{0,1000}(?:英语|English)[\s\S]{0,1000}Red Tour Cappadocia\s*\(Group Tour\)[\s\S]{0,1000}(?:酒店接送|hotel pickup)[\s\S]{0,1000}(?:午餐|lunch)[\s\S]{0,1000}(?:门票|tickets)/i, 'the booking steps should select the exact dated group option with its included transport, lunch and tickets');
assert.match(html, /Paşabağ[\s\S]{0,800}Devrent[\s\S]{0,800}Avanos[^<]{0,80}(?:陶艺|pottery)/i, 'the selected Red Tour should cover the natural formations and hands-on pottery stop');
assert.match(html, /(?:最多|不超过)\s*15\s*人[\s\S]{0,800}(?:09:30|9:30)[\s\S]{0,500}16:00[\s\S]{0,500}(?:约\s*)?6\s*小时[\s\S]{0,1000}(?:24\s*小时[^<]{0,80}免费取消|免费取消[^<]{0,80}24\s*小时)[\s\S]{0,1000}(?:先订后付|reserve now[^<]{0,60}pay later)/i, 'the group option should state its size, fixed window, duration and platform protections');
assert.match(html, /(?:US\$|\$)42\s*\/\s*人/, 'the guide should preserve the currently observed per-person starting price without presenting it as locked');
assert.match(html, /(?:平台订单消息|订单内消息|GetYourGuide[^<]{0,50}(?:订单|消息))[\s\S]{0,800}(?:(?:书面确认|written confirmation)[\s\S]{0,500}(?:最迟|不晚于)\s*16:30|(?:最迟|不晚于)\s*16:30[\s\S]{0,500}(?:书面确认|written confirmation))/i, 'the booking gate should require written 16:30 Göreme hotel return confirmation inside the platform order');
assert.match(html, /(?:不|绝不)(?:再|要)?(?:自行|自己)[^<]{0,40}(?:找|联系)(?:私人)?司机[\s\S]{0,500}(?:不|绝不)[^<]{0,40}(?:私下转账|线下转账|私人账户)/, 'the guide should explicitly forbid sourcing a private driver or paying off-platform');

assert.match(html, /tourlacappadocia\.com\/products\/cappadocia-pottery-workshop-in-avanos/, 'the fallback should link the selected Tourla Cappadocia Avanos pottery workshop');
assert.match(html, /(?:雨天|时间不合适|无法确认16:30)[\s\S]{0,1200}(?:室内陶艺|陶艺备选)[\s\S]{0,800}Avanos[^<]{0,80}(?:陶艺|pottery)[\s\S]{0,800}(?:10:00|上午10点)[\s\S]{0,800}(?:约\s*)?1\s*小时[\s\S]{0,800}(?:酒店接送|hotel pickup)[\s\S]{0,800}(?:€25\s*\/\s*人)[\s\S]{0,800}(?:24\s*小时[^<]{0,80}免费取消|免费取消[^<]{0,80}24\s*小时)/i, 'rain or an unsuitable return time should switch to the short Tourla pottery workshop with hotel transfer');
assert.match(html, /(?:Avanos陶艺|Avanos\s*陶艺|北线地貌)[^<]{0,80}(?:Red Tour|小团)[\s\S]{0,220}¥570～850[\s\S]{0,300}平台主方案[^<]{0,80}¥570～650/, 'the trip budget should cover both the platform main plan and the more expensive host-tour fallback');
assert.match(html, /住宿方\s*Red Tour[\s\S]{0,500}€55\s*\/\s*人[\s\S]{0,500}(?:约\s*)?17:00[\s\S]{0,700}(?:正式备选|备选方案|时间备选)/, 'the host Red Tour should be documented as a later-returning backup rather than silently replacing the platform tour');

assert.match(html, /公开页不展示住宿名、房东、电话、详细地址或乘客姓名/, 'the public guide should state its accommodation-privacy boundary without embedding private values in repository tests');
assert.doesNotMatch(html, /(?:tel:|wa\.me\/)[^"']{0,80}(?:住宿|房东|host)/i, 'the accommodation section must not publish a direct private phone link');

assert.doesNotMatch(html, /id="book-ihlara-driver"|Ihlara＋Narlıgöl 私人司机/, 'the rejected Ihlara private-driver booking block should be removed');
assert.doesNotMatch(html, /wa\.me\/905443609425|officially%20closed%20or%20severe%20weather/, 'the old Ihlara driver WhatsApp enquiries should be removed');
assert.doesNotMatch(html, /€190|EUR 190|¥1,850/, 'the old private-car and total-budget limits should be removed');

console.log('Activity booking guides regression test passed');
