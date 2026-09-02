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

const bookings = [
  ['C Suites Antalia Airport', '¥706'],
  ['Kaş Old Town Hotel &amp; Beach', '¥1,729'],
  ['Ölüdeniz Turquoise Hotel', '¥2,112'],
  ['Villa Blanche Hotel SPA &amp; Garden Pool', '¥724']
];
for (const [hotel, price] of bookings) {
  assert.match(html, new RegExp(`${hotel}[\\s\\S]{0,420}${price}`), `${hotel} should show its confirmed price`);
}
assert.match(html, /四家酒店已确认，六晚合计 ¥5,271/, 'stay section should total all four confirmed orders');
assert.match(html, /订单未显示早餐/, 'Villa Blanche breakfast should not be invented');
assert.doesNotMatch(html, /secure\.booking\.cn|[?&](?:sid|tid|aid|label)=/i, 'private Booking parameters must not be published');

assert.match(html, /交通只保留“已订信息”和“还要确认什么”/, 'transport section should be compact');
assert.match(html, /VF3268[\s\S]{0,500}PC3503[\s\S]{0,500}Çizgi[\s\S]{0,500}VF3135/, 'compact transport table should cover all segments');
assert.match(html, /起飞前约 2 小时到航站楼/, 'domestic flight timing should retain the two-hour baseline');
assert.match(html, /Premium Damage[\s\S]{0,160}不能[^<]{0,80}零免赔/, 'rental insurance warning should remain explicit');
assert.match(html, /酒店已订完，现在只剩 7 件事/, 'checklist should only contain open actions');
for (let i = 1; i <= 7; i += 1) assert.match(html, new RegExp(`id="todo${i}"`), `pending item ${i} should exist`);
assert.match(html, /两人全程约 3\.15～3\.78 万/, 'budget headline should reflect confirmed lodging totals');
assert.match(html, /两人基础全程预计<\/td><td>约 ¥31,500～37,800/, 'budget table should match headline');

console.log('Itinerary content regression test passed');
