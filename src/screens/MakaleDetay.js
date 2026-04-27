import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { C } from '../theme';
import RichText from '../RichText';

export default function MakaleDetay({ makale, tip, onGeri }) {
  if (!makale) return null;

  const baslik = makale.baslik || makale.isim;
  const gorsel = makale.gorsel;
  const ozet = makale.ozet;
  const icerik = makale.icerik;
  const kategori = makale.kategori || makale.kategori_id;
  const sureMeta = makale.sure_okuma || makale.sure;

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      {gorsel && (
        <View style={s.gorselKutu}>
          <Image source={{ uri: gorsel }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <View style={s.overlay} />
          <TouchableOpacity style={s.geri} onPress={onGeri}>
            <Text style={s.geriText}>← geri</Text>
          </TouchableOpacity>
          <View style={s.baslikKutu}>
            {kategori && <Text style={s.kategori}>{kategori}</Text>}
            <Text style={s.baslik}>{baslik}</Text>
            {sureMeta && <Text style={s.meta}>{sureMeta} okuma</Text>}
          </View>
        </View>
      )}

      {!gorsel && (
        <View style={s.baslikSade}>
          <TouchableOpacity onPress={onGeri}>
            <Text style={s.geriText}>← geri</Text>
          </TouchableOpacity>
          {kategori && <Text style={s.kategoriSade}>{kategori}</Text>}
          <Text style={s.baslikSadeText}>{baslik}</Text>
          {sureMeta && <Text style={s.metaSade}>{sureMeta} okuma</Text>}
        </View>
      )}

      <View style={s.icerik}>
        {ozet && (
          <View style={s.ozetKutu}>
            <RichText metin={ozet} style={s.ozetMetin} />
          </View>
        )}

        {icerik && (
          <RichText metin={icerik} />
        )}
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  gorselKutu: { height: 340, position: 'relative' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  geri: { position: 'absolute', top: 50, left: 20, padding: 8 },
  geriText: { fontSize: 14, color: C.accent, letterSpacing: 1 },
  baslikKutu: { position: 'absolute', bottom: 28, left: 24, right: 24 },
  kategori: { fontSize: 11, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 },
  baslik: { fontSize: 28, fontWeight: '300', color: C.text, fontStyle: 'italic', marginBottom: 6, lineHeight: 36 },
  meta: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  baslikSade: { paddingHorizontal: 24, paddingTop: 50, paddingBottom: 24 },
  kategoriSade: { fontSize: 11, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, marginTop: 12 },
  baslikSadeText: { fontSize: 28, fontWeight: '300', color: C.text, fontStyle: 'italic', lineHeight: 36, marginBottom: 6 },
  metaSade: { fontSize: 13, color: C.textMuted },
  icerik: { paddingHorizontal: 24, paddingTop: 24 },
  ozetKutu: { borderLeftWidth: 2, borderLeftColor: C.accent, paddingLeft: 16, marginBottom: 24 },
  ozetMetin: { fontSize: 16, color: C.textMuted, lineHeight: 26, fontStyle: 'italic' },
});