import { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  Image, SafeAreaView, Dimensions
} from 'react-native';

const W = Dimensions.get('window').width;

// ─── VERİ ───────────────────────────────────────────────────────────────────

const TARIFLER = [
  {
    id: 1,
    isim: 'Hünkar Beğendi',
    mutfak: 'Osmanlı',
    sure: '75 dk',
    zorluk: 'Orta',
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
    teknik: 'Közleme — Hünkar Beğendi\'nin ruhunu veren işlem. Patlıcanı sadece fırında pişirmek değil, YAKMAK gerekir. Dışı tamamen kömürleşmeli. Bu yanık deri, içerideki ete dumanlı, derin bir aroma verir. Poşette bekletmek soyma işlemini kolaylaştırır ve o son damlacık dumanlı suyu da içerde tutar.',
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
    teknik: 'Zeytinyağı miktarı pazarlık konusu değil. 150 ml zeytinyağı görünce "çok fazla" diye azaltmak yemeği mahveder. Zeytinyağlı yemeklerde yağ sadece pişirme aracı değil — sos, taşıyıcı ve koruyucudur. Soğuduğunda yağ yeniden yemeğin içine çekilir ve o kremsi, zengin dokuyu oluşturur. İmam Bayıldı\'nın sırrı burada yatar.',
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
    teknik: 'Dövme tekniği — Santrifüj gibi dönen modern mikserler değil, tekrarlayan darbe hareketi gerekir. Tokmak her vuruşta hem buğdayı ezer hem de gluteni aktive eder — bu, o karakteristik yapışkan, ipeksi dokuyu verir. Sabırsızlanıp blender kullanmak yemeği lapa yapar. Orijinal kıvam için en az 15-20 dakika dövmek şarttır.',
    besin: { kalori: 610, protein: 45, karbonhidrat: 52, yag: 24 },
  },
];

const OLCU_TABLOSU = [
  { malzeme: 'Un', cay_kasigi: 3, yemek_kasigi: 8, tatli_kasigi: 5, cay_bardagi: 65, su_bardagi: 120 },
  { malzeme: 'Şeker', cay_kasigi: 4, yemek_kasigi: 12, tatli_kasigi: 8, cay_bardagi: 80, su_bardagi: 200 },
  { malzeme: 'Tuz', cay_kasigi: 6, yemek_kasigi: 18, tatli_kasigi: 10, cay_bardagi: 120, su_bardagi: 280 },
  { malzeme: 'Tereyağı', cay_kasigi: 4, yemek_kasigi: 14, tatli_kasigi: 9, cay_bardagi: 90, su_bardagi: 220 },
  { malzeme: 'Zeytinyağı', cay_kasigi: 5, yemek_kasigi: 14, tatli_kasigi: 9, cay_bardagi: null, su_bardagi: 190 },
  { malzeme: 'Pirinç', cay_kasigi: 4, yemek_kasigi: 10, tatli_kasigi: 7, cay_bardagi: 70, su_bardagi: 175 },
  { malzeme: 'Nişasta', cay_kasigi: 3, yemek_kasigi: 8, tatli_kasigi: 5, cay_bardagi: 60, su_bardagi: 130 },
  { malzeme: 'Kakao', cay_kasigi: 3, yemek_kasigi: 7, tatli_kasigi: 5, cay_bardagi: 55, su_bardagi: 110 },
  { malzeme: 'İrmik', cay_kasigi: 4, yemek_kasigi: 11, tatli_kasigi: 7, cay_bardagi: 75, su_bardagi: 170 },
  { malzeme: 'Yoğurt', cay_kasigi: 8, yemek_kasigi: 20, tatli_kasigi: 14, cay_bardagi: 160, su_bardagi: 240 },
  { malzeme: 'Pekmez', cay_kasigi: 7, yemek_kasigi: 21, tatli_kasigi: 14, cay_bardagi: null, su_bardagi: 330 },
  { malzeme: 'Bal', cay_kasigi: 7, yemek_kasigi: 21, tatli_kasigi: 14, cay_bardagi: null, su_bardagi: 340 },
];

const C = {
  bg: '#0F0E0C', bg2: '#1A1814', bg3: '#252320',
  accent: '#C9A96E', accentDim: '#8B6F42',
  text: '#F0EDE8', textMuted: '#8A8680', textDim: '#4A4845',
  border: '#2A2825',
};

