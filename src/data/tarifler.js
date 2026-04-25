// ─────────────────────────────────────────────────────────────────
//  MİSE — TARİF VERİTABANI
//  Yeni tarif eklemek için en alttaki ŞABLONU kopyala,
//  doldur ve TARIFLER dizisine ekle.
// ─────────────────────────────────────────────────────────────────

export const TARIFLER = [
  {
    id: 1,
    isim: 'Hünkar Beğendi',
    mutfak: 'Osmanlı',
    sure: '75 dk',
    zorluk: 'Orta',          // Kolay / Orta / İleri
    gorsel: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    hikaye: 'Yıl 1869. Mısır Hidivi\'nin daveti üzerine İstanbul\'a gelen Fransız İmparatoriçe Eugénie, Dolmabahçe Sarayı\'nda Sultan Abdülaziz\'in sofrasına oturur. O gece sunulan kuzu yahnili patlıcan püresi İmparatoriçe\'yi öyle büyüler ki tarifi ısrarla ister. Saray aşçısı tarifi vermez — saray sırrıdır. Yemeğin adı da o geceden kalır: Hünkar Beğendi. Hükümdarın beğendiği. Bir imparatoriçeyi hayran bırakan, bir sultanın sofrasından dünya mutfağına açılan köprü.',
    malzemeler: [
      { isim: 'Kuzu but (küp doğranmış)', miktar: 800, birim: 'g' },
      { isim: 'Soğan', miktar: 2, birim: 'adet' },
      { isim: 'Domates (rendelenmiş)', miktar: 3, birim: 'adet' },
      { isim: 'Sarımsak', miktar: 4, birim: 'diş' },
      { isim: 'Tereyağı', miktar: 40, birim: 'g' },
      { isim: 'Zeytinyağı', miktar: 2, birim: 'tbsp' },
      { isim: 'Defne yaprağı', miktar: 2, birim: 'adet' },
      { isim: 'Kekik', miktar: 1, birim: 'tsp' },
      { isim: 'Patlıcan (büyük)', miktar: 4, birim: 'adet' },
      { isim: 'Tereyağı (beşamel)', miktar: 60, birim: 'g' },
      { isim: 'Un (beşamel)', miktar: 3, birim: 'tbsp' },
      { isim: 'Süt (ılık)', miktar: 400, birim: 'ml' },
      { isim: 'Kaşar peyniri (rendelenmiş)', miktar: 100, birim: 'g' },
      { isim: 'Muskat rendesi', miktar: 0.25, birim: 'tsp' },
    ],
    adimlar: [
      'Kuzuyu tuz ve karabiberle tatlandır. Zeytinyağında yüksek ateşte her tarafını mühürle, kenara al.',
      'Aynı tencerede soğanı kavur. Sarımsak ve domatesi ekle, 5 dk pişir.',
      'Eti geri ekle, defne ve kekiği koy. Üstünü geçecek kadar su ekle.',
      'Kısık ateşte 50-60 dk, et düşene kadar pişir.',
      'Patlıcanları açık ateşte veya fırın ızgarasında yakarak közle — deri tamamen siyahlaşmalı.',
      'Közlenmiş patlıcanları naylon poşette 10 dk beklet, derilerini soy. Suyunu süz.',
      'Beşamel: tereyağını eritin, unu ekleyip 2 dk kavurun. Ilık sütü yavaş yavaş ekleyerek çırpın.',
      'Patlıcanı beşamele ekleyip tahta kaşıkla ezin. Peynir ve muskatı katın, tuz ayarlayın.',
      'Servis: geniş tabağa patlıcan püresi yay, üstüne kuzu yahnisi koy.',
    ],
    teknik_isim: 'Közleme',
    teknik: 'Patlıcanı sadece fırında pişirmek değil, YAKMAK gerekir. Dışı tamamen kömürleşmeli. Bu yanık deri, içerideki ete dumanlı, derin bir aroma verir — hiçbir başka yöntemle elde edilemez. Poşette bekletmek soyma işlemini kolaylaştırır ve o son damlacık dumanlı suyu da içerde tutar.',
    besin: { kalori: 520, protein: 38, karbonhidrat: 22, yag: 32 },
  },

  {
    id: 2,
    isim: 'İmam Bayıldı',
    mutfak: 'Osmanlı',
    sure: '60 dk',
    zorluk: 'Kolay',
    gorsel: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    hikaye: 'Bir imam varmış. Sofrasına bu yemek geldiğinde bayılmış. Neden bayıldı? İki rivayet çarpışır tarih boyunca. Birinci rivayet romantik: yemeğin lezzeti o kadar muhteşemmiş ki imam kendinden geçmiş. İkinci rivayet acı: zeytinyağının masrafını duyunca cüzdanı için bayılmış. Hangisi doğru? Muhtemelen ikisi de. Çünkü İmam Bayıldı hem inanılmaz lezzetli hem de inanılmaz cömert bir yemektir — içindeki zeytinyağını esirgemezseniz.',
    malzemeler: [
      { isim: 'Patlıcan (orta boy)', miktar: 4, birim: 'adet' },
      { isim: 'Soğan (ince yarım ay)', miktar: 3, birim: 'adet' },
      { isim: 'Sarımsak', miktar: 6, birim: 'diş' },
      { isim: 'Domates (küp doğranmış)', miktar: 4, birim: 'adet' },
      { isim: 'Zeytinyağı', miktar: 150, birim: 'ml' },
      { isim: 'Maydanoz (ince kıyılmış)', miktar: 1, birim: 'demet' },
      { isim: 'Şeker', miktar: 1, birim: 'tsp' },
      { isim: 'Tuz', miktar: 1.5, birim: 'tsp' },
      { isim: 'Su', miktar: 100, birim: 'ml' },
    ],
    adimlar: [
      'Patlıcanları boyuna çizgili soy (zebra gibi), tuzlu suda 20 dk beklet. Bol suyla yıka, kurula.',
      'Her patlıcanın üstüne boyuna derin bir cep aç — dipten ve ucundan kesmeden.',
      'Soğanı zeytinyağında (50 ml) sarartana dek kavur. Sarımsak ekle, 2 dk daha.',
      'Domatesi, şekeri ve tuzu ekle. 10 dk pişir, maydanozu koy, ocaktan al.',
      'İç harcı patlıcan ceplerine doldur, bastır.',
      'Geniş tencereye diz. Üstüne kalan zeytinyağı ve suyu dök.',
      'Kısık ateşte kapak kapalı 35-40 dk pişir. Soğuk veya ılık servis et.',
    ],
    teknik_isim: 'Zeytinyağı Dengesi',
    teknik: 'Tarifte 150 ml zeytinyağı görünce "çok fazla" diye azaltmak yemeği mahveder. Zeytinyağlı yemeklerde yağ sadece pişirme aracı değil — sos, taşıyıcı ve koruyucudur. Soğuduğunda yağ yeniden yemeğin içine çekilir ve o kremsi, zengin dokuyu oluşturur. İmam Bayıldı\'nın sırrı burada yatar.',
    besin: { kalori: 290, protein: 4, karbonhidrat: 18, yag: 24 },
  },

  {
    id: 3,
    isim: 'Keskek',
    mutfak: 'Anadolu',
    sure: '5 saat',
    zorluk: 'İleri',
    gorsel: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80',
    hikaye: '2011\'de UNESCO\'nun Somut Olmayan Kültürel Miras Listesi\'ne giren tek Türk yemeği. Ama asıl hikayesi çok daha eskiye gider — MÖ 3000\'lere, Anadolu\'nun ilk tahıl medeniyetlerine. Keskek düğünlerde, cenazede, bayramlarda pişirilir. Sadece bir yemek değil, topluluk eylemidir. Büyük kazanların başında saatlerce tokmaklarla dövülen buğday ve et, köy meydanlarında birlikte yenilir. Yemek bitmeden merasim bitmez.',
    malzemeler: [
      { isim: 'Dövme buğday (bir gece ıslatılmış)', miktar: 500, birim: 'g' },
      { isim: 'Kuzu but veya kol', miktar: 1000, birim: 'g' },
      { isim: 'Soğan', miktar: 2, birim: 'adet' },
      { isim: 'Tereyağı', miktar: 100, birim: 'g' },
      { isim: 'Tuz', miktar: 2, birim: 'tsp' },
      { isim: 'Su', miktar: 3, birim: 'l' },
      { isim: 'Pul biber (üzeri için)', miktar: 1, birim: 'tsp' },
      { isim: 'Kuru nane (üzeri için)', miktar: 1, birim: 'tsp' },
    ],
    adimlar: [
      'Islatılmış buğdayı ve eti büyük tencereye koy. Soğanı bütün ekle, 3 litre su dök.',
      'Kaynamaya başlayınca köpüğü al. Tuzla, kısık ateşe al.',
      'En az 3-4 saat, buğday ve et tamamen dağılana kadar pişir. Su azalırsa kaynar su ekle.',
      'Et kemikten düştüğünde çıkar, kemiklerini ayıkla, eti parçala.',
      'Ahşap tokmak veya ağır kaşıkla buğdayı döv, eti geri ekle — pürüzsüz, yapışkan bir kıvam hedefliyorsun.',
      'Geniş servis tabağına al. Ortasına çukur aç.',
      'Tereyağını kızdır, pul biber ve naneyi ekle. Çukura dök, hemen servis et.',
    ],
    teknik_isim: 'Dövme Tekniği',
    teknik: 'Santrifüj gibi dönen modern mikserler değil, tekrarlayan darbe hareketi gerekir. Tokmak her vuruşta hem buğdayı ezer hem de gluteni aktive eder — bu, o karakteristik yapışkan, ipeksi dokuyu verir. Sabırsızlanıp blender kullanmak yemeği lapa yapar. Orijinal kıvam için en az 15-20 dakika dövmek şarttır.',
    besin: { kalori: 610, protein: 45, karbonhidrat: 52, yag: 24 },
  },
];

