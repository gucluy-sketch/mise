import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { C } from '../theme';

export default function AnaSayfa({ tarifler, onTarif, onOlcu }) {
  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>

      {/* Logo */}
      <View style={s.header}>
        <Text style={s.logo}>mise</Text>
        <Text style={s.logoAlt}>her şey yerli yerinde</Text>
      </View>

      {/* Öne çıkan */}
      <Text style={s.bolumBaslik}>öne çıkan</Text>
      <TouchableOpacity style={s.featured} onPress={() => onTarif(tarifler[0])}>
        <Image source={{ uri: tarifler[0].gorsel }} style={s.featuredImg} />
        <View style={s.featuredOverlay} />
        <View style={s.featuredText}>
          <Text style={s.featuredMutfak}>{tarifler[0].mutfak}</Text>
          <Text style={s.featuredIsim}>{tarifler[0].isim}</Text>
          <Text style={s.featuredMeta}>{tarifler[0].sure} · {tarifler[0].zorluk}</Text>
        </View>
      </TouchableOpacity>

      {/* Tarif listesi */}
      <Text style={s.bolumBaslik}>tarifler</Text>
      {tarifler.map(t => (
        <TouchableOpacity key={t.id} style={s.kart} onPress={() => onTarif(t)}>
          <Image source={{ uri: t.gorsel }} style={s.kartImg} />
          <View style={s.kartBilgi}>
            <Text style={s.kartMutfak}>{t.mutfak}</Text>
            <Text style={s.kartIsim}>{t.isim}</Text>
            <Text style={s.kartMeta}>{t.sure} · {t.zorluk}</Text>
          </View>
          <Text style={s.kartOk}>›</Text>
        </TouchableOpacity>
      ))}

      {/* Ölçü tablosu banner */}
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

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32 },
  logo: { fontSize: 42, fontWeight: '300', color: C.text, letterSpacing: 8, fontStyle: 'italic' },
  logoAlt: { fontSize: 12, color: C.accentDim, letterSpacing: 3, marginTop: 4, textTransform: 'uppercase' },
  bolumBaslik: { fontSize: 11, color: C.accentDim, letterSpacing: 4, textTransform: 'uppercase', paddingHorizontal: 24, marginBottom: 16 },
  featured: { marginHorizontal: 24, height: 280, borderRadius: 16, overflow: 'hidden', marginBottom: 40 },
  featuredImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  featuredOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  featuredText: { position: 'absolute', bottom: 24, left: 24, right: 24 },
  featuredMutfak: { fontSize: 11, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 },
  featuredIsim: { fontSize: 26, fontWeight: '300', color: C.text, letterSpacing: 1, marginBottom: 8, fontStyle: 'italic' },
  featuredMeta: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  kart: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 16, backgroundColor: C.bg2, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  kartImg: { width: 80, height: 80 },
  kartBilgi: { flex: 1, paddingHorizontal: 16, paddingVertical: 12 },
  kartMutfak: { fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 },
  kartIsim: { fontSize: 16, fontWeight: '400', color: C.text, fontStyle: 'italic', marginBottom: 4 },
  kartMeta: { fontSize: 12, color: C.textMuted },
  kartOk: { fontSize: 22, color: C.textDim, paddingRight: 16 },
  olcuBanner: { marginHorizontal: 24, marginTop: 8, padding: 20, backgroundColor: C.bg3, borderRadius: 12, borderWidth: 1, borderColor: C.accentDim, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  olcuBaslik: { fontSize: 15, color: C.accent, fontWeight: '400', marginBottom: 4 },
  olcuAlt: { fontSize: 12, color: C.textMuted },
  olcuOk: { fontSize: 24, color: C.accentDim },
});