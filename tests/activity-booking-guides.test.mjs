import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.doesNotMatch(html, /id="map-oct3"|10\/3 三选一|Plan B — Dalyan|id="oct3-options"/, 'the mistakenly added October 3 A/B/C package should be removed');
assert.match(html, /id="activity-bookings"/, 'the guide should have a dedicated activity-booking section');
assert.match(html, /1\. Limanağzı 游泳＋浮潜/, 'booking guide 1 should cover Limanağzı');
assert.match(html, /\+90 538 899 32 72/, 'Limanağzı guide should include the Bay Nuri WhatsApp number');
assert.match(html, /30 September 2026[\s\S]{0,900}15:30 or 16:00/, 'Limanağzı guide should include a dated copyable enquiry and return-time request');

assert.match(html, /2\. 热气球/, 'booking guide 2 should cover the Cappadocia balloon');
assert.match(html, /\+90 554 165 3640/, 'balloon guide should include the operator WhatsApp number');
assert.match(html, /27 September 2026[\s\S]{0,900}first ascent[\s\S]{0,900}28 September/i, 'balloon guide should include the preferred date, first ascent and fallback date');
assert.match(html, /Standard[\s\S]{0,500}€270\/人[\s\S]{0,500}Classic[\s\S]{0,500}€290\/人/, 'balloon guide should show the currently checked Standard and Classic prices');
assert.doesNotMatch(html, /€170\/人/, 'the stale balloon price should be removed');
assert.doesNotMatch(html, /自动顺延|保证顺延|优先顺延/, 'the guide must not promise next-day rescheduling');
assert.match(html, /卡帕多奇亚热气球<\/td><td>¥4,500～5,000/, 'the trip budget should reflect the checked balloon price for two');

assert.match(html, /3\. Kekova 海湾出航/, 'booking guide 3 should cover the Kekova cruise');
assert.match(html, /\+90 532 676 24 11/, 'Kekova guide should include the Bermuda WhatsApp number');
assert.match(html, /1 October 2026[\s\S]{0,1200}(?:09:30|09:45)[\s\S]{0,1200}(?:18:00|return)/i, 'Kekova guide should include the dated enquiry and operating window');

console.log('Activity booking guides regression test passed');
