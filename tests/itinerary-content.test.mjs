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
assert.match(html, /苏丹艾哈迈德广场晨游[\s\S]{0,1200}午餐、入住、补觉[\s\S]{0,1200}居尔哈内公园＋Sarayburnu 海边[\s\S]{0,1200}屋顶晚餐＋老城夜景/, 'day one should have a realistic full-day sequence');
assert.match(html, /航班延误超过 2 小时，先删海边/, 'day one should include an explicit delay fallback');

assert.doesNotMatch(html, /id="stays"|id="transport"|href="#stays"|href="#transport"/, 'redundant lodging and transport summaries should be removed');
assert.doesNotMatch(html, /secure\.booking\.cn|[?&](?:sid|tid|aid|label)=/i, 'private Booking parameters must not be published');

const restaurants = ['Balkan Lokantası', 'Matbah Restaurant', 'Çiya Sofrası', 'Yanyalı Fehmi Lokantası', 'Seten Restaurant', 'Saklı Konak', 'Sofram', 'Bi Lokma', 'Oburus Momus', 'Ruhi Bey Meyhanesi', '酒店主餐厅', 'Buzz Beach Bar'];
for (const restaurant of restaurants) assert.match(html, new RegExp(restaurant), `${restaurant} should be available as a practical choice`);
assert.equal((html.match(/<article class="restaurant">/g) || []).length, 12, 'restaurant guide should provide twelve choices');
assert.equal((html.match(/<figure class="restaurant-photo">/g) || []).length, 12, 'every restaurant choice should show a dish photo');
assert.match(html, /菜图是对应菜式的代表图，不冒充餐厅实拍/, 'dish photos must be clearly labelled as representative rather than restaurant photography');
for (const area of ['伊斯坦布尔老城', 'Kadıköy', '卡帕多奇亚', '卡什', '厄吕代尼兹']) assert.match(html, new RegExp(area), `${area} should have its own choice group`);
assert.match(html, /酒店已订完，现在只剩 7 件事/, 'checklist should only contain open actions');
for (let i = 1; i <= 7; i += 1) assert.match(html, new RegExp(`id="todo${i}"`), `pending item ${i} should exist`);
assert.match(html, /两人全程约 3\.15～3\.78 万/, 'budget headline should reflect confirmed lodging totals');
assert.match(html, /两人基础全程预计<\/td><td>约 ¥31,500～37,800/, 'budget table should match headline');

console.log('Itinerary content regression test passed');
