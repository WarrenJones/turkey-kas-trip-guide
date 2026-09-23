import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(html, /晚点或天气变化时，只看这 6 条/, 'contingency section should be concise');
assert.doesNotMatch(html, /id="overview"|Trip at a glance|id="durations"|时间与路程矩阵/, 'duplicated overview and duration sections should stay removed');
assert.doesNotMatch(html, /Plan B|方案 B|hidden aria-hidden/, 'legacy alternate-plan labels and hidden duplicate content should stay removed');
assert.match(html, /每日行程 · 9月24日—10月4日/, 'the itinerary should be presented as the single day-by-day plan');
assert.match(html, /查看剩余待办/, 'the hero should link directly to the remaining action list');
assert.match(html, /10:15 未离开 Patara[\s\S]{0,240}12:30 未到蝴蝶谷/, 'D400 fallback should use explicit gates');
assert.match(html, /17:31–18:15[\s\S]{0,120}只留市场/, 'return fallback should use explicit arrival windows');
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

const restaurants = ['Balkan Lokantası', 'Seven Hills Restaurant', 'Çiya Sofrası', 'Yanyalı Fehmi Lokantası', 'Seten Restaurant', 'Saklı Konak', 'Sofram', 'Bi Lokma', 'Oburus Momus', 'Ruhi Bey Meyhanesi', '酒店主餐厅', 'Buzz Beach Bar'];
for (const restaurant of restaurants) assert.match(html, new RegExp(restaurant), `${restaurant} should be available as a practical choice`);
assert.equal((html.match(/<article class="restaurant">/g) || []).length, 12, 'restaurant guide should provide twelve choices');
assert.equal((html.match(/<figure class="restaurant-photo">/g) || []).length, 12, 'every restaurant choice should show a dish photo');
assert.match(html, /菜图是对应菜式的代表图，不冒充餐厅实拍/, 'dish photos must be clearly labelled as representative rather than restaurant photography');

const cafeStops = ['Seven Hills 屋顶＋水烟确认', "Harab'be；Şerbethane 备选", 'Şark Kahvesi 热沙咖啡', 'Fazıl Bey Türk Kahvesi', 'ReCafe', 'Hopper Coffee House', 'Göreme Discount Coffee', 'Mandabatmaz 可选绕路'];
for (const stop of cafeStops) assert.match(html, new RegExp(stop), `${stop} should be included in the coffee and nargile plan`);
assert.equal((html.match(/<article class="cafe-stop">/g) || []).length, 8, 'coffee and nargile guide should distinguish planned stops from optional backups');
assert.match(html, /09\.24[\s\S]{0,5000}Seven Hills 日落晚餐＋夜景＋水烟确认[\s\S]{0,2500}Harab'be 水烟；Şerbethane 户外备选/, 'day one should ask Seven Hills about nargile and provide one nearby fallback');
assert.match(html, /09\.25[\s\S]{0,5000}Eminönü Balık Ekmek[\s\S]{0,2500}Şark Kahvesi 热沙咖啡[\s\S]{0,5000}Çiya → Fazıl Bey[\s\S]{0,2500}ReCafe 水烟备选/, 'day two should include fish sandwich, hot-sand coffee, Kadikoy coffee, and an optional hookah stop');
assert.match(html, /ReCafe[\s\S]{0,500}营业状态有冲突/, 'ReCafe must be marked as unconfirmed rather than a guaranteed stop');
assert.match(html, /09\.27[\s\S]{0,6000}14:40–15:15[\s\S]{0,500}Hopper Coffee/, 'the Göreme coffee stop should sit before the valley walk');
assert.match(html, /09\.27[\s\S]{0,10000}20:30–21:30[^<]{0,80}可选[\s\S]{0,500}Göreme Discount Coffee 水烟/, 'the Göreme nargile stop should remain available even after the Istanbul experience');
assert.match(html, /10\.03[\s\S]{0,7000}18:45–19:15[\s\S]{0,500}Fazıl Bey/, 'the Kadıköy coffee stop should occupy a concrete pre-luggage-collection slot');
assert.match(html, /甜点统一选<strong>Künefe<\/strong>[\s\S]{0,80}不再推荐Baklava/, 'dessert guidance should consistently prefer kunefe over baklava');
assert.match(html, /Mandabatmaz[\s\S]{0,500}不为这杯咖啡单独跨城/, 'Mandabatmaz should remain an optional Taksim detour rather than changing the route');
assert.match(html, /水烟不是香烟的安全替代品/, 'the waterpipe plan should retain a clear health boundary');
for (const area of ['伊斯坦布尔老城', 'Kadıköy', '卡帕多奇亚', '卡什', '厄吕代尼兹']) assert.match(html, new RegExp(area), `${area} should have its own choice group`);
assert.match(html, /酒店已订完，现在只剩 7 件事/, 'checklist should only contain open actions');
for (let i = 1; i <= 7; i += 1) assert.match(html, new RegExp(`id="todo${i}"`), `pending item ${i} should exist`);
assert.match(html, /两人全程约 3\.19～3\.84 万/, 'budget headline should include the Kekova cruise');
assert.match(html, /两人基础全程预计<\/td><td>约 ¥31,900～38,400/, 'budget table should match headline');

console.log('Itinerary content regression test passed');
