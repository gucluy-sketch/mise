import { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  Image, SafeAreaView, Platform, Dimensions
} from 'react-native';

const W = Dimensions.get('window').width;

// ─── VERİ ───────────────────────────────────────────────────────────────────

const TARIFLER = [
  {
    id: 1,
    isim: 'Risotto alla Milanese',
    mutfak: 'İtalyan',
    sure: '35 dk',
    zorluk: 'Orta',
    gorsel: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
    hikaye: 'Milano\'nun sarı altını. 1574\'te bir ustanın çırağı, caminin inşaatında kullandığı safran boyasını yemekle şakalaşarak karıştırdı — ve ortaya çıkan renk o kadar güzeldi ki tarih oldu. Risotto alla Milanese, İtalya\'nın en ikonik kazasının meyvesidir.',
    malzemeler: [
      { isim: 'Arborio pirinci', miktar: 300, birim: 'g' },
      { isim: 'Kemik suyu (sıcak)', miktar: 1200, birim: 'ml' },
      { isim: 'Kuru beyaz şarap', miktar: 120, birim: 'ml' },
      { isim: 'Safran', miktar: 0.5, birim: 'tsp' },
      { isim: 'Soğan', miktar: 1, birim: 'adet' },
      { isim: 'Tereyağı', miktar: 60, birim: 'g' },
      { isim: 'Parmesan', miktar: 80, birim: 'g' },
    ],
    adimlar: [
      'Safranı 3 yemek kaşığı ılık kemik suyuna ekle, 10 dk beklet.',
      'Soğanı ince doğra, yarım tereyağıyla orta ateşte şeffaflaşana dek sotele (5-7 dk).',
      'Pirinci ekle, 2 dk kavur — her tane yağla kaplanmalı.',
      'Şarabı ekle, tamamen çekilene dek karıştır.',
      'Kepçe kepçe sıcak kemik suyu ekle; her seferinde iyice karıştır ve çekilmesini bekle.',
      'Safranı 15. dakikada ekle. Toplam pişirme süresi 18-20 dk olmalı.',
      'Ocaktan al, kalan tereyağı ve parmesanı ekle. 2 dk dinlendir.',
    ],
    teknik: 'Mantecatura — risottoya kremsi dokuyu veren son adım. Ocaktan aldıktan sonra soğuk tereyağı ve peyniri ekleyip güçlü bir hareketle karıştırmak, nişastayı emülsifiye eder. Asla ocak üzerinde yapma.',
    besin: { kalori: 420, protein: 14, karbonhidrat: 58, yag: 16 },
  },
  {
    id: 2,
    isim: 'Beef Bourguignon',
    mutfak: 'Fransız',
    sure: '3 saat',
    zorluk: 'İleri',
    gorsel: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&q=80',
    hikaye: 'Fransız köylüsünün mutfağından dünya masalarına uzanan yolculuk. Burgundy şarabı, sert ve ucuz etin bağ dokusunu parçalar; kollajen jelatin\'e dönüşür ve ortaya çıkan sos hem hafif hem de derin olur. Julia Child bu yemeği Amerika\'ya tanıttı, ama asıl sahibi Fransız toprağıdır.',
    malzemeler: [
      { isim: 'Dana güveclik (küp)', miktar: 1200, birim: 'g' },
      { isim: 'Kırmızı Burgundy şarabı', miktar: 750, birim: 'ml' },
      { isim: 'Dana kemik suyu', miktar: 500, birim: 'ml' },
      { isim: 'Havuç', miktar: 200, birim: 'g' },
      { isim: 'İnci soğan', miktar: 200, birim: 'g' },
      { isim: 'Mantar', miktar: 250, birim: 'g' },
      { isim: 'Pastırma (lardons)', miktar: 150, birim: 'g' },
      { isim: 'Sarımsak', miktar: 4, birim: 'diş' },
      { isim: 'Domates salçası', miktar: 2, birim: 'tbsp' },
    ],
    adimlar: [
      'Eti bir gece şarap, havuç, soğan ve sarımsakla marine et.',
      'Eti süz, kurula. Pastırmayı render et, kenara al.',
      'Yüksek ateşte eti her tarafından mühürle — kalabalık tavada yapma.',
      'Tüm malzemeleri döküm tencereye al, şarap ve suyu ekle.',
      '160°C fırında 2.5-3 saat pişir — kapak kapalı.',
      'Sosu süz, tencerede yarıya kadar indirge.',
      'İnci soğan ve mantarı ayrı tavada sotele, tencereye ekle.',
    ],
    teknik: 'Fond — mühürleme sırasında tavanın dibine yapışan kahverengi katman asla atılmaz. Şarap ekleyip kazıyarak kaldır; bu "déglaçage" tekniği sosun umami derinliğinin yarısını oluşturur.',
    besin: { kalori: 580, protein: 48, karbonhidrat: 12, yag: 28 },
  },
  {
    id: 3,
    isim: 'Eggs Benedict',
    mutfak: 'Amerikan',
    sure: '25 dk',
    zorluk: 'Orta',
    gorsel: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80',
    hikaye: '1894, Delmonico\'s Restaurant, New York. Düzenli müşteri Lemuel Benedict, akşamki içkinin acısını çıkarmak için "tereyağlı tost, çıtır pastırma, poşe yumurta ve Hollandaise sos" istedi. Baş garson o kadar etkilendi ki menüye ekledi. Bir akşamın çaresi sabah klasiği oldu.',
    malzemeler: [
      { isim: 'Yumurta', miktar: 4, birim: 'adet' },
      { isim: 'İngiliz muffin', miktar: 2, birim: 'adet' },
      { isim: 'Canadian bacon', miktar: 4, birim: 'dilim' },
      { isim: 'Beyaz sirke', miktar: 1, birim: 'tbsp' },
      { isim: 'Yumurta sarısı (sos için)', miktar: 3, birim: 'adet' },
      { isim: 'Tereyağı (eritilmiş)', miktar: 115, birim: 'g' },
      { isim: 'Limon suyu', miktar: 1, birim: 'tbsp' },
    ],
    adimlar: [
      'Hollandaise: sarıları ve limon suyunu bain-marie\'de çırp, hacim iki katına çıkana dek.',
      'Tereyağını yavaş yavaş damla damla ekle, sürekli çırparak emülsifiye et.',
      'Poşe için suya sirke ekle, hafif kaynata (kabarcık yok).',
      'Yumurtayı küçük kaba kır, suya yakın yavaşça bırak. 3 dk pişir.',
      'Muffinleri kızart, bacon\'ı ısıt.',
      'Muffin → bacon → yumurta → sos sıralamasıyla servis et.',
    ],
    teknik: 'Bain-marie emülsiyonu — Hollandaise\'in sırrı ısı kontrolüdür. Su 70°C\'yi geçerse yumurta pişer, 60°C\'nin altında kalırsa emülsiyon tutmaz. Parmaklarını kaseye değdir; "tutamıyorum ama sıcak" hissi doğru sıcaklıktır.',
    besin: { kalori: 490, protein: 22, karbonhidrat: 28, yag: 34 },
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
];

// ─── RENKLER ─────────────────────────────────────────────────────────────────

const C = {
  bg: '#0F0E0C',
  bg2: '#1A1814',
  bg3: '#252320',
  accent: '#C9A96E',
  accentDim: '#8B6F42',
  text: '#F0EDE8',
  textMuted: '#8A8680',
  textDim: '#4A4845',
  border: '#2A2825',
};

// ─── EKRANLAR ────────────────────────────────────────────────────────────────

function AnaSayfa({ onTarif, onOlcu }) {
  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.logo}>mise</Text>
        <Text style={s.logoAlt}>her şey yerli yerinde</Text>
      </View>

      {/* Öne çıkan */}
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

      {/* Tarifler */}
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

      {/* Ölçü tablosu */}
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
        {/* Görsel */}
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

        {/* Besin */}
        <View style={s.besinRow}>
          {[
            ['kalori', tarif.besin.kalori, 'kcal'],
            ['protein', tarif.besin.protein, 'g'],
            ['karb', tarif.besin.karbonhidrat, 'g'],
            ['yağ', tarif.besin.yag, 'g'],
          ].map(([etiket, deger, birim]) => (
            <View key={etiket} style={s.besinKutu}>
              <Text style={s.besinDeger}>{deger}</Text>
              <Text style={s.besinBirim}>{birim}</Text>
              <Text style={s.besinEtiket}>{etiket}</Text>
            </View>
          ))}
        </View>

        {/* Tabs */}
        <View style={s.tabRow}>
          {['hikaye', 'malzemeler', 'yapılış', 'teknik'].map(t => (
            <TouchableOpacity key={t} style={[s.tab, aktifTab === t && s.tabAktif]} onPress={() => setAktifTab(t)}>
              <Text style={[s.tabText, aktifTab === t && s.tabTextAktif]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab içerikleri */}
        <View style={s.tabIcerik}>
          {aktifTab === 'hikaye' && (
            <Text style={s.hikayeMetin}>{tarif.hikaye}</Text>
          )}

          {aktifTab === 'malzemeler' && (
            <View>
              {tarif.malzemeler.map((m, i) => (
                <View key={i} style={s.malzemeRow}>
                  <Text style={s.malzemeIsim}>{m.isim}</Text>
                  <Text style={s.malzemeMiktar}>{m.miktar} {m.birim}</Text>
                </View>
              ))}
            </View>
          )}

          {aktifTab === 'yapılış' && (
            <View>
              {tarif.adimlar.map((a, i) => (
                <View key={i} style={s.adimRow}>
                  <View style={s.adimNumara}>
                    <Text style={s.adimNumaraText}>{i + 1}</Text>
                  </View>
                  <Text style={s.adimMetin}>{a}</Text>
                </View>
              ))}
            </View>
          )}

          {aktifTab === 'teknik' && (
            <View style={s.teknikKutu}>
              <Text style={s.teknikBaslik}>
                {tarif.teknik.split('—')[0].trim()}
              </Text>
              <Text style={s.teknikMetin}>
                {tarif.teknik.split('—').slice(1).join('—').trim()}
              </Text>
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
          {/* Başlık satırı */}
          <View style={s.tabloBaslikRow}>
            <View style={[s.tabloHucre, s.tabloMalzemeHucre]}>
              <Text style={s.tabloBaslikText}>malzeme</Text>
            </View>
            {kolonlar.map(k => (
              <View key={k} style={s.tabloHucre}>
                <Text style={s.tabloBaslikText}>{k}</Text>
              </View>
            ))}
          </View>
          {/* Veri satırları */}
          {OLCU_TABLOSU.map((row, i) => (
            <View key={i} style={[s.tabloRow, i % 2 === 1 && s.tabloRowAlt]}>
              <View style={[s.tabloHucre, s.tabloMalzemeHucre]}>
                <Text style={s.tabloMalzemeText}>{row.malzeme}</Text>
              </View>
              {degerler.map(d => (
                <View key={d} style={s.tabloHucre}>
                  <Text style={s.tabloDegerText}>{row[d] ?? '—'}</Text>
                </View>
              ))}
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

// ─── ANA UYGULAMA ─────────────────────────────────────────────────────────────

export default function App() {
  const [ekran, setEkran] = useState('ana');
  const [secilenTarif, setSecilenTarif] = useState(null);

  const tarifAc = (t) => { setSecilenTarif(t); setEkran('tarif'); };
  const olcuAc = () => setEkran('olcu');
  const geri = () => setEkran('ana');

  return (
    <SafeAreaView style={s.root}>
      {ekran === 'ana' && <AnaSayfa onTarif={tarifAc} onOlcu={olcuAc} />}
      {ekran === 'tarif' && <TarifEkrani tarif={secilenTarif} onGeri={geri} />}
      {ekran === 'olcu' && <OlcuEkrani onGeri={geri} />}
    </SafeAreaView>
  );
}

// ─── STİLLER ─────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1, backgroundColor: C.bg },

  // Header
  header: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32 },
  logo: { fontSize: 42, fontWeight: '300', color: C.text, letterSpacing: 8, fontStyle: 'italic' },
  logoAlt: { fontSize: 12, color: C.accentDim, letterSpacing: 3, marginTop: 4, textTransform: 'uppercase' },

  bolumBaslik: { fontSize: 11, color: C.accentDim, letterSpacing: 4, textTransform: 'uppercase', paddingHorizontal: 24, marginBottom: 16 },

  // Featured card
  featuredCard: { marginHorizontal: 24, height: 280, borderRadius: 16, overflow: 'hidden', marginBottom: 40 },
  featuredImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  featuredOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  featuredText: { position: 'absolute', bottom: 24, left: 24, right: 24 },
  featuredMutfak: { fontSize: 11, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 },
  featuredIsim: { fontSize: 26, fontWeight: '300', color: C.text, letterSpacing: 1, marginBottom: 8, fontStyle: 'italic' },
  featuredMeta: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },

  // Tarif listesi
  tarifCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 16, backgroundColor: C.bg2, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  tarifImg: { width: 80, height: 80 },
  tarifBilgi: { flex: 1, paddingHorizontal: 16, paddingVertical: 12 },
  tarifMutfak: { fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 },
  tarifIsim: { fontSize: 16, fontWeight: '400', color: C.text, fontStyle: 'italic', marginBottom: 4 },
  tarifMeta: { fontSize: 12, color: C.textMuted },
  tarifOk: { fontSize: 22, color: C.textDim, paddingRight: 16 },

  // Ölçü banner
  olcuBanner: { marginHorizontal: 24, marginTop: 8, padding: 20, backgroundColor: C.bg3, borderRadius: 12, borderWidth: 1, borderColor: C.accentDim, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  olcuBaslik: { fontSize: 15, color: C.accent, fontWeight: '400', marginBottom: 4 },
  olcuAlt: { fontSize: 12, color: C.textMuted },
  olcuOk: { fontSize: 24, color: C.accentDim },

  // Tarif detay
  tarifDetayGorsel: { height: 320, position: 'relative' },
  tarifDetayOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  geriBtn: { position: 'absolute', top: 50, left: 20, padding: 8 },
  geriBtnText: { fontSize: 14, color: C.accent, letterSpacing: 1 },
  tarifDetayBaslik: { position: 'absolute', bottom: 28, left: 24, right: 24 },
  tarifDetayMutfak: { fontSize: 11, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 },
  tarifDetayIsim: { fontSize: 30, fontWeight: '300', color: C.text, fontStyle: 'italic', marginBottom: 6 },
  tarifDetayMeta: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },

  // Besin
  besinRow: { flexDirection: 'row', marginHorizontal: 24, marginTop: 20, marginBottom: 8, gap: 8 },
  besinKutu: { flex: 1, backgroundColor: C.bg2, borderRadius: 10, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  besinDeger: { fontSize: 20, fontWeight: '300', color: C.text },
  besinBirim: { fontSize: 10, color: C.accentDim, marginTop: 1 },
  besinEtiket: { fontSize: 10, color: C.textMuted, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 },

  // Tabs
  tabRow: { flexDirection: 'row', marginHorizontal: 24, marginTop: 20, marginBottom: 4, gap: 4 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: C.border },
  tabAktif: { backgroundColor: C.accent, borderColor: C.accent },
  tabText: { fontSize: 12, color: C.textMuted, textTransform: 'lowercase' },
  tabTextAktif: { color: C.bg, fontWeight: '500' },

  // Tab içerik
  tabIcerik: { paddingHorizontal: 24, paddingTop: 20 },
  hikayeMetin: { fontSize: 16, color: C.text, lineHeight: 28, fontStyle: 'italic', fontWeight: '300' },

  // Malzemeler
  malzemeRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  malzemeIsim: { fontSize: 15, color: C.text, fontWeight: '300' },
  malzemeMiktar: { fontSize: 15, color: C.accent },

  // Adımlar
  adimRow: { flexDirection: 'row', marginBottom: 20, gap: 16 },
  adimNumara: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: C.accentDim, alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0 },
  adimNumaraText: { fontSize: 12, color: C.accent },
  adimMetin: { flex: 1, fontSize: 15, color: C.text, lineHeight: 24, fontWeight: '300' },

  // Teknik
  teknikKutu: { backgroundColor: C.bg2, borderRadius: 12, padding: 20, borderLeftWidth: 2, borderLeftColor: C.accent },
  teknikBaslik: { fontSize: 16, color: C.accent, fontWeight: '500', marginBottom: 12, fontStyle: 'italic' },
  teknikMetin: { fontSize: 15, color: C.text, lineHeight: 26, fontWeight: '300' },

  // Ölçü tablosu
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