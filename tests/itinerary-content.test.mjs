import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(html, /id="d400-guide"/, 'the guide should include a dedicated D400 driving section');
assert.match(html, /卡什[^<]{0,40}Kaputaş[^<]{0,40}Kalkan/, 'the guide should identify the scenic Kaş–Kaputaş–Kalkan section');
assert.match(html, /(?:只在|只用|进入)[^<]{0,30}正规停车|不(?:要|在)[^<]{0,20}路肩/, 'the D400 guide should include a safe-stop rule');
assert.match(html, /乘客负责拍照/, 'the D400 guide should make the passenger responsible for photos');
assert.match(html, /Kalkan[\s\S]{0,300}(?:只经过|不停车|不专门停)/, 'the D400 guide should make Kalkan a pass-through rather than a parking-dependent stop');
assert.match(html, /Patara[\s\S]{0,400}(?:第一可删|首个可删|可选)/, 'the D400 guide should identify Patara as the first optional scenic stop when late');

assert.match(html, /guide-images\/d400-kas-kalkan-road\.jpg/, 'the D400 drive should have its own road photograph');
assert.match(html, /guide-images\/kas-harbor\.jpg/, 'Kaş old town and harbour should have a dedicated photograph');
assert.match(html, /guide-images\/limanagzi\.jpg/, 'the Kaş swimming day should show Limanağzı');
assert.match(html, /guide-images\/patara-dunes\.jpg/, 'Patara should show its beach and dunes');
assert.match(html, /guide-images\/moda-coast\.jpg/, 'the Istanbul return should show the newly added Moda waterfront stop');
assert.match(html, /<img src="guide-images\/[^"]+" alt="[^"]*(?:Kaş Seyir Terası|卡什观景)[^"]*"/i, 'Kaş Seyir Terası should have its own matching photograph');
assert.match(html, /<img src="guide-images\/[^"]+" alt="[^"]*(?:滑翔伞|paraglid)[^"]*"/i, 'the paragliding card should have its own matching photograph');
assert.match(html, /<img src="guide-images\/[^"]+" alt="[^"]*(?:海盗船|pirate)[^"]*"/i, 'the pirate-boat card should have its own matching photograph');

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

const octoberFirst = html.match(/<div class="date">10\.01<\/div>[\s\S]*?<div class="date">10\.02<\/div>/)?.[0] ?? '';
const octoberSecond = html.match(/<div class="date">10\.02<\/div>[\s\S]*?<div class="date">10\.03<\/div>/)?.[0] ?? '';
assert.match(octoberFirst, /Kaş Seyir Terası/, 'October 1 should start the coast drive with the municipal Kaş viewpoint');
assert.match(octoberFirst, /Kaputaş[\s\S]{0,1200}Patara[\s\S]{0,1200}蝴蝶谷崖顶观景台/, 'October 1 should retain the bounded natural stops before paragliding');
assert.match(octoberFirst, /14:30[\s\S]{0,500}ReAction/i, 'October 1 should reserve the 14:30 ReAction paragliding slot');
assert.match(octoberFirst, /guide-images\/butterfly-valley-viewpoint\.jpg/, 'Butterfly Valley viewpoint should keep its own matching photograph');
assert.match(octoberFirst, /fethiye\.gov\.tr\/kelebekler-vadisi/, 'Butterfly Valley viewpoint should link to the local government guide');
assert.match(octoberFirst, /36\.5002863%2C29\.1281400/, 'Butterfly Valley viewpoint should provide exact-coordinate navigation');
assert.doesNotMatch(octoberFirst, /蝴蝶谷[^<]{0,80}(?:可选|有空|天气好才去)/, 'Butterfly Valley viewpoint must not be described as optional');

assert.match(octoberSecond, /Dragon[\s\S]{0,500}(?:海盗船|pirate)[\s\S]{0,900}10:30[–-]17:00/i, 'October 2 should use the full-day Dragon pirate boat');
assert.match(octoberSecond, /(?:午餐|lunch)[\s\S]{0,400}(?:DJ|泡沫派对|foam)|(?:DJ|泡沫派对|foam)[\s\S]{0,400}(?:午餐|lunch)/i, 'October 2 should disclose both the included lunch and party character');

