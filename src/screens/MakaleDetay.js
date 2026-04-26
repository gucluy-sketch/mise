import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { C } from '../theme';

export default function MakaleDetay({ makale, tip, onGeri }) {
  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>

      {/* Görsel */}
      <View style={s.gorsel}>
        <Image source={{ uri: makale.gorsel }} style={StyleSheet.absoluteFill} />
        <View style={s.overlay} />
        <TouchableOpacity style={s.geri} onPress={onGeri}>
          <Text style={s.geriText}>← geri</Text>
        </TouchableOpacity>
        <View style={s.etiketKutu}>
          <Text style={s.etiketText}>{tip === 'temel' ? 'TEMEL BİLGİ' : 'TARİH'}</Text>
        </View>
        <View style={s.baslik}>
          <Text style={s.kategori}>{makale.kategori}</Text>
          <Text style={s.isim}>{makale.baslik}</Text>
          <Text style={s.meta}>{makale.sure_okuma} okuma</Text>
        </View>
      </View>

      {/* Özet */}
      <View style={s.ozetKutu}>
        <Text style={s.ozetMetin}>{makale.ozet}</Text>
      </View>

      {/* İçerik */}
      <View style={s.icerik}>
        {makale.icerik.split('\n\n').map((paragraf, i) => (
          <Text key={i} style={s.paragraf}>{paragraf}</Text>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  gorsel: { height: 300, position: 'relative' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  geri: { position: 'absolute', top: 50, left: 20, padding: 8 },
  geriText: { fontSize: 14, color: C.accent, letterSpacing: 1 },
  etiketKutu: { position: 'absolute', top: 50, right: 20, backgroundColor: C.accent, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  etiketText: { fontSize: 9, color: C.bg, fontWeight: '700', letterSpacing: 2 },
  baslik: { position: 'absolute', bottom: 24, left: 24, right: 24 },
  kategori: { fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 },
  isim: { fontSize: 26, fontWeight: '300', color: C.text, fontStyle: 'italic', marginBottom: 6 },
  meta: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  ozetKutu: { margin: 24, padding: 18, backgroundColor: C.bg2, borderRadius: 12, borderLeftWidth: 2, borderLeftColor: C.accent },
  ozetMetin: { fontSize: 15, color: C.text, lineHeight: 24, fontStyle: 'italic', fontWeight: '300' },
  icerik: { paddingHorizontal: 24 },
  paragraf: { fontSize: 15, color: C.text, lineHeight: 26, fontWeight: '300', marginBottom: 20 },
});