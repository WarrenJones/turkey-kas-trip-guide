import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const enhancement = readFileSync(new URL('../guide-enhancements.js', import.meta.url), 'utf8');

assert.match(html, /全局预案速查/, 'contingency section should be a compact cross-day quick reference');
assert.equal((html.match(/<article class="decision-card">/g) || []).length, 3, 'only three cross-day contingency decisions should remain');
assert.doesNotMatch(html, /id="overview"|Trip at a glance|id="durations"|时间与路程矩阵/, 'duplicated overview and duration sections should stay removed');
assert.doesNotMatch(html, /Plan B|方案 B|hidden aria-hidden/, 'legacy alternate-plan labels and hidden duplicate content should stay removed');
assert.match(html, /每日行程 · 9月24日—10月4日/, 'the itinerary should be presented as the single day-by-day plan');
assert.match(html, /查看剩余待办/, 'the hero should link directly to the remaining action list');
assert.match(html, /Patara是首个可删[\s\S]{0,160}12:30未到蝴蝶谷/, 'D400 fallback should use explicit gates');
assert.match(html, /17:31–18:15[\s\S]{0,120}(?:保留市场|删 Moda)/, 'return fallback should use explicit arrival windows');
assert.match(html, /一键导航整段/, 'D400 section should provide a multi-stop route');
for (const coordinate of ['36.2168', '36.2294', '36.2639', '36.5002863']) {
  assert.match(html, new RegExp(coordinate.replace('.', '\\.')), `D400 guide should include ${coordinate}`);
}
assert.match(html, /D400 是公路名，不是一个可搜索的地址/, 'D400 guide should explain why individual addresses matter');
assert.match(html, /05:30 抵达 IST/, 'day one should use the confirmed 05:30 arrival time');
assert.doesNotMatch(html, /11:25 抵达 IST/, 'the obsolete day-one arrival time should be removed');
assert.match(html, /苏丹艾哈迈德广场晨游[\s\S]{0,2200}午餐、入住、补觉[\s\S]{0,1800}居尔哈内公园＋Sarayburnu 海边[\s\S]{0,2400}Seven Hills 日落晚餐＋夜景＋水烟确认/, 'day one should have a realistic full-day sequence ending at Seven Hills');
assert.match(html, /航班延误超过\s*2小时先删海边/, 'day one should include an explicit delay fallback');

assert.doesNotMatch(html, /id="stays"|id="transport"|href="#stays"|href="#transport"/, 'redundant lodging and transport summaries should be removed');
assert.doesNotMatch(html, /secure\.booking\.cn|[?&](?:sid|tid|aid|label)=/i, 'private Booking parameters must not be published');

const restaurants = ['Seven Hills', 'Çiya Sofrası', 'Yanyalı Fehmi', 'Seten', 'Saklı Konak', 'Ankara Sofrası', 'Bi Lokma', 'Ruhi Bey', 'Turquoise', 'Buzz Beach Bar'];
for (const restaurant of restaurants) assert.match(enhancement, new RegExp(restaurant), `${restaurant} should remain in the illustrated daily table`);
assert.match(html, /菜图只作菜式／场景示意，不冒充餐厅实拍/, 'dish photos must be clearly labelled as representative');
assert.match(html, /<table class="illustrated-meals">/, 'daily meals should use a single illustrated table');
assert.doesNotMatch(html, /<article class="restaurant">|<article class="cafe-stop">/, 'separate duplicate card lists should be gone');
for (const venue of ['Meşhur Sultanahmet Köftecisi', 'Dibek', 'Keyf-i Dem']) assert.match(enhancement, new RegExp(venue), `${venue} should be placed in the meal plan`);
assert.match(enhancement, /Topdeck 不做午餐/, 'Topdeck should not be misrepresented as a lunch venue');
assert.match(enhancement, /不依赖未核实的 Mado/, 'the unverified Mado branch should not be a required departure-day stop');
for (const stop of ['Harab', 'Şark Kahvesi', 'Fazıl Bey', 'ReCafe', 'Hopper', 'Göreme Discount Coffee']) assert.match(enhancement, new RegExp(stop), `${stop} should remain in the coffee and nargile plan`);
assert.match(html, /09\.24[\s\S]{0,5000}Seven Hills 日落晚餐＋夜景＋水烟确认[\s\S]{0,2500}Harab'be 水烟；Şerbethane 户外备选/, 'day one should ask Seven Hills about nargile and provide one nearby fallback');
assert.match(html, /09\.25[\s\S]{0,5000}Eminönü Balık Ekmek[\s\S]{0,2500}Şark Kahvesi 热沙咖啡[\s\S]{0,5000}Çiya → Fazıl Bey[\s\S]{0,2500}ReCafe 水烟备选/, 'day two should include fish sandwich, hot-sand coffee, Kadikoy coffee, and an optional hookah stop');
assert.match(html, /ReCafe[\s\S]{0,500}营业状态有冲突/, 'ReCafe must be marked as unconfirmed rather than a guaranteed stop');
assert.match(html, /09\.27[\s\S]{0,6000}14:40–15:15[\s\S]{0,500}Hopper 或 King/, 'the Göreme coffee stop should sit before the valley walk');
assert.match(html, /09\.27[\s\S]{0,10000}晚餐后 · 水烟可选[\s\S]{0,500}Göreme Discount Coffee/, 'the Göreme nargile stop should remain available after dinner');
assert.match(html, /10\.03[\s\S]{0,7000}18:45–19:15[\s\S]{0,500}Fazıl Bey/, 'the Kadıköy coffee stop should occupy a concrete pre-luggage-collection slot');
assert.match(html, /甜点优先选热的 Künefe/, 'dessert guidance should consistently prefer kunefe');
assert.match(html, /水烟不是安全替代品/, 'the waterpipe plan should retain a clear health boundary');
assert.match(html, /酒店已订完，现在只剩 7 件事/, 'checklist should only contain open actions');
for (let i = 1; i <= 7; i += 1) assert.match(html, new RegExp(`id="todo${i}"`), `pending item ${i} should exist`);
assert.match(html, /具体询价话术在“活动预约”/, 'open items should point to the booking section instead of repeating scripts');
assert.match(html, /<h2>预算表与控制线<\/h2>/, 'budget numbers should live in the table and control line only');
assert.equal((html.match(/31,900～38,400/g) || []).length, 1, 'the full-trip range should appear only in the budget table');
assert.match(html, /两人基础全程预计<\/td><td>约 ¥31,900～38,400/, 'budget table should match headline');
assert.match(html, /当前可核已扣款 ¥13,900；尚待支付约 ¥18,000～24,500/, 'payment status should be one concise line');
assert.doesNotMatch(html, /为什么这样改|当天主线已确定|当天只做一件大事|返程卡不再用热气球图片冒充/, 'design-history and self-commentary should stay removed from the execution guide');

console.log('Itinerary content regression test passed');