function AnaSayfa({ onTarif, onOlcu }) {
  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <Text style={s.logo}>mise</Text>
        <Text style={s.logoAlt}>her şey yerli yerinde</Text>
      </View>
      <Text style={s.bolumBaslik}>öne çıkan</Text>
      <TouchableOpacity style={s.featuredCard} onPress={() => onTarif(TARIFLER[0])}>
        <Image source={{ uri: TARIFLER[0].gorsel }} style={s.featuredImg} />
        <View style={s.featuredOverlay} />
        <View style={s.featuredText}>
          <Text style={s.featuredMutfak}>{TARIFLER[0].mutfak}</Text>
          <Text style={s.featuredIsim}>{TARIFLER[0].isim}</Text>
          <Text style={s.featuredMeta}>{TARIFLER[0].sure} · {TARIFLER[0].zorluk}</Text>
        </View>
      </TouchableOpacity>
      <Text style={s.bolumBaslik}>tarifler</Text>
      {TARIFLER.map(t => (
        <TouchableOpacity key={t.id} style={s.tarifCard} onPress={() => onTarif(t)}>
          <Image source={{ uri: t.gorsel }} style={s.tarifImg} />
          <View style={s.tarifBilgi}>
            <Text style={s.tarifMutfak}>{t.mutfak}</Text>
            <Text style={s.tarifIsim}>{t.isim}</Text>
            <Text style={s.tarifMeta}>{t.sure} · {t.zorluk}</Text>
          </View>
          <Text style={s.tarifOk}>›</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={s.olcuBanner} onPress={onOlcu}>
        <View>
          <Text style={s.olcuBaslik}>altın standart ölçüler</Text>
          <Text style={s.olcuAlt}>Çay kaşığından su bardağına her gramaj</Text>
        </View>
        <Text style={s.olcuOk}>›</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function TarifEkrani({ tarif, onGeri }) {
  const [aktifTab, setAktifTab] = useState('hikaye');
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.tarifDetayGorsel}>
          <Image source={{ uri: tarif.gorsel }} style={StyleSheet.absoluteFill} />
          <View style={s.tarifDetayOverlay} />
          <TouchableOpacity style={s.geriBtn} onPress={onGeri}>
            <Text style={s.geriBtnText}>← geri</Text>
          </TouchableOpacity>
          <View style={s.tarifDetayBaslik}>
            <Text style={s.tarifDetayMutfak}>{tarif.mutfak}</Text>
            <Text style={s.tarifDetayIsim}>{tarif.isim}</Text>
            <Text style={s.tarifDetayMeta}>{tarif.sure} · {tarif.zorluk}</Text>
          </View>
        </View>
        <View style={s.besinRow}>
          {[['kalori', tarif.besin.kalori, 'kcal'], ['protein', tarif.besin.protein, 'g'], ['karb', tarif.besin.karbonhidrat, 'g'], ['yağ', tarif.besin.yag, 'g']].map(([etiket, deger, birim]) => (
            <View key={etiket} style={s.besinKutu}>
              <Text style={s.besinDeger}>{deger}</Text>
              <Text style={s.besinBirim}>{birim}</Text>
              <Text style={s.besinEtiket}>{etiket}</Text>
            </View>
          ))}
        </View>
        <View style={s.tabRow}>
          {['hikaye', 'malzemeler', 'yapılış', 'teknik'].map(t => (
            <TouchableOpacity key={t} style={[s.tab, aktifTab === t && s.tabAktif]} onPress={() => setAktifTab(t)}>
              <Text style={[s.tabText, aktifTab === t && s.tabTextAktif]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.tabIcerik}>
          {aktifTab === 'hikaye' && <Text style={s.hikayeMetin}>{tarif.hikaye}</Text>}
          {aktifTab === 'malzemeler' && (
            <View>
              {tarif.malzemeler.map((m, i) => (
                <View key={i} style={s.malzemeRow}>
                  <Text style={s.malzemeIsim}>{m.isim}</Text>
                  <Text style={s.malzemeMiktar}>{m.miktar > 0 ? `${m.miktar} ${m.birim}` : m.birim}</Text>
                </View>
              ))}
            </View>
          )}
          {aktifTab === 'yapılış' && (
            <View>
              {tarif.adimlar.map((a, i) => (
                <View key={i} style={s.adimRow}>
                  <View style={s.adimNumara}><Text style={s.adimNumaraText}>{i + 1}</Text></View>
                  <Text style={s.adimMetin}>{a}</Text>
                </View>
              ))}
            </View>
          )}
          {aktifTab === 'teknik' && (
            <View style={s.teknikKutu}>
              <Text style={s.teknikBaslik}>{tarif.teknik.split('—')[0].trim()}</Text>
              <Text style={s.teknikMetin}>{tarif.teknik.split('—').slice(1).join('—').trim()}</Text>
            </View>
          )}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function OlcuEkrani({ onGeri }) {
  const kolonlar = ['çay k.', 'yemek k.', 'tatlı k.', 'çay b.', 'su b.'];
  const degerler = ['cay_kasigi', 'yemek_kasigi', 'tatli_kasigi', 'cay_bardagi', 'su_bardagi'];
  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <View style={s.olcuHeader}>
        <TouchableOpacity onPress={onGeri} style={{ marginBottom: 16 }}>
          <Text style={s.geriBtnText}>← geri</Text>
        </TouchableOpacity>
        <Text style={s.olcuBaslikBuyuk}>altın standart ölçüler</Text>
        <Text style={s.olcuAciklama}>Tüm değerler gram cinsindendir</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={s.tablo}>
          <View style={s.tabloBaslikRow}>
            <View style={[s.tabloHucre, s.tabloMalzemeHucre]}><Text style={s.tabloBaslikText}>malzeme</Text></View>
            {kolonlar.map(k => <View key={k} style={s.tabloHucre}><Text style={s.tabloBaslikText}>{k}</Text></View>)}
          </View>
          {OLCU_TABLOSU.map((row, i) => (
            <View key={i} style={[s.tabloRow, i % 2 === 1 && s.tabloRowAlt]}>
              <View style={[s.tabloHucre, s.tabloMalzemeHucre]}><Text style={s.tabloMalzemeText}>{row.malzeme}</Text></View>
              {degerler.map(d => <View key={d} style={s.tabloHucre}><Text style={s.tabloDegerText}>{row[d] ?? '—'}</Text></View>)}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={s.olcuNot}>
        <Text style={s.olcuNotText}>
          Ölçüler standart Türk mutfak aletlerine göredir.{'\n'}
          Çay bardağı: 200ml · Su bardağı: 250ml · Yemek kaşığı: 15ml · Çay kaşığı: 5ml
        </Text>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

export default function App() {
  const [ekran, setEkran] = useState('ana');
  const [secilenTarif, setSecilenTarif] = useState(null);
  const tarifAc = (t) => { setSecilenTarif(t); setEkran('tarif'); };
  return (
    <SafeAreaView style={s.root}>
      {ekran === 'ana' && <AnaSayfa onTarif={tarifAc} onOlcu={() => setEkran('olcu')} />}
      {ekran === 'tarif' && <TarifEkrani tarif={secilenTarif} onGeri={() => setEkran('ana')} />}
      {ekran === 'olcu' && <OlcuEkrani onGeri={() => setEkran('ana')} />}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32 },
  logo: { fontSize: 42, fontWeight: '300', color: C.text, letterSpacing: 8, fontStyle: 'italic' },
  logoAlt: { fontSize: 12, color: C.accentDim, letterSpacing: 3, marginTop: 4, textTransform: 'uppercase' },
  bolumBaslik: { fontSize: 11, color: C.accentDim, letterSpacing: 4, textTransform: 'uppercase', paddingHorizontal: 24, marginBottom: 16 },
  featuredCard: { marginHorizontal: 24, height: 280, borderRadius: 16, overflow: 'hidden', marginBottom: 40 },
  featuredImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  featuredOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  featuredText: { position: 'absolute', bottom: 24, left: 24, right: 24 },
  featuredMutfak: { fontSize: 11, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 },
  featuredIsim: { fontSize: 26, fontWeight: '300', color: C.text, letterSpacing: 1, marginBottom: 8, fontStyle: 'italic' },
  featuredMeta: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  tarifCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 16, backgroundColor: C.bg2, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  tarifImg: { width: 80, height: 80 },
  tarifBilgi: { flex: 1, paddingHorizontal: 16, paddingVertical: 12 },
  tarifMutfak: { fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 },
  tarifIsim: { fontSize: 16, fontWeight: '400', color: C.text, fontStyle: 'italic', marginBottom: 4 },
  tarifMeta: { fontSize: 12, color: C.textMuted },
  tarifOk: { fontSize: 22, color: C.textDim, paddingRight: 16 },
  olcuBanner: { marginHorizontal: 24, marginTop: 8, padding: 20, backgroundColor: C.bg3, borderRadius: 12, borderWidth: 1, borderColor: C.accentDim, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  olcuBaslik: { fontSize: 15, color: C.accent, fontWeight: '400', marginBottom: 4 },
  olcuAlt: { fontSize: 12, color: C.textMuted },
  olcuOk: { fontSize: 24, color: C.accentDim },
  tarifDetayGorsel: { height: 320, position: 'relative' },
  tarifDetayOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  geriBtn: { position: 'absolute', top: 50, left: 20, padding: 8 },
  geriBtnText: { fontSize: 14, color: C.accent, letterSpacing: 1 },
  tarifDetayBaslik: { position: 'absolute', bottom: 28, left: 24, right: 24 },
  tarifDetayMutfak: { fontSize: 11, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 },
  tarifDetayIsim: { fontSize: 30, fontWeight: '300', color: C.text, fontStyle: 'italic', marginBottom: 6 },
  tarifDetayMeta: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  besinRow: { flexDirection: 'row', marginHorizontal: 24, marginTop: 20, marginBottom: 8, gap: 8 },
  besinKutu: { flex: 1, backgroundColor: C.bg2, borderRadius: 10, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  besinDeger: { fontSize: 20, fontWeight: '300', color: C.text },
  besinBirim: { fontSize: 10, color: C.accentDim, marginTop: 1 },
  besinEtiket: { fontSize: 10, color: C.textMuted, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 },
  tabRow: { flexDirection: 'row', marginHorizontal: 24, marginTop: 20, marginBottom: 4, gap: 4 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: C.border },
  tabAktif: { backgroundColor: C.accent, borderColor: C.accent },
  tabText: { fontSize: 12, color: C.textMuted, textTransform: 'lowercase' },
  tabTextAktif: { color: C.bg, fontWeight: '500' },
  tabIcerik: { paddingHorizontal: 24, paddingTop: 20 },
  hikayeMetin: { fontSize: 16, color: C.text, lineHeight: 28, fontStyle: 'italic', fontWeight: '300' },
  malzemeRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  malzemeIsim: { fontSize: 15, color: C.text, fontWeight: '300', flex: 1, marginRight: 12 },
  malzemeMiktar: { fontSize: 15, color: C.accent },
  adimRow: { flexDirection: 'row', marginBottom: 20, gap: 16 },
  adimNumara: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: C.accentDim, alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0 },
  adimNumaraText: { fontSize: 12, color: C.accent },
  adimMetin: { flex: 1, fontSize: 15, color: C.text, lineHeight: 24, fontWeight: '300' },
  teknikKutu: { backgroundColor: C.bg2, borderRadius: 12, padding: 20, borderLeftWidth: 2, borderLeftColor: C.accent },
  teknikBaslik: { fontSize: 16, color: C.accent, fontWeight: '500', marginBottom: 12, fontStyle: 'italic' },
  teknikMetin: { fontSize: 15, color: C.text, lineHeight: 26, fontWeight: '300' },
  olcuHeader: { paddingHorizontal: 24, paddingTop: 50, paddingBottom: 24 },
  olcuBaslikBuyuk: { fontSize: 26, fontWeight: '300', color: C.text, fontStyle: 'italic', marginBottom: 8 },
  olcuAciklama: { fontSize: 13, color: C.textMuted },
  tablo: { marginLeft: 24, marginRight: 24, marginTop: 8 },
  tabloBaslikRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.accentDim, paddingBottom: 10, marginBottom: 4 },
  tabloRow: { flexDirection: 'row', paddingVertical: 12 },
  tabloRowAlt: { backgroundColor: C.bg2, borderRadius: 6 },
  tabloHucre: { width: 72, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  tabloMalzemeHucre: { width: 110, alignItems: 'flex-start' },
  tabloBaslikText: { fontSize: 10, color: C.accentDim, textTransform: 'uppercase', letterSpacing: 1 },
  tabloMalzemeText: { fontSize: 13, color: C.text },
  tabloDegerText: { fontSize: 13, color: C.accent },
  olcuNot: { margin: 24, padding: 16, backgroundColor: C.bg2, borderRadius: 10, borderWidth: 1, borderColor: C.border },
  olcuNotText: { fontSize: 12, color: C.textMuted, lineHeight: 20 },
});