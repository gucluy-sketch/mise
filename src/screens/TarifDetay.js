import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { C } from '../theme';

export default function TarifDetay({ tarif, onGeri }) {
  const [aktifTab, setAktifTab] = useState('hikaye');

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>

      {/* Görsel + başlık */}
      <View style={s.gorsel}>
        <Image source={{ uri: tarif.gorsel }} style={StyleSheet.absoluteFill} />
        <View style={s.overlay} />
        <TouchableOpacity style={s.geri} onPress={onGeri}>
          <Text style={s.geriText}>← geri</Text>
        </TouchableOpacity>
        <View style={s.baslik}>
          <Text style={s.mutfak}>{tarif.mutfak}</Text>
          <Text style={s.isim}>{tarif.isim}</Text>
          <Text style={s.meta}>{tarif.sure} · {tarif.zorluk}</Text>
        </View>
      </View>

      {/* Besin değerleri */}
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

      {/* Sekmeler */}
      <View style={s.tabRow}>
        {['hikaye', 'malzemeler', 'yapılış', 'teknik'].map(t => (
          <TouchableOpacity key={t} style={[s.tab, aktifTab === t && s.tabAktif]} onPress={() => setAktifTab(t)}>
            <Text style={[s.tabText, aktifTab === t && s.tabTextAktif]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sekme içerikleri */}
      <View style={s.icerik}>

        {aktifTab === 'hikaye' && (
          <Text style={s.hikaye}>{tarif.hikaye}</Text>
        )}

        {aktifTab === 'malzemeler' && tarif.malzemeler.map((m, i) => (
          <View key={i} style={s.malzemeRow}>
            <Text style={s.malzemeIsim}>{m.isim}</Text>
            <Text style={s.malzemeMiktar}>{m.miktar > 0 ? `${m.miktar} ${m.birim}` : m.birim}</Text>
          </View>
        ))}

        {aktifTab === 'yapılış' && tarif.adimlar.map((a, i) => (
          <View key={i} style={s.adimRow}>
            <View style={s.adimNo}><Text style={s.adimNoText}>{i + 1}</Text></View>
            <Text style={s.adimMetin}>{a}</Text>
          </View>
        ))}

        {aktifTab === 'teknik' && (
          <View style={s.teknikKutu}>
            <Text style={s.teknikBaslik}>{tarif.teknik_isim}</Text>
            <Text style={s.teknikMetin}>{tarif.teknik}</Text>
          </View>
        )}

      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  gorsel: { height: 320, position: 'relative' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  geri: { position: 'absolute', top: 50, left: 20, padding: 8 },
  geriText: { fontSize: 14, color: C.accent, letterSpacing: 1 },
  baslik: { position: 'absolute', bottom: 28, left: 24, right: 24 },
  mutfak: { fontSize: 11, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 },
  isim: { fontSize: 30, fontWeight: '300', color: C.text, fontStyle: 'italic', marginBottom: 6 },
  meta: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  besinRow: { flexDirection: 'row', marginHorizontal: 24, marginTop: 20, marginBottom: 8, gap: 8 },
  besinKutu: { flex: 1, backgroundColor: C.bg2, borderRadius: 10, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  besinDeger: { fontSize: 20, fontWeight: '300', color: C.text },
  besinBirim: { fontSize: 10, color: C.accentDim, marginTop: 1 },
  besinEtiket: { fontSize: 10, color: C.textMuted, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 },
  tabRow: { flexDirection: 'row', marginHorizontal: 24, marginTop: 20, marginBottom: 4, gap: 4 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: C.border },
  tabAktif: { backgroundColor: C.accent, borderColor: C.accent },
  tabText: { fontSize: 12, color: C.textMuted },
  tabTextAktif: { color: C.bg, fontWeight: '500' },
  icerik: { paddingHorizontal: 24, paddingTop: 20 },
  hikaye: { fontSize: 16, color: C.text, lineHeight: 28, fontStyle: 'italic', fontWeight: '300' },
  malzemeRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  malzemeIsim: { fontSize: 15, color: C.text, fontWeight: '300', flex: 1, marginRight: 12 },
  malzemeMiktar: { fontSize: 15, color: C.accent },
  adimRow: { flexDirection: 'row', marginBottom: 20, gap: 16 },
  adimNo: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: C.accentDim, alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0 },
  adimNoText: { fontSize: 12, color: C.accent },
  adimMetin: { flex: 1, fontSize: 15, color: C.text, lineHeight: 24, fontWeight: '300' },
  teknikKutu: { backgroundColor: C.bg2, borderRadius: 12, padding: 20, borderLeftWidth: 2, borderLeftColor: C.accent },
  teknikBaslik: { fontSize: 16, color: C.accent, fontWeight: '500', marginBottom: 12, fontStyle: 'italic' },
  teknikMetin: { fontSize: 15, color: C.text, lineHeight: 26, fontWeight: '300' },
});