/* The two data sets below are deliberately local: this guide remains usable offline. */
(() => {
  const mapUrl = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const place = (name, address, query = `${name} ${address}`) => ({ name, address, query });
  const airport = place('伊斯坦布尔机场 IST', 'İstanbul Havalimanı, Arnavutköy/İstanbul');
  const saw = place('萨比哈·格克琴机场 SAW', 'Sabiha Gökçen Havalimanı, Pendik/İstanbul');
  const nav = place('内夫谢希尔机场 NAV', 'Nevşehir Kapadokya Havalimanı, Gülşehir/Nevşehir');
  const asr = place('开塞利机场 ASR', 'Kayseri Erkilet Havalimanı, Kocasinan/Kayseri');
  const ayt = place('安塔利亚机场 AYT', 'Antalya Havalimanı, Muratpaşa/Antalya');
  const dlm = place('达拉曼机场 DLM', 'Dalaman Havalimanı, Dalaman/Muğla');
  const cSuites = place('C Suites Antalia Airport', 'Altınova Mah., Perge Sk. No:7/A D:9, Kepez/Antalya');
  const kasHotel = place('Kaş Old Town Hotel & Beach', 'Andifli Mah., Hastane Cd. No:26, Kaş/Antalya（酒店官网；地图也标作 Necipbey Cd. No:26）', 'Kaş Old Town Hotel & Beach Kaş');
  const turquoise = place('Ölüdeniz Turquoise Hotel', 'Ölüdeniz Mah., Çarşı Cd. No:16, Fethiye/Muğla');
  const villa = place('Villa Blanche Hotel SPA & Garden Pool', 'Gazeteciler Sitesi, Keskin Kalem Sk. No:7, Esentepe/İstanbul');
  const goreme = place('格雷梅镇中心／住处', 'Göreme, Nevşehir；住处精确门牌在 Airbnb 订单内', 'Göreme Otogar Nevşehir');
  const sultan = place('苏丹艾哈迈德广场', 'Sultanahmet Meydanı, Fatih/İstanbul');
  const seven = place('Seven Hills Restaurant', 'Tevkifhane Sk. No:8, Sultanahmet, Fatih/İstanbul');
  const kofte = place('Meşhur Sultanahmet Köftecisi', 'Divan Yolu Cd. No:4, Sultanahmet/İstanbul');
  const sakli = place('Saklı Konak', '2. Karlık Sk. No:3, Uçhisar/Nevşehir');
  const seten = place('Seten Restaurant', 'Aydınlı Mah., Çakmaklı Sk. No:35, Göreme/Nevşehir');
  const ankaraSofrasi = place('Ankara Sofrası Göreme', 'İsalı Gaferli Mah., Müze Cd., Çarşı Bazaar Pasajı No:9, Göreme/Nevşehir');
  const dibek = place('Dibek', 'Cami Sk., Göreme/Nevşehir');
  const hopper = place('Hopper Coffee House', 'Aydınlı Orta Mah., Belediye Cd. No:5, Göreme/Nevşehir', 'Hopper Coffee House Göreme');
  const biLokma = place('Bi Lokma', 'Andifli Mah., Uğur Mumcu Cd. No:21, Kaş/Antalya');
  const ruhi = place('Ruhi Bey Meyhanesi', 'Andifli Mah., Süleyman Sandıkçı Sk. No:9, Kaş/Antalya（地图资料；订位时复核）', 'Ruhi Bey Meyhanesi Kaş');
  const harbour = place('Kaş Harbour', 'Kaş Limanı, Andifli/Kaş；具体船舶柜台以订单为准');
  const belcekiz = place('Belcekız Beach / Dragon 集合区', 'Belcekız Plajı, Ölüdeniz/Fethiye；Dragon 售票柜台位置以订单为准', 'Dragon Boat Ölüdeniz Belcekız Beach');
  const ciya = place('Çiya Sofrası', 'Güneşlibahçe Sk. No:43, Kadıköy/İstanbul');
  const fazil = place('Fazıl Bey Türk Kahvesi', 'Serasker Cd. No:1/A, Kadıköy/İstanbul');

  // One entry for each visible itinerary slot, in day order. Multiple pins appear when a card has multiple stops.
  const slotLocations = [
    [
      [airport, sultan, place('Airbnb 私人住处', '准确地址与清晨寄存方式：查看 Airbnb 订单，不公开展示', 'Sultanahmet Istanbul')],
      [sultan, place('蓝色清真寺', 'Sultanahmet Camii, Atmeydanı Cd. No:7, Fatih/İstanbul'), place('圣索菲亚', 'Ayasofya Meydanı No:1, Fatih/İstanbul')],
      [kofte, place('Airbnb 私人住处', '入住门牌以 Airbnb 订单为准', 'Sultanahmet Istanbul')],
      [place('居尔哈内公园', 'Gülhane Parkı, Alemdar Cd., Fatih/İstanbul'), place('Sarayburnu 海边', 'Sarayburnu, Fatih/İstanbul')],
      [seven],
      [place("Harab'be Café", 'Ticarethane Çk. No:4B, Sultanahmet/İstanbul'), place('Şerbethane Café', 'Arasta Çarşısı Sk. No:98, Sultanahmet/İstanbul')]
    ],
    [
      [place('香料市场', 'Rüstempaşa Mah., Erzak Ambarı Sk. No:92, Fatih/İstanbul'), place('加拉塔桥', 'Galata Köprüsü, Fatih/İstanbul')],
      [place('Eminönü 鱼三明治码头', 'Eminönü Meydanı／Balık Ekmek 船摊, Fatih/İstanbul')],
      [place('Şark Kahvesi', 'Yağlıkçılar Cd. No:134, Kapalıçarşı, Fatih/İstanbul')],
      [place('Şehir Hatları Eminönü 码头', 'Eminönü Şehir Hatları İskelesi, Fatih/İstanbul；核对 Kısa Boğaz Turu 窗口')],
      [place('Üsküdar 海岸', 'Üsküdar Sahil, Üsküdar/İstanbul'), ciya, fazil],
      [place('ReCafe', 'Caferağa Mah., Dumlupınar Sk. No:9/A, Kadıköy/İstanbul；营业待复核')]
    ],
    [[saw, nav, goreme], [sakli, place('乌奇萨城堡', 'Uçhisar Kalesi, Uçhisar/Nevşehir'), place('鸽子谷观景', 'Güvercinlik Vadisi, Uçhisar/Nevşehir')], [place('Aydınkırağı 日落观景台', 'Aydınkırağı／Sunset Point, Göreme/Nevşehir'), seten]],
    [[goreme, place('老爷车追球集合', '起飞区及后续观景点随风向变化；接车地址以 Airbnb 订单确认', 'Göreme Nevşehir')], [goreme, ankaraSofrasi], [hopper, place("King's Coffee", 'Göreme merkez, Nevşehir；以店铺定位核对入口', "King's Coffee Cappadocia Göreme")], [place('红谷／玫瑰谷入口', 'Kızılçukur Vadisi Seyir Tepesi, Ortahisar/Nevşehir；徒步入口按当日路线选')], [dibek, place('Göreme Discount Coffee', 'İsali Gaferli Avcılar Mah., Bilal Eroğlu Cd. No:41B, Göreme/Nevşehir', 'Göreme Discount Coffee')]],
    [[goreme], [place('Paşabağ', 'Paşabağları, Çavuşin/Avanos, Nevşehir'), place('Zelve 露天博物馆', 'Zelve Açık Hava Müzesi, Avanos/Nevşehir')], [place('Devrent 想象谷', 'Devrent Vadisi, Avanos/Nevşehir')], [place('Avanos 镇中心', 'Avanos merkez, Nevşehir；团餐及陶艺工坊的门牌以平台订单为准')], [goreme, asr, ayt]],
    [[cSuites, ayt], [place('下杜登瀑布陆地观景台', 'Aşağı Düden Şelalesi／Düden Parkı, Çağlayan/Muratpaşa, Antalya')], [kasHotel, harbour, place('卡什古剧场', 'Antiphellos Antik Tiyatrosu, Andifli/Kaş')]],
    [[kasHotel, harbour], [harbour, place('Kekova 沉没之城', 'Kekova Adası, Demre/Antalya；只能随船观看'), place('Kaleköy／Simena', 'Kaleköy, Demre/Antalya')], [kasHotel, biLokma]],
    [[place('Kaş Seyir Terası', 'Kaş Seyir Terası, Kaş–Kalkan Yolu, Kaş/Antalya')], [place('Kaputaş Plajı', 'Kaş–Kalkan D400, Kalkan/Kaş, Antalya；仅使用正规停车区')], [place('Patara Plajı', 'Gelemiş Mah., Patara Yolu, Kaş/Antalya')], [place('蝴蝶谷崖顶观景点', 'Faralya, Kelebekler Vadisi Viewpoint, Fethiye/Muğla；仅安全停车处')], [turquoise, place('ReAction 滑翔伞报到', 'Ölüdeniz／Belcekız, Fethiye；柜台门牌以预订凭证为准', 'ReAction Paragliding Ölüdeniz')]],
    [[turquoise, belcekiz], [belcekiz], [belcekiz, turquoise]],
    [[turquoise], [turquoise, dlm, saw], [place('Kadıköy 行李寄存', '具体寄存门店与门牌：以预订凭证为准', 'Kadıköy Radical Storage'), place('Moda 海滨', 'Moda Sahili, Caferağa/Kadıköy, İstanbul')], [fazil, ciya], [place('Kadıköy 渡轮码头', 'Kadıköy Şehir Hatları İskelesi, Kadıköy/İstanbul'), place('Beşiktaş 渡轮码头', 'Beşiktaş Şehir Hatları İskelesi, Beşiktaş/İstanbul'), villa]],
    [[villa, place('Gayrettepe M11 站', 'Gayrettepe Metro İstasyonu M11, Şişli/İstanbul；实际入口现场复核')], [place('Gayrettepe M11 站', 'Gayrettepe Metro İstasyonu, Şişli/İstanbul'), airport], [airport]]
  ];

  const days = [...document.querySelectorAll('#itinerary .day')];
  days.forEach((day, dayIndex) => {
    const slots = [...day.querySelectorAll('.slot')];
    slots.forEach((slot, slotIndex) => {
      const pins = slotLocations[dayIndex]?.[slotIndex];
      if (!pins?.length) return;
      const box = document.createElement('div'); box.className = 'slot-address';
      const heading = document.createElement('strong'); heading.textContent = '地址／导航'; box.append(heading);
      pins.forEach(({name, address, query}) => {
        const row = document.createElement('div'); row.className = 'slot-address-row';
        const detail = document.createElement('span'); detail.textContent = `${name}｜${address}`;
        const link = document.createElement('a'); link.className = 'slot-map'; link.href = mapUrl(query);
        link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = '导航 ↗';
        row.append(detail, link); box.append(row);
      });
      slot.querySelector('.slot-text')?.append(box);
    });
  });

  const meal = (title, address, query, photo, note = '', alt = '') => ({title, address, query, photo, note, alt});
  const meals = [
    ['9/24 老城', meal('机上／老城简餐', 'IST 机场或 Sultanahmet Meydanı, Fatih', 'Sultanahmet Meydanı Istanbul', 'food-pide.jpg'), meal('Meşhur Sultanahmet Köftecisi', kofte.address, kofte.query, 'food-manti.jpg', '肉丸＋豆沙拉；按当日 TRY 菜单结算'), meal('Seven Hills 屋顶', seven.address, seven.query, 'food-meze.jpg', '18:15 露台订位；夜景和水烟供应须预先确认'), meal("Harab'be／Şerbethane 备选", 'Ticarethane Çk. No:4B／Arasta Çarşısı Sk. No:98, Sultanahmet', "Harab'be Cafe Sultanahmet", 'hookah-shisha.jpg', 'Seven Hills 无水烟才二选一；Şerbethane 需另查')],
    ['9/25 老城→亚洲区', meal('Simit＋茶', 'Sultanahmet Meydanı, Fatih', sultan.query, 'turkish-coffee.jpg'), meal('Eminönü 鱼三明治；Balkan 备选', '鱼船摊: Eminönü Meydanı；Balkan: Hoca Paşa Sk. No:12 D:14, Sirkeci/Fatih', 'Eminönü Balık Ekmek', 'food-fish.jpg', '11:15 快餐；鱼摊不开才用 Sirkeci 的 Balkan'), meal('Çiya Sofrası／Yanyalı Fehmi 备选', 'Güneşlibahçe Sk. No:43／Yağlıkçı İsmail Sk. No:1, Kadıköy', ciya.query, 'food-sarma.jpg', '排队久就换 Yanyalı Fehmi'), meal('Şark Kahvesi；Fazıl Bey 可选', 'Yağlıkçılar Cd. No:134, Fatih；Fazıl Bey: Serasker Cd. No:1/A, Kadıköy', 'Şark Kahvesi Grand Bazaar', 'turkish-coffee.jpg', '水烟 ReCafe 仅营业核实后去；9/25喝过 Fazıl Bey，10/3不重复')],
    ['9/26 格雷梅', meal('SAW 机场／机上', saw.address, saw.query, 'turkish-coffee.jpg', '航班前自理'), meal('Saklı Konak', sakli.address, sakli.query, 'food-manti.jpg', '乌奇萨顺路；汤、Mantı'), meal('Seten／Pumpkin 备选', `${seten.address}；Pumpkin: İçeridere Sk. No:21/A, Göreme（地图资料，复核）`, seten.query, 'food-sarma.jpg', 'Seten 先到先坐；排队久再查 Pumpkin'), meal('不另加站', 'Göreme 镇中心；住宿地址见订单', goreme.query, 'turkish-coffee.jpg', '次日老爷车很早接')],
    ['9/27 追球', meal('住宿早餐', 'Göreme 镇中心；具体门牌见 Airbnb 订单', goreme.query, 'turkish-coffee.jpg'), meal('Ankara Sofrası Göreme', ankaraSofrasi.address, ankaraSofrasi.query, 'food-pide.jpg', '镇内汤或 Pide；Topdeck 不做午餐'), meal('Dibek／Topdeck Cave 备选', 'Dibek: Cami Sk.；Topdeck: Hafız Abdullah Efendi Sk. No:15, Göreme', dibek.query, 'food-manti.jpg', '传统陶罐菜；Topdeck 是晚餐备选'), meal("Hopper／King's Coffee；夜间水烟可选", `${hopper.address}；Discount Coffee: Bilal Eroğlu Cd. No:41B, Göreme`, hopper.query, 'turkish-coffee.jpg', '徒步前只选一家咖啡；晚餐后再看水烟')],
    ['9/28 北线→机场', meal('住宿早餐／附近简餐', 'Göreme 镇中心；门牌见订单', goreme.query, 'turkish-coffee.jpg'), meal('Red Tour 团餐', 'Avanos merkez, Nevşehir；餐厅门牌以团单为准', 'Avanos Nevşehir', 'food-meze.jpg', '下单时确认团餐包含'), meal('Ankara Sofrası 或机场简餐', `${ankaraSofrasi.address}；备选 ASR 机场`, ankaraSofrasi.query, 'food-pide.jpg', '回镇时间不足就直接在机场吃'), meal('不单独安排', 'Göreme／ASR 机场', asr.query, 'turkish-coffee.jpg')],
    ['9/29 安塔利亚→卡什', meal('C Suites 自理', cSuites.address, cSuites.query, 'turkish-coffee.jpg', '订单未证实含早'), meal('路上简餐／Bi Lokma', `${biLokma.address}；途中按 D400 实际进度停车`, biLokma.query, 'food-manti.jpg', '不为午餐绕去 Kalkan'), meal('Ruhi Bey Meyhanesi', ruhi.address, ruhi.query, 'food-fish.jpg', '古剧场日落后；鱼价先确认'), meal('不单独安排', 'Kaş merkez, Andifli/Antalya', 'Kaş merkez Antalya', 'turkish-coffee.jpg')],
    ['9/30 Kekova', meal('住处／港口自理', `${kasHotel.address}；Kaş Limanı, Andifli/Kaş`, harbour.query, 'turkish-coffee.jpg'), meal('Kekova 船餐', 'Kaş Limanı 上船；具体船名和柜台以订单为准', harbour.query, 'food-fish.jpg', '预订时确认含餐'), meal('Bi Lokma；Keyf-i Dem／Oburus 备选', `${biLokma.address}；Keyf-i Dem: Hükümet Cd. Liman Yolu No:4；Oburus: Adil Akba Sk. No:13, Kaş`, biLokma.query, 'food-manti.jpg', '海鲜或素食二选一；鱼价先问'), meal('港口散步即可', 'Kaş Limanı, Andifli/Kaş', harbour.query, 'turkish-coffee.jpg')],
    ['10/1 D400＋滑翔伞', meal('早退房前简餐', kasHotel.address, kasHotel.query, 'turkish-coffee.jpg'), meal('车上备水＋三明治', 'Kaputaş Plajı D400 正规停车区；此处不安排正式餐馆', 'Kaputaş Plajı Kaş', 'food-pide.jpg'), meal('Turquoise 全包晚餐', turquoise.address, turquoise.query, 'food-meze.jpg', '已含房费'), meal('不加停靠', turquoise.address, turquoise.query, 'turkish-coffee.jpg', '先保证滑翔伞报到')],
    ['10/2 海盗船', meal('Turquoise 全包', turquoise.address, turquoise.query, 'food-meze.jpg'), meal('Dragon 船餐', belcekiz.address, belcekiz.query, 'food-fish.jpg', 'Belcekız Beach 登船，饮料另付；柜台以订单为准'), meal('Turquoise 全包／Buzz Beach Bar 自费备选', `${turquoise.address}；Buzz: Belcekız Plajı, Ölüdeniz`, turquoise.query, 'food-meze.jpg', '想看海再换 Buzz'), meal('海边休息', 'Belcekız Plajı, Ölüdeniz/Fethiye', belcekiz.query, 'turkish-coffee.jpg')],
    ['10/3 还车→Kadıköy', meal('Turquoise 全包', turquoise.address, turquoise.query, 'food-meze.jpg'), meal('DLM／SAW 机场简餐', `${dlm.address}／${saw.address}`, dlm.query, 'food-pide.jpg'), meal('Çiya／Yanyalı Fehmi 备选', 'Güneşlibahçe Sk. No:43／Yağlıkçı İsmail Sk. No:1, Kadıköy', ciya.query, 'food-sarma.jpg', '取行李和渡轮硬时间优先'), meal('Fazıl Bey／ReCafe 可选', 'Serasker Cd. No:1/A／Dumlupınar Sk. No:9/A, Kadıköy', fazil.query, 'turkish-coffee.jpg', '9/25没去才喝；水烟需复核营业；甜点选 Künefe')],
    ['10/4 返程', meal('前夜备轻食＋咖啡', villa.address, villa.query, 'turkish-coffee.jpg', '不依赖未核实的 Mado 分店'), meal('机场／机上', airport.address, airport.query, 'food-pide.jpg'), meal('返程航班', airport.address, airport.query, 'food-meze.jpg', '不另安排餐厅'), meal('不安排', airport.address, airport.query, 'turkish-coffee.jpg')]
  ];

  const tbody = document.querySelector('#restaurants .illustrated-meals tbody');
  if (tbody) meals.forEach(([day, ...entries]) => {
    const tr = document.createElement('tr'); tr.className = 'meal-day';
    const date = document.createElement('th'); date.scope = 'row'; date.textContent = day; tr.append(date);
    entries.forEach(({title, address, query, photo, note, alt}) => {
      const td = document.createElement('td');
      const item = document.createElement('div'); item.className = 'meal-entry';
      const img = document.createElement('img'); img.className = 'meal-photo'; img.src = `guide-images/${photo}`;
      img.alt = alt || '土耳其餐食或旅行场景示意图，并非对应餐厅实拍'; img.loading = 'lazy';
      const body = document.createElement('div'); body.className = 'meal-entry-body';
      const titleEl = document.createElement('strong'); titleEl.textContent = title;
      const addressEl = document.createElement('span'); addressEl.className = 'meal-address'; addressEl.textContent = address;
      const link = document.createElement('a'); link.href = mapUrl(query); link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = '导航 ↗';
      body.append(titleEl, addressEl, link);
      if (note) { const small = document.createElement('small'); small.textContent = note; body.append(small); }
      item.append(img, body); td.append(item); tr.append(td);
    });
    tbody.append(tr);
  });
})();