assert.match(html, /name:'蝴蝶谷崖顶观景台（Faralya）'[\s\S]{0,180}stay:'10\/1固定主线'/, 'the route map should include Butterfly Valley as a fixed October 1 stop');
assert.match(html, /不下谷/, 'the guide should clearly prohibit descending from the cliff viewpoint');
assert.match(html, /只在[^<]{0,80}(?:合法|明确划出|正规)[^<]{0,40}停车/, 'the viewpoint guide should retain a legal-parking safety rule');

assert.doesNotMatch(html, /guide-images\/cappadocia-balloon\.jpg" alt="卡帕多奇亚地貌"[\s\S]{0,180}SAW→NAV/, 'a flight card must not reuse a balloon photograph');
assert.doesNotMatch(html, /Kekova|Simena|Bermuda|book-kekova/i, 'the cancelled Kekova day and booking content should be removed throughout the guide');

assert.match(html, /NAV\s*进[，、·\s]*ASR\s*出/, 'the guide should clearly distinguish the inbound NAV airport from outbound ASR');
assert.match(html, /9\/28[\s\S]{0,360}PC3503[\s\S]{0,180}22:05[\s\S]{0,100}23:25/, 'September 28 should use the direct PC3503 evening flight');
assert.match(html, /PC3503[^<]{0,100}(?:已订|已预订)[^<]{0,100}(?:待确认出票|出票待确认)/, 'PC3503 should be marked as booked while ticket issuance is still awaiting confirmation');
assert.match(html, /国内航班[^<]{0,100}起飞前约\s*2\s*小时[^<]{0,80}航站楼/, 'the guide should distinguish a two-hour domestic terminal-arrival target from the transfer time');
assert.match(html, /flypgs\.com\/en\/useful-info\/info-about-flights\/check-in/, 'the domestic-airport timing rule should link to Pegasus official guidance');
assert.match(html, /18:30[^<]{0,100}(?:ASR|开塞利)/, 'the airport transfer should leave Göreme at 18:30');
assert.match(html, /NAV[^<]{0,80}(?:接机|接送)[\s\S]{0,260}€15\s*\/\s*人[^<]{0,100}现金[\s\S]{0,220}(?:已确认|住宿方确认)/, 'the September 26 NAV shared shuttle should be recorded as confirmed at EUR 15 per person cash');
assert.match(html, /ASR[^<]{0,80}(?:送机|接送)[\s\S]{0,300}(?:按同类共享车|预算)[^<]{0,100}€15\s*\/\s*人[\s\S]{0,260}(?:实际报价|报价与订单)[^<]{0,100}(?:待确认|尚待确认)/, 'the September 28 ASR shuttle should use EUR 15 only as an explicitly unconfirmed planning assumption');
assert.match(html, /9\/28[^<]{0,180}(?:行李寄存|寄存两件行李)[^<]{0,120}(?:待书面确认|尚待确认)/, 'the post-checkout luggage storage should remain explicitly unconfirmed');
assert.doesNotMatch(html, /<strong>固定前往 ASR<\/strong>/, 'the guide must not describe the unconfirmed outbound shuttle as fixed');
assert.doesNotMatch(html, /17:30[^<]{0,100}(?:共同去ASR|离开格雷梅|乘接送去开塞利|前往 ASR)/, 'the superseded 17:30 airport-transfer departure should be removed');
assert.match(html, /class="flight-compact"/, 'the booked-flight facts should use a compact summary card');
assert.match(html, /<details class="flight-fallback">[\s\S]{0,180}<summary>航班取消／错过 Plan B<\/summary>/, 'the exceptional PC3503 fallback should be collapsed by default');
assert.doesNotMatch(html, /不要再搜 NAV→AYT/, 'the oversized NAV search warning should be removed from the primary heading');
assert.match(html, /1\. 确认 PC3503 出票与行李/, 'the checklist should verify ticket issuance and baggage instead of asking the traveller to book PC3503 again');
assert.match(html, /4\. 确认 VF3135 客票与行李/, 'the checklist should verify the already-booked October 3 flight instead of asking the traveller to book it');
assert.doesNotMatch(html, /4\. 订\s*10\/3\s*DLM→SAW/, 'the checklist must not keep the superseded October 3 booking task');
assert.doesNotMatch(html, /订三段境内机票/, 'the checklist should no longer imply that all three domestic flights remain unbooked');
assert.match(html, /<div class="date">09\.28<\/div>[\s\S]{0,4800}(?:AYT|Lara)[\s\S]{0,180}(?:住宿|入住)/, 'September 28 should finish at an Antalya or Lara hotel');
assert.match(html, /<div class="date">09\.26<\/div>[\s\S]{0,2600}<img src="guide-images\/goreme-night\.jpg" alt="格雷梅镇区与洞穴建筑亮灯夜景">[\s\S]{0,220}<span class="slot-time">17:30–19:30<\/span>[\s\S]{0,160}<h3>格雷梅日落观景台＋洞穴镇夜景<\/h3>[\s\S]{0,420}日落后继续停留 30–45 分钟[\s\S]{0,260}天黑后不进入山谷小径/, 'September 26 should explicitly retain the Göreme blue-hour and illuminated cave-town night view with a matching night photograph');
const septemberTwentyEighth = html.match(/<div class="date">09\.28<\/div>[\s\S]*?<div class="date">09\.29<\/div>/)?.[0] ?? '';
assert.match(septemberTwentyEighth, /(?:08:30|09:00|09:30)[\s\S]{0,1000}(?:Red Tour|北线)[\s\S]{0,1200}Paşabağ[\s\S]{0,900}Devrent[\s\S]{0,1000}Avanos[^<]{0,100}陶艺[\s\S]{0,1400}(?:最迟|不晚于)\s*16:30[\s\S]{0,1200}18:30/, 'September 28 should use a bounded platform Red Tour before the fixed airport transfer');
assert.match(septemberTwentyEighth, /guide-images\/pasabag\.jpg/, 'Paşabağ should use its own matching fairy-chimney photograph');
assert.match(septemberTwentyEighth, /guide-images\/avanos-pottery-workshop\.jpg/, 'the Avanos hands-on pottery stop should use its own matching photograph');
assert.match(septemberTwentyEighth, /getyourguide\.com\/avanos-l983\/red-tour-cappadocia-t689055\//, 'the September 28 itinerary should link its directly bookable platform product');
assert.match(septemberTwentyEighth, /(?:酒店接送|hotel pickup)[\s\S]{0,600}(?:午餐|lunch)[\s\S]{0,600}(?:门票|tickets)/i, 'the day plan should make the included transport, lunch and tickets explicit');
assert.match(septemberTwentyEighth, /(?:不|绝不)(?:再|要)?(?:自行|自己)[^<]{0,40}(?:找|联系)(?:私人)?司机/, 'the day plan should make clear that the traveller does not source a private driver');
assert.doesNotMatch(septemberTwentyEighth, /补飞|机会\s*2|成功升空|条件分支/, 'September 28 should no longer depend on a balloon-flight branch');

assert.match(html, /9\/28[\s\S]{0,260}(?:Red Tour|北线地貌)[\s\S]{0,300}(?:Paşabağ|Devrent)[\s\S]{0,400}Avanos[^<]{0,80}陶艺[\s\S]{0,500}(?:约\s*)?6小时[\s\S]{0,500}16:00/, 'the duration matrix should show the bounded six-hour Red Tour and planned hotel return');
assert.match(html, /name:'Paşabağ[^']*'[\s\S]{0,260}region:'cappadocia'[\s\S]{0,260}time:'9\/28[^']*'/, 'the Cappadocia map should include the September 28 fairy-chimney stop');
assert.match(html, /name:'Devrent[^']*'[\s\S]{0,260}region:'cappadocia'[\s\S]{0,260}time:'9\/28[^']*'/, 'the Cappadocia map should include the September 28 imagination-valley stop');
assert.match(html, /name:'Avanos[^']*(?:陶艺|Pottery)[^']*'[\s\S]{0,260}region:'cappadocia'[\s\S]{0,260}time:'9\/28[^']*'/i, 'the Cappadocia map should include the September 28 pottery stop');
assert.match(html, /(?:Avanos陶艺|Avanos\s*陶艺|北线地貌)[^<]{0,100}(?:Red Tour|小团)[\s\S]{0,260}¥570～850[\s\S]{0,300}平台主方案[^<]{0,80}¥570～650/, 'the budget should include both the verified platform main range and the host-tour fallback ceiling');
const budgetHeadline = html.match(/两人全程约\s*([0-9.]+)～([0-9.]+)\s*万/);
const budgetTotal = html.match(/两人基础全程预计<\/td><td>约\s*¥([\d,]+)～([\d,]+)/);
assert.ok(budgetHeadline && budgetTotal, 'the guide should expose both a headline budget and a total-row budget');
assert.equal(Math.round(Number(budgetHeadline[1]) * 10000), Number(budgetTotal[1].replaceAll(',', '')), 'the budget headline lower bound should match the total row');
assert.equal(Math.round(Number(budgetHeadline[2]) * 10000), Number(budgetTotal[2].replaceAll(',', '')), 'the budget headline upper bound should match the total row');
assert.match(html, /NAV→格雷梅[^<]{0,120}(?:已确认|确认)[\s\S]{0,300}格雷梅→ASR[^<]{0,220}(?:实际报价|付款方式)[^<]{0,100}(?:待确认|尚待确认)[\s\S]{0,260}€60/, 'the transport budget should show the two-shuttle planning total while separating confirmed arrival from unconfirmed departure terms');
assert.doesNotMatch(html, /id="book-ihlara-driver"|Ihlara＋Narlıgöl 私人司机|€190|EUR 190|¥1,850/, 'the old Ihlara private-driver plan and price limits should be gone');
const septemberTwentySeventh = html.match(/<div class="date">09\.27<\/div>[\s\S]*?<div class="date">09\.28<\/div>/)?.[0] ?? '';
assert.match(septemberTwentySeventh, /04:45[–-]07:45[\s\S]{0,600}地面追(?:热气球|球)/, 'September 27 should use a concrete shared ground chase window');
assert.match(septemberTwentySeventh, /起飞区[\s\S]{0,220}(?:Love Valley|爱情谷)[\s\S]{0,220}风向/, 'the ground chase should combine inflation views with wind-dependent viewpoints');
assert.doesNotMatch(septemberTwentySeventh, /第一批升空|约 60 分钟飞行|热气球机会\s*1/, 'September 27 should not retain the abandoned flight');
assert.match(html, /格雷梅[\s\S]{0,220}<td>2晚<\/td>/, 'the stay table should reduce Göreme to two nights');
assert.match(html, /安塔利亚机场[\s\S]{0,220}<td>1晚<\/td>/, 'the Antalya airport or Lara night should be fixed, not optional');
assert.match(html, /卡什[\s\S]{0,220}<td>2<\/td>/, 'the stay table should reduce Kaş to two nights');
assert.match(html, /(?:厄吕代尼兹|Ölüdeniz)[\s\S]{0,220}<td>2<\/td>/i, 'the stay table should add two nights in Ölüdeniz');

const octoberThird = html.match(/<div class="date">10\.03<\/div>[\s\S]*?<div class="date">10\.04<\/div>/)?.[0] ?? '';
assert.match(octoberThird, /DLM\s*→\s*SAW/, 'October 3 should fly from DLM to SAW instead of requiring an IST arrival');
assert.match(octoberThird, /VF3135[\s\S]{0,240}13:40[–-]15:00/, 'October 3 should use the confirmed VF3135 schedule');
assert.match(octoberThird, /(?:订单截图显示|已付)[^<]{0,80}¥684[^<]{0,80}(?:两位乘客|两人)/, 'October 3 should record the paid two-passenger amount without treating it as a live fare quote');
assert.match(octoberThird, /(?:托运行李|行李额度)[^<]{0,80}(?:未显示|待确认)/, 'October 3 should keep baggage allowance explicitly unconfirmed');
assert.match(octoberThird, /(?:厄吕代尼兹|Ölüdeniz)[^<]{0,180}(?:离开|出发)[\s\S]{0,500}DLM/i, 'October 3 should depart the two-night Ölüdeniz base for DLM');
assert.match(octoberThird, /10:30[–-]10:50[^<]{0,120}(?:还车|OPET)/, 'October 3 should give a bounded fuel and car-return window');
assert.match(octoberThird, /11:10[^<]{0,100}(?:航站楼|办理值机)/, 'October 3 should reach the terminal with a separate rental-return buffer before the two-hour baseline');
assert.match(octoberThird, /(?:纯\s*2\s*小时[^<]{0,120}11:40|11:40[^<]{0,120}(?:纯|标准|基准)[^<]{0,60}2\s*小时)/, 'October 3 should explain the pure two-hour terminal-arrival baseline');
assert.doesNotMatch(octoberThird, /10:40[^<]{0,100}(?:航站楼|办理值机)/, 'October 3 should remove the unnecessary three-hour terminal arrival');
assert.match(octoberThird, /M4[\s\S]{0,120}52\s*分钟/, 'October 3 should state the roughly 52-minute M4 ride from SAW');
assert.match(octoberThird, /落地到(?:码头|\s*Kadıköy)[^<]{0,60}100[–-]130\s*分/, 'October 3 should include baggage collection and station access in the SAW-to-Kadıköy timing');
assert.doesNotMatch(octoberThird, /落地后[^<]{0,40}70[–-]85\s*分/, 'October 3 must not confuse the train ride with the full baggage-inclusive transfer');
assert.match(octoberThird, /(?:只留|保留)[^<]{0,40}码头海边＋市场/, 'October 3 should keep the Kadıköy pier waterfront and market as the late-arrival fallback');
assert.match(octoberThird, /Kadıköy[^<]{0,80}市场/, 'October 3 should keep Kadıköy market as the second compact Asian-side stop');
assert.match(octoberThird, /Radical Storage[\s\S]{0,500}20:30/, 'October 3 should name the currently verified Kadıköy storage option and its closing time');
assert.match(octoberThird, /(?:网上|在线)预订[\s\S]{0,220}(?:具体门店地址在预订后显示|(?:预订|付款)后[^<]{0,40}(?:地址|门店))/, 'October 3 should explain that storage is booked online and the exact shop is disclosed afterwards');
assert.match(octoberThird, /(?:取件[^<]{0,100}19:45[\s\S]{0,160}20:00|19:45[–-]20:00[^<]{0,40}取件)/, 'October 3 should include a safe luggage collection window before closing');
assert.match(octoberThird, /Moda[^<]{0,80}(?:海边|海滨|海岸)[\s\S]{0,280}Kadıköy[^<]{0,80}市场/, 'October 3 should use luggage storage to make Moda waterfront and Kadıköy market the two Asian-side experiences');
assert.match(octoberThird, /guide-images\/moda-coast\.jpg/, 'the Moda stop should use a dedicated matching photograph');
assert.match(octoberThird, /17:30[^<]{0,100}(?:前|以前)[^<]{0,100}(?:完成寄存|寄存完成)/, 'October 3 should use storage completion by 17:30 as the full-route decision gate');
assert.match(octoberThird, /18:15[^<]{0,100}(?:后|以后)[\s\S]{0,260}(?:Plan B|备选)[\s\S]{0,180}不寄存/, 'October 3 should retain a no-storage fallback when reaching Kadıköy too late');
assert.match(octoberThird, /(?:渡轮|轮渡)[\s\S]{0,240}(?:欧洲侧|欧洲区)/, 'October 3 should return to the European side by ferry after the Asian-side visit');
assert.match(octoberThird, /(?:取回|取件)[^<]{0,30}行李(?:箱)?[\s\S]{0,220}(?:渡轮|轮渡)/, 'the evening ferry transfer should explicitly happen after collecting the stored luggage');
assert.match(octoberThird, /Gayrettepe[\s\S]{0,180}(?:实际\s*M11\s*入口|M11\s*实际入口)/, 'October 3 should stay near a verified Gayrettepe M11 entrance');
assert.doesNotMatch(octoberThird, /Levent[^<]{0,120}(?:步行|直达)[^<]{0,40}M11/, 'the guide must not imply that ordinary Levent hotels directly walk to M11');
assert.doesNotMatch(html, /SAW[^<]{0,30}(?:不可选|不能选)|廉航[^<]{0,30}SAW[^<]{0,30}(?:不可选|不能选)/, 'the guide must not categorically reject SAW or a low-cost flight merely for landing there');

assert.match(html, /VF3135[^<]{0,180}13:40[^<]{0,80}15:00/, 'flight and transport planning should show the confirmed VF3135 schedule');
assert.match(html, /¥684[^<]{0,100}(?:两位乘客|两人)/, 'the budget should include the paid October 3 order amount for two passengers');
assert.match(html, /(?:托运行李|行李额度)[^<]{0,100}(?:未显示|待确认)/, 'transport and budget should not invent baggage allowance from the screenshot');

const octoberFourth = html.match(/<div class="date">10\.04<\/div>[\s\S]*?<\/article>/)?.[0] ?? '';
assert.match(octoberFourth, /M11[\s\S]{0,180}IST/, 'October 4 should use M11 to reach IST from the European-side hotel area');

const transportSection = html.match(/<section class="section" id="transport">[\s\S]*?<section class="section" id="budget">/)?.[0] ?? '';
assert.match(transportSection, /Çizgi/, 'the car-rental plan should name Çizgi correctly');
assert.match(transportSection, /AYT\s*→\s*DLM[\s\S]{0,180}异地还车/, 'the car-rental plan should explicitly use one-way AYT to DLM return');
assert.match(transportSection, /(?:主方案|默认)[^<]{0,80}9\/29[^<]{0,60}10:30|9\/29[^<]{0,60}10:30[^<]{0,80}(?:主方案|默认)/, 'the car-rental plan should use the exact 10:30 pickup aligned with the return time');
assert.doesNotMatch(transportSection, /9\/29[^<]{0,100}08:30[^<]{0,100}(?:取车|主方案)/, 'the superseded 08:30 pickup should be removed from the rental plan');
assert.match(transportSection, /自动挡[^<]{0,120}(?:两件|2件)[^<]{0,50}(?:行李|托运|箱)/, 'the recommended automatic car should fit two checked suitcases');
assert.match(transportSection, /(?:one-way fee|异地还车费)[\s\S]{0,320}(?:里程额度|里程限制|总里程)[\s\S]{0,320}(?:押金|预授权)[\s\S]{0,320}(?:保险免赔|免赔额)/i, 'the rental checklist should confirm the one-way fee, mileage, deposit and insurance excess');
assert.match(transportSection, /DLM[\s\S]{0,240}OPET[\s\S]{0,240}(?:接驳|送机|航站楼)/, 'the rental checklist should confirm the DLM OPET return point and terminal transfer');

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
assert.match(html, /goreme\.bel\.tr[\s\S]{0,1000}shmkapadokya\.kapadokya\.edu\.tr|shmkapadokya\.kapadokya\.edu\.tr[\s\S]{0,1000}goreme\.bel\.tr/, 'ground balloon viewing should link an official viewpoint source and official flight status');
assert.doesNotMatch(html, /热气球机会\s*[12]|热气球\s*\/\s*Ihlara\s*二选一|First Ascent|Turquaz/, 'the abandoned balloon-flight branch should be removed throughout the guide');
assert.match(html, /kas\.bel\.tr\/proje\/kas-seyir-terasi-projesi-3184/, 'Kaş Seyir Terası should link to the municipal project page');
assert.match(html, /reaction-paragliding\.com/i, 'the October 1 paragliding plan should link ReAction directly');
assert.match(html, /dragonboatoludeniz\.info\/daytrip/i, 'the October 2 pirate-boat plan should link the official Dragon day trip');
assert.match(html, /metro\.istanbul\/en\/Hatlarimiz\/HatDetay\?hat=M4/, 'the SAW transfer should link to the official M4 page');
assert.match(html, /sehirhatlari\.istanbul\/tr\/seferler\/ic-hatlar\/istanbul-ici-hatlar\/kadikoybesiktas-165/, 'the luggage-friendly ferry transfer should link to the official timetable');
assert.match(html, /radicalstorage\.com\/luggage-storage\/istanbul\/haydarpasa\/luggage-storage-kadikoy/, 'the guide should link directly to the verified Kadıköy luggage-storage listing');
assert.match(html, /name:'Kadıköy寄存＋Moda海滨＋市场'[\s\S]{0,500}booking:'https:\/\/radicalstorage\.com\//, 'the return-map stop should store Radical as a booking link rather than mislabel it as navigation');
assert.match(html, /bookingLink[\s\S]{0,260}预订寄存 ↗/, 'the map popup should label the storage action clearly');
assert.match(html, /dhmi\.gov\.tr\/sayfalar\/havalimani\/istanbul\/Ulasim\.aspx/i, 'the final IST transfer should link to the airport authority');

console.log('Itinerary content and image mapping regression test passed');
