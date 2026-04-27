import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { C } from '../theme';
import { getTarifDetay } from '../api';
import RichText from '../RichText';

export default function TarifDetay({ tarif, onGeri }) {
  const [aktifTab, setAktifTab] = useState('hikaye');
  const [detay, setDetay] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const yukle = async () => {
      const data = await getTarifDetay(tarif.id);
      setDetay(data);
      setYukleniyor(false);
    };
    yukle();
  }, [tarif.id]);

  if (yukleniyor) {
    return (
      <View style={{ flex: 1, backgroundColor: C.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={C.accent} size="large" />
      </View>
    );
  }

  const t = detay || tarif;
  const malzemeler = t.malzemeler || [];
  const adimlar = t.adimlar || [];

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <View style={s.gorsel}>
        <Image source={{ uri: t.gorsel }} style={StyleSheet.absoluteFill} />
        <View style={s.overlay} />
        <TouchableOpacity style={s.geri} onPress={onGeri}>
          <Text style={s.geriText}>← geri</Text>
        </TouchableOpacity>
        <View style={s.baslik}>
          <Text style={s.mutfak}>{t.mutfak}</Text>
          <Text style={s.isim}>{t.isim}</Text>
          <Text style={s.meta}>{t.sure} · {t.zorluk}</Text>
        </View>
      </View>

      <View style={s.besinRow}>
        {[
          ['kalori', t.besin?.kalori || t.kalori, 'kcal'],
          ['protein', t.besin?.protein || t.protein, 'g'],
          ['karb', t.besin?.karbonhidrat || t.karbonhidrat, 'g'],
          ['yağ', t.besin?.yag || t.yag, 'g'],
        ].map(([etiket, deger, birim]) => (
          <View key={etiket} style={s.besinKutu}>
            <Text style={s.besinDeger}>{deger ?? '—'}</Text>
            <Text style={s.besinBirim}>{birim}</Text>
            <Text style={s.besinEtiket}>{etiket}</Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tabScroll}>
        {['hikaye', 'malzemeler', 'yapılış', 'teknik'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[s.tab, aktifTab === tab && s.tabAktif]}
            onPress={() => setAktifTab(tab)}
          >
            <Text style={[s.tabText, aktifTab === tab && s.tabTextAktif]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={s.icerik}>
        {aktifTab === 'hikaye' && (
          <RichText metin={t.hikaye} />
        )}

        {aktifTab === 'malzemeler' && (
          <View>
            {malzemeler.length === 0 ? (
              <Text style={s.bosMetin}>Malzeme bilgisi henüz eklenmedi.</Text>
            ) : malzemeler.map((m, i) => (
              <View key={i} style={s.malzemeRow}>
                <Text style={s.malzemeIsim}>{m.malzeme_isim || m.isim}</Text>
                <Text style={s.malzemeMiktar}>{m.miktar > 0 ? `${m.miktar} ${m.birim}` : m.birim}</Text>
              </View>
            ))}
          </View>
        )}

        {aktifTab === 'yapılış' && (
          <View>
            {adimlar.length === 0 ? (
              <Text style={s.bosMetin}>Yapılış adımları henüz eklenmedi.</Text>
            ) : adimlar.map((a, i) => (
              <View key={i} style={s.adimRow}>
                <View style={s.adimNo}>
                  <Text style={s.adimNoText}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <RichText
                    metin={typeof a === 'string' ? a : a.aciklama}
                    style={{ fontSize: 15, lineHeight: 24, fontStyle: 'normal' }}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {aktifTab === 'teknik' && (
          <View style={s.teknikKutu}>
            <Text style={s.teknikBaslik}>{t.teknik_isim}</Text>
            <RichText metin={t.teknik} style={{ fontSize: 15, lineHeight: 26, fontStyle: 'normal' }} />
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
  tabScroll: { paddingLeft: 24, marginTop: 20, marginBottom: 4, flexGrow: 0 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: C.border, marginRight: 8 },
  tabAktif: { backgroundColor: C.accent, borderColor: C.accent },
  tabText: { fontSize: 12, color: C.textMuted },
  tabTextAktif: { color: C.bg, fontWeight: '500' },
  icerik: { paddingHorizontal: 24, paddingTop: 20 },
  bosMetin: { fontSize: 14, color: C.textMuted, fontStyle: 'italic' },
  malzemeRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  malzemeIsim: { fontSize: 15, color: C.text, fontWeight: '300', flex: 1, marginRight: 12 },
  malzemeMiktar: { fontSize: 15, color: C.accent },
  adimRow: { flexDirection: 'row', marginBottom: 20, gap: 16 },
  adimNo: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: C.accentDim, alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0 },
  adimNoText: { fontSize: 12, color: C.accent },
  teknikKutu: { backgroundColor: C.bg2, borderRadius: 12, padding: 20, borderLeftWidth: 2, borderLeftColor: C.accent },
  teknikBaslik: { fontSize: 16, color: C.accent, fontWeight: '500', marginBottom: 12, fontStyle: 'italic' },
});