// ─────────────────────────────────────────────────────────────────
//  YENİ TARİF ŞABLONU — Kopyala, doldur, TARIFLER dizisine ekle
// ─────────────────────────────────────────────────────────────────
//
// {
//   id: 4,                          // bir öncekinden +1
//   isim: 'Tarif Adı',
//   mutfak: 'Türk',                 // Osmanlı / Anadolu / Türk / İtalyan vs.
//   sure: '30 dk',
//   zorluk: 'Kolay',               // Kolay / Orta / İleri
//   gorsel: 'https://...',          // Unsplash veya başka bir görsel URL
//   hikaye: 'Yemeğin hikayesi...',  // 3-5 cümle, geçmişi, efsanesi
//   malzemeler: [
//     { isim: 'Malzeme adı', miktar: 100, birim: 'g' },
//     // birim: g / ml / adet / diş / demet / tsp / tbsp / l
//   ],
//   adimlar: [
//     'Birinci adım.',
//     'İkinci adım.',
//   ],
//   teknik_isim: 'Teknik Adı',      // Örn: Kavurma, Emülsiyon, Dinlendirme
//   teknik: 'Tekniğin açıklaması...', // 2-4 cümle, bilimsel arka plan
//   besin: { kalori: 0, protein: 0, karbonhidrat: 0, yag: 0 },
// },