// ─────────────────────────────────────────────────────────────────
//  MİSE — TEMEL BİLGİLER VERİTABANI
//  Yapı Supabase'e taşınmaya hazır.
//  Her içerik: id, kategori, baslik, ozet, icerik, gorsel, sure_okuma
// ─────────────────────────────────────────────────────────────────

export const KATEGORILER = [
  { id: 'pisirme',  label: 'Pişirme Teknikleri', ikon: '🔥' },
  { id: 'araclar',  label: 'Mutfak Araçları',     ikon: '🔪' },
  { id: 'malzeme',  label: 'Malzeme Bilgisi',     ikon: '🌿' },
  { id: 'kimya',    label: 'Temel Kimya',          ikon: '⚗️' },
  { id: 'lezzet',   label: 'Lezzet Bilimi',        ikon: '👅' },
];

export const TEMEL_BILGILER = [

  // ── PİŞİRME TEKNİKLERİ ──────────────────────────────────────────

  {
    id: 1,
    kategori_id: 'pisirme',
    kategori: 'Pişirme Teknikleri',
    baslik: 'Maillard Reaksiyonu',
    ozet: 'Etin neden kızarınca bu kadar lezzetli olduğunun sırrı tek bir kimyasal reaksiyonda yatar.',
    icerik: `Fransız kimyager Louis-Camille Maillard 1912'de bir şey keşfetti: proteinler ve şekerler yüksek ısıda birleştiğinde, yüzlerce farklı lezzet ve aroma bileşiği ortaya çıkar. Buna Maillard Reaksiyonu denir.

Bu reaksiyon 140-165°C arasında gerçekleşir. Bu yüzden eti önce yüksek ateşte mühürleriz — içini pişirmek için değil, dışında o altın-kahverengi kabuğu oluşturmak için.

Pratikte ne anlama gelir? Tavayı önceden iyice kızdır. Islak et koyma — nem buharlaşmaya harcanan enerji reaksiyonu engeller. Et tavaya değdiğinde cızırtı sesi duymalısın. Sessizce pişiyorsa tava soğuktur.

Maillard sadece ette değil: ekmek kabuğu, kavurulmuş kahve, kızarmış soğan — hepsinin arkasında aynı reaksiyon var.`,
    sure_okuma: '3 dk',
    gorsel: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
  },

  {
    id: 2,
    kategori_id: 'pisirme',
    kategori: 'Pişirme Teknikleri',
    baslik: 'Sous Vide',
    ozet: 'Vakumlu torbada, hassas ısı kontrolüyle pişirme. Profesyonel mutfakların sırrı artık evde.',
    icerik: `Sous vide Fransızca "vakum altında" demektir. Et veya sebzeyi vakumlu torbaya koyar, sabit sıcaklıktaki su banyosuna daldırırsın. Sonuç: her seferinde mükemmel, homojen pişmiş yiyecek.

Neden bu kadar etkili? Geleneksel pişirmede dışarısı aşırı pişer, içerisi çiğ kalır. Sous vide'de tüm et tam istediğin sıcaklığa ulaşır — ne fazla ne eksik.

Dana biftek için 54°C (medium-rare) suda 1-4 saat. Tavuk göğsü için 65°C'de 1-2 saat. Yumurta için 63°C'de 1 saat — sarısı akışkan, beyazı pişmiş.

Sous vide sonrası mutlaka yüksek ateşte 60 saniye mühürle. Maillard reaksiyonu için bu adım atlanmamalı — sous vide güzel iç doku verir, mühürleme ise o kabuğu ve aromayı.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  },

  {
    id: 3,
    kategori_id: 'pisirme',
    kategori: 'Pişirme Teknikleri',
    baslik: 'Kavurma (Sauté)',
    ozet: 'Yüksek ısı, az yağ, hız. Doğru kavurma tekniği lezzeti katlayarak artırır.',
    icerik: `Sauté Fransızcada "zıplamak" demektir — tavada malzemenin sürekli hareket etmesinden gelir. Teknik basit görünür ama birkaç kritik detay farkı yaratır.

En önemli kural: tava sıcak olmalı, malzeme kuru olmalı. Islak sebze veya et koyarsan buhar oluşur, kavurma değil haşlama yaparsın. Kağıt havluyla kurulama hayat kurtarır.

Kalabalık tava düşmanındır. Malzemeler üst üste binince ısı düşer. Gerekirse birkaç seferde kavur — sabırsızlık lezzeti öldürür.

Yağ seçimi: Sauté için orta-yüksek duman noktası olan yağlar idealdir. Tereyağı tek başına yanar; zeytinyağıyla karıştır. Ya da yüksek duman noktalı avokado veya üzüm çekirdeği yağı kullan.`,
    sure_okuma: '3 dk',
    gorsel: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=800&q=80',
  },

  {
    id: 4,
    kategori_id: 'pisirme',
    kategori: 'Pişirme Teknikleri',
    baslik: 'Közleme',
    ozet: 'Açık ateşin verdiği duman aroması, hiçbir başka teknikle elde edilemez. Közlemenin bilimi.',
    icerik: `Közleme sadece pişirme değil, dönüşümdür. Doğrudan ateşe maruz kalan yiyecek iki şey yaşar: yüzeyi kömürleşir ve içi buharla pişer.

O kömürleşmiş dış katman lezzetin kaynağıdır. Yanmış selüloz ve şekerler guaiacol, syringol gibi aroma bileşikleri üretir — bunlar dumanlı, derin, karmaşık o tatta sorumludur. Bu bileşikleri laboratuvarda taklit etmek neredeyse imkânsızdır.

Patlıcan közlemek için: ocak alevinin üzerine doğrudan koy. Deri tamamen siyahlaşmalı — içindekiler için endişelenme, koruyorlar. Poşette 10 dakika bekleterek soyma işlemini kolaylaştır.

Et için közleme: Köz ateşi iki bölgeye ayır — yüksek ısı (mühürleme) ve düşük ısı (pişirme). Önce yüksekte mühürle, sonra düşükte dinlendir.`,
    sure_okuma: '3 dk',
    gorsel: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80',
  },

  // ── MUTFAK ARAÇLARI ─────────────────────────────────────────────

  {
    id: 5,
    kategori_id: 'araclar',
    kategori: 'Mutfak Araçları',
    baslik: 'Bıçak Rehberi',
    ozet: 'Keskin bir bıçak hem daha güvenli hem de daha lezzetli yemek demektir. Hangi bıçak ne için?',
    icerik: `Mutfakta üç bıçak yeterlidir: şef bıçağı (20cm), soyma bıçağı (9cm) ve ekmek bıçağı (dişli). Geri kalanı gösteri.

Şef bıçağı her işin ustasıdır. Doğrama, kıyma, ezme, dilme — hepsi bu bıçakla yapılır. Kaliteli bir şef bıçağına yatırım yap, ucuz 10 bıçak almak yerine.

Bıçak kalitesi nasıl anlaşılır? Ağırlık dengeli olmalı — tutunca bıçak tarafı hafifçe baskın. Çeliğin sertliği HRC (Rockwell) ile ölçülür. Japon bıçakları 60-65 HRC (çok sert, keskin ama kırılgan), Alman bıçaklar 56-58 HRC (daha esnek, daha dayanıklı).

Bileme: Taş için 15-20 derece açı. Her kullanım öncesi masat ile hizala. Bıçağı bulaşık makinesine koyma — deterjan ve ısı çeliği bozar.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1566454419290-57a64afe30ac?w=800&q=80',
  },

  {
    id: 6,
    kategori_id: 'araclar',
    kategori: 'Mutfak Araçları',
    baslik: 'Döküm Tava',
    ozet: 'Büyükannenin döküm tavası neden hâlâ değerli? Isı dağılımının bilimi.',
    icerik: `Döküm demir ısıyı yavaş alır ama aldıktan sonra mükemmel dağıtır ve tutar. Bu özellik onu bazı işler için rakipsiz kılar: biftek mühürleme, fırın yemekleri, mısır ekmeği.

Bakımı: Döküm tavayı hiçbir zaman sabunla yıkama — yüzeydeki seasoning (koruyucu yağ tabakası) bozulur. Sıcak su ve sert fırça yeterli. Yıkadıktan sonra ocakta kurut, birkaç damla yağ sür.

Seasoning nedir? Yüzeye işlenmiş polimerik yağ tabakasıdır. Bu tabaka hem yapışmayı önler hem de pası engeller. Her kullanımla güçlenir — 10 yıllık döküm tava, yeniden daha iyidir.

Ne zaman döküm kullanma? Asitli yiyecekler (domates sosu, şarap) seasoning'i bozar ve metalik tat verir. Bu durumlarda emaye kaplı döküm veya paslanmaz çelik tercih et.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },

  {
    id: 7,
    kategori_id: 'araclar',
    kategori: 'Mutfak Araçları',
    baslik: 'Mutfak Termometresi',
    ozet: 'Profesyonel şefler tahmin etmez, ölçer. Termometre mutfağın en değer katıcı aracıdır.',
    icerik: `"Pişti mi?" sorusunun tek güvenilir cevabı iç sıcaklıktır. Renge, süreye veya his'e güvenmek tutarsızlık demektir.

Et iç sıcaklıkları: Dana rare 52°C, medium-rare 57°C, medium 63°C, well-done 71°C. Tavuk 74°C'de güvenlidir. Domuz 63°C. Bu rakamlar bilimsel — tahmin değil.

Termometre tipleri: Anlık okuma (instant-read) günlük kullanım için idealdir. Problu termometre (oven probe) fırında pişen etler için, çıkarmadan takip eder. Şeker termometresi, şerbetçi çelik için farklı aralıkları vardır.

Kalibrasyonu kontrol et: Buzlu suya daldır, 0°C göstermeli. Kaynar suya daldır, 100°C göstermeli (deniz seviyesinde). Göstermiyorsa kalibre et veya değiştir.`,
    sure_okuma: '3 dk',
    gorsel: 'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?w=800&q=80',
  },

  {
    id: 8,
    kategori_id: 'araclar',
    kategori: 'Mutfak Araçları',
    baslik: 'Doğrama Tahtası',
    ozet: 'Mutfağın en çok kullanılan, en az düşünülen aracı. Malzeme seçimi hem lezzeti hem sağlığı etkiler.',
    icerik: `Doğrama tahtası malzemesi bıçağı ve hijyeni doğrudan etkiler. Cam ve mermer bıçağı anında köreltir — asla kullanma. Plastik görünürde temiz ama derin çizikler bakteri barınağına dönüşür.

Ahşap tahtalar en ideal seçimdir. Sert ağaçlar (akçaağaç, kayın, meşe) bıçağı korur. Ahşabın doğal antimikrobiyal özellikleri vardır — bilimsel olarak kanıtlanmıştır.

Bambu sert ve dayanıklıdır ama bazı bambu tahtalar epoksi yapıştırıcı içerir — organik seçenekleri tercih et.

Bakım: Ahşap tahtayı hiçbir zaman bulaşık makinesine koyma — çatlar. Aylık mineral yağı ile besle. Et keserken diğer yüzeyi kullan, sebzeler için diğerini — çapraz kontaminasyonu önler.`,
    sure_okuma: '3 dk',
    gorsel: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80',
  },

  // ── MALZEME BİLGİSİ ─────────────────────────────────────────────

  {
    id: 9,
    kategori_id: 'malzeme',
    kategori: 'Malzeme Bilgisi',
    baslik: 'Yağlar Rehberi',
    ozet: 'Zeytinyağı her yerde kullanılmaz. Hangi yağ hangi ısıda, hangi yemekte — tam rehber.',
    icerik: `Yağların en kritik özelliği duman noktasıdır — bu sıcaklığın üzerinde yağ yanar, serbest radikal üretir ve lezzeti bozar.

Düşük duman noktası (160-180°C): Tereyağı, sızma zeytinyağı. Salata, son anda lezzet katmak, düşük ısılı pişirme için idealdir.

Orta duman noktası (190-210°C): Rafine zeytinyağı, hindistancevizi yağı. Günlük sauté ve orta ısılı pişirme için uygundur.

Yüksek duman noktası (220°C+): Avokado yağı, üzüm çekirdeği yağı, rafine kanola. Yüksek ısılı kavurma, derin kızartma için kullan.

Lezzet için tereyağı eşsizdir ama yanmaması için dikkat gerek. Çözüm: ghee (arındırılmış tereyağı). Süt katıları alındığından duman noktası 250°C'ye çıkar, tereyağı aroması kalır.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
  },

  {
    id: 10,
    kategori_id: 'malzeme',
    kategori: 'Malzeme Bilgisi',
    baslik: 'Tuz: Mutfağın Altını',
    ozet: 'Tuz sadece tuzluluk katmaz — lezzeti açar, dokuyu değiştirir, rengi korur. Tuzun bilimi.',
    icerik: `Tuz lezzet vermez, lezzeti ortaya çıkarır. Doğru miktarda tuz, yiyeceğin kendi aromasını öne çıkarır — "tuzlu" tat vermez.

Tuz çeşitleri: Sofra tuzu en ince, en yoğun. Kaya tuzu daha az rafine, mineral açısından zengin. Fleur de sel (deniz tuzu çiçeği) pul yapısıyla bitmek için idealdir — pişirmede kullanılmaz, pahalı ve kıymetlidir.

Tuzlama zamanı: Et için pişirmeden en az 40 dakika veya 24 saat önce tuzla. İlk 10-30 dakikada nem çıkar, 40 dakika sonra yeniden absorbe edilir. Bu "kuru salamura" etin iç kısmına kadar lezzetlenmesini sağlar.

Makarna suyu çok tuzlu olmalı — "deniz suyu gibi" derler. Bu abartılı ama makarna suyu tatsız olmamalı. Tuz piştikten sonra değil, pişirirken lezzete işlenir.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442b?w=800&q=80',
  },

  {
    id: 11,
    kategori_id: 'malzeme',
    kategori: 'Malzeme Bilgisi',
    baslik: 'Et Kesimleri',
    ozet: 'Hayvanın hangi bölgesi neden sert, neden yumuşak? Doğru kesimi doğru yöntemle pişirmek.',
    icerik: `Etin yumuşaklığı kas kullanımıyla doğru orantılıdır. Çok çalışan kaslar (bacak, boyun, omuz) sert ama lezzetlidir — uzun ve yavaş pişirme gerektirir. Az çalışan kaslar (sırt, but) doğal olarak yumuşaktır — hızlı ve yüksek ısı yeterlidir.

Türkiye'de yaygın kesimler: Bonfile — en az çalışan kas, en yumuşak, en pahalı. Kontrfile — bonfileye yakın, biraz daha karakterli lezzet. Antrikot — yağ marbling'i yüksek, ızgara için ideal. Döş — uzun pişirme için, brisket.

Yavaş pişirme kesimleri (kuzu kol, dana incik, sığır yanağı): İçlerindeki kollajen uzun pişirmede jelatin'e dönüşür. Bu, o kremsi, ipeksi sosu oluşturur. Bu kesimleri hızlı pişirmek büyük hatadır.

Marbling nedir? Kasın içindeki yağ damarlarıdır. Pişerken erir, eti nemli ve lezzetli tutar. Wagyu'nun değeri buradan gelir.`,
    sure_okuma: '5 dk',
    gorsel: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80',
  },

  {
    id: 12,
    kategori_id: 'malzeme',
    kategori: 'Malzeme Bilgisi',
    baslik: 'Baharatları Tanımak',
    ozet: 'Baharat eklemek değil, baharat yönetmek. Hangi baharat ne zaman, nasıl kullanılır?',
    icerik: `Baharatın en önemli düşmanı: ısı, ışık ve nem. Bunlardan uzak tut. Cam kavanozda, karanlık dolap idealdir. Plastik torba ve güneş alan raf baharatı öldürür.

Taze mi, kuru mu? Biberiye, kekik, defne gibi sert otlar kurutulunca daha yoğun lezzet verir. Maydanoz, fesleğen, nane gibi yumuşak otlar taze kullanılmalı — kurusu soluk kalır.

Baharat ne zaman eklenir? Kuru baharatlar yağla birlikte erken eklenir — yağ içinde çözünen aromaları açar. Taze otlar pişirmenin sonunda eklenir — ısı aromatik bileşikleri uçurur.

Tane baharatlar: Karabiber, kimyon, kişniş — tava da hafifçe kavurup öğütmek aromayı iki katına çıkarır. Bu "bloom" tekniği Hint mutfağının temelidir.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80',
  },

  // ── TEMEL KİMYA ─────────────────────────────────────────────────

  {
    id: 13,
    kategori_id: 'kimya',
    kategori: 'Temel Kimya',
    baslik: 'Emülsiyon',
    ozet: 'Mayonez, hollandaise, vinaigrette — hepsinin arkasında aynı sihir: yağ ile suyun barışması.',
    icerik: `Yağ ve su normalde karışmaz. Ama aralarına bir emülgatör koyarsanız — biri diğerinin içinde asılı kalabilir.

Yumurta sarısındaki lesitin en güçlü doğal emülgatördür. Bir tarafı suyu, diğer tarafı yağı sever. Bu yüzden mayonez yaparken yumurta sarısı kullanırız.

Başarılı emülsiyon için: Yağı çok yavaş ekle. Hızlı eklenirse büyük damlacıklar oluşur, emülsiyon kopar. Malzemelerin sıcaklığı yakın olmalı. Sürekli çırpmak şart.

Kopan emülsiyonu kurtarmak: Yeni bir kaba taze yumurta sarısı koy, kopan karışımı damla damla ekleyerek çırp. Mutçak kimyası her zaman ikinci şansı hak eder.

Hardal da emülgatördür — vinaigrettelerde lesitin yerine geçer. Bu yüzden iyi bir salata sosu tarifinde hardal görürsün.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=800&q=80',
  },

  {
    id: 14,
    kategori_id: 'kimya',
    kategori: 'Temel Kimya',
    baslik: 'Gluten',
    ozet: 'Ekmeği ekmek yapan, pastayı pasta yapan protein ağı. Gluteni anlamak hamur işlerini dönüştürür.',
    icerik: `Gluten, buğdaydaki iki proteinin (gliadin ve glutenin) suyla birleşince oluşturduğu esnek ağdır. Bu ağ hamura yapısını, elastikiyetini ve o çiğnenebilir dokuyu verir.

Gluten ne zaman istenir? Ekmekte, pizzada, pastada: yoğurma gluteni güçlendirir, gazı hapseden ağ oluşturur, ekmek kabarmış kalır.

Gluten ne zaman istenmez? Kek, kurabiye, krep: fazla gluten sert ve lastik gibi yapar. Bu yüzden kek hamurunu az karıştırırız — "overmix" hatası budur.

Farklı un tipleri: Ekmek unu yüksek protein (12-14%), gluten güçlü. Kek unu düşük protein (7-9%), gluten zayıf. Türkiye'de tip 650 ekmek, tip 550 börek, tip 405 pasta için idealdir.

Dinlendirme neden önemli? Yoğrulan hamuru 30 dakika dinlendirince gluten gevşer, hamur açılmaya direnmez. Sabırsız açılan pizza hamuru büzülür — gluteni dinlendir.`,
    sure_okuma: '5 dk',
    gorsel: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
  },

  {
    id: 15,
    kategori_id: 'kimya',
    kategori: 'Temel Kimya',
    baslik: 'Asit ve Denge',
    ozet: 'Bir yemek "bir şeyleri eksik" hissettiriyorsa genellikle asit eksiktir. Asidin mucizesi.',
    icerik: `Asit yemekleri dengeler ve parlaklaştırır. Tüm lezzetleri öne çıkarır — tıpkı tuz gibi ama farklı bir mekanizmayla.

Mutfakta asit kaynakları: Limon suyu, sirke, domates, yoğurt, şarap, nar ekşisi. Bunlar pH'ı düşürür, lezzet algısını değiştirir.

Asit ne zaman eklenir? Pişirmenin sonunda bir sıkım limon veya damla sirke, tüm yemeği "uyandırır". Bu yüzden şefler servis öncesi mutlaka tatlar ve çoğu zaman asit ekler.

Aşırı asit nasıl kurtarılır? Şeker veya tuz dengeler. Domates sosa çok fazla domates koyduysan bir tutam şeker dengeyi kurar.

Et marinasyonunda asit: Limon suyu veya sirke eti yumuşatır — ama aşırısı tam tersi yapar, proteini "pişirir" ve sertleştirir. Kısa marinasyon (30dk-2 saat) ideal, 12 saatten fazla genellikle zararlıdır.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=800&q=80',
  },

  {
    id: 16,
    kategori_id: 'kimya',
    kategori: 'Temel Kimya',
    baslik: 'Karamelizasyon',
    ozet: 'Şekerin ısıyla dönüşümü. Tatlıdan tatlıya değil, tatlıdan karmaşığa — karamelizasyonun kimyası.',
    icerik: `Karamelizasyon şekerin 160°C üzerinde ısıtılınca kimyasal olarak parçalanması ve yeniden birleşmesidir. Sonuç: altın rengi, fındıksı, hafif acı — o ikonik karamel tadı.

Maillard ile farkı: Maillard protein+şeker reaksiyonudur, karamelizasyon sadece şeker. İkisi farklı lezzetler üretir, ikisi de kahverengileştirme yapar.

Soğan karamelizasyonu: En az 30-40 dakika, düşük ateş, sabır. "5 dakikada karamelize soğan" yazan tarif yalan. Şeker bu sürede yavaşça parçalanır ve o derin, tatlı, kompleks tada ulaşır.

Renk kılavuzu: Açık altın (165°C) — hafif karamel, tatlı. Amber (180°C) — klasik karamel. Koyu kahve (190°C) — acı notalar güçlü, kompleks. Siyah — yanmış, atılmalı.

Kuru karamel vs ıslak karamel: Kuru daha riskli ama daha derin lezzet. Islak (su eklenerek) daha kontrollü ama daha az kompleks.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80',
  },

  // ── LEZZET BİLİMİ ───────────────────────────────────────────────

  {
    id: 17,
    kategori_id: 'lezzet',
    kategori: 'Lezzet Bilimi',
    baslik: 'Umami: Beşinci Tat',
    ozet: 'Tatlı, tuzlu, ekşi, acı — ve umami. Japon biliminin keşfettiği beşinci tat nedir?',
    icerik: `1908'de Japon kimyager Kikunae Ikeda dashi suyunu analiz ederken yeni bir tat keşfetti. Tatlı, tuzlu, ekşi veya acı değildi. Adını verdi: umami — Japonca "lezzetli öz" demektir.

Umami'nin kimyası: Glutamat, inosinat ve guanilat adlı moleküller. Bunlar birlikte sinerjik etki yapar — ikisi bir arada umamiyi 8 kata kadar güçlendirir.

Umami kaynakları: Parmesan, miso, soya sosu, domates (özellikle güneşte kurutulmuş), mantar (özellikle shiitake), hamsi, worcestershire sos. Türk mutfağında: salça, olgun peynir, kurutulmuş et.

Neden önemli? Umami tatmin hissi yaratır — yemeği "dolu" hissettirir. Bir yemek "bir şeyleri eksik" ama ne olduğunu bulamıyorsanız umami eksiktir. Bir tutam parmesan, bir çay kaşığı soya sosu çoğu zaman cevaptır.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
  },

  {
    id: 18,
    kategori_id: 'lezzet',
    kategori: 'Lezzet Bilimi',
    baslik: 'Lezzet Katmanlama',
    ozet: 'Büyük şefler tek bir lezzet değil, katmanlar oluşturur. Derinlik nasıl yaratılır?',
    icerik: `Lezzet katmanlama, farklı aşamalarda farklı tatlar ekleyerek karmaşıklık oluşturmaktır. Sonunda eklenen tek bir baharat değil — pişirme boyunca birikmiş tatlar katmanı.

Temel: Yağda soğan ve sarımsak kavurmak. Bu "soffritto" İtalyan, "mirepoix" Fransız, "trinity" Cajun mutfağının temelidir. Her kültür kendi aromatik tabanını yaratmıştır.

Orta katman: Baharat ve domates. Kuru baharatlar yağda çiçeklenir (bloom), domates asit ve umami verir.

Sıvı katman: Şarap, et suyu veya su eklenince tavanın dibindeki fond çözülür. Bu déglaçage işlemi en derin lezzeti soktur.

Bitiş katmanı: Tereyağı (monte au beurre), taze ot, asit, son tuz. Bu katman yemeği tamamlar ve parlatır.

Her katman bir öncekinin üzerine inşa eder. Acele etmek katmanları yok eder.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&q=80',
  },

  {
    id: 19,
    kategori_id: 'lezzet',
    kategori: 'Lezzet Bilimi',
    baslik: 'Doku ve Lezzet',
    ozet: 'Lezzet sadece tatmakla değil, hissetmekle de ilgilidir. Kıtırlık, kremsilik, çiğnenebilirlik neden bu kadar önemli?',
    icerik: `Bilim insanları "doku" olmadan lezzet algısının yarıya düştüğünü söyler. Yumuşak köfte ne kadar lezzetli olursa olsun, kıtır bir kabuk olmadan eksik hissettirır.

Kontrast prensipleri: Kıtır + kremsi (çıtır kaplama + yumuşak iç). Sıcak + soğuk (sıcak tart + dondurma). Pürüzsüz + taneli (panna cotta + pralin).

Kıtırlık nasıl korunur? Kızarmış yiyecekler tel ızgarada bekletilir, kapalı kapta değil — nem kıtırlığı öldürür. Servis öncesi son dakikada yapılır.

Kremsi doku nasıl elde edilir? Yağ, nişasta, jelatin veya yumurta sarısı kremsilik yaratır. Risottoda sürekli karıştırma nişastayı serbest bırakır, o ipeksi dokuyu verir.

Türk mutfağında doku: Baklava'nın ince yufkası + yoğun şerbet, çiğ köftenin yumuşaklığı + limon asidi — bunlar bilinçsiz uygulanan doku kontrastlarıdır.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
  },

  {
    id: 20,
    kategori_id: 'lezzet',
    kategori: 'Lezzet Bilimi',
    baslik: 'Tatlılık ve Denge',
    ozet: 'Tatlı bir yemek değil, dengeli bir yemek. Şekerin mutfaktaki gerçek rolü.',
    icerik: `Şeker sadece tatlılık katmaz — acılığı yumuşatır, asidi dengeler, karamelizasyon yaratır ve aromayı taşır. Tuzlu yemeklerde de şekerin yeri vardır.

Neden domates sosuna şeker eklenir? Domatesin doğal asidini dengelemek için. Şeker tatlılık vermez, gerginliği alır. Bir tutam şeker ile bir tutam tuz birlikte asitten daha güçlüdür.

Meyve-tuz dengesi: Meyvenin tatlılığına bir tutam tuz katmak onu daha tatlı hissettirir. Bu paradoks değil — tuz acılığı baskılar, tatlılık öne çıkar.

Şekerin renk etkisi: Fırın ürünlerinde yüzey şekeri kahverengileşmeye yardımcı olur. Yumurta sarısına şeker çırpılınca oluşan hafif krem rengi, Maillard için hazırlık aşamasıdır.

Bal ve pekmez: Şekerden farklı olarak aroma taşır. Bal uçucu aromatik bileşikler içerir — pişirmek bu bileşikleri uçurur. Ham bal veya pişirme sonunda eklemek aromayı korur.`,
    sure_okuma: '4 dk',
    gorsel: 'https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=800&q=80',
  },

];

// ─────────────────────────────────────────────────────────────────
//  YENİ İÇERİK ŞABLONU
// ─────────────────────────────────────────────────────────────────
//
// {
//   id: 21,
//   kategori_id: 'pisirme',      // pisirme / araclar / malzeme / kimya / lezzet
//   kategori: 'Pişirme Teknikleri',
//   baslik: 'Başlık',
//   ozet: 'Tek cümle özet — kart görünümünde çıkar.',
//   icerik: `Paragraf 1.
//
// Paragraf 2.
//
// Paragraf 3.`,
//   sure_okuma: '3 dk',
//   gorsel: 'https://images.unsplash.com/photo-...?w=800&q=80',
// },