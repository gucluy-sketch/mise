import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { C } from '../theme';
import { KATEGORILER } from '../data/temel_bilgiler';

export default function TemelBilgiler({ temelBilgiler, onItem, onGeri }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={s.header}>
        <TouchableOpacity onPress={onGeri}>
          <Text style={s.geri}>← geri</Text>
        </TouchableOpacity>
        <Text style={s.baslik}>Temel Bilgiler</Text>
        <Text style={s.altBaslik}>Mutfağın bilimi ve sanatı</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {KATEGORILER.map(kategori => {
          const icerikler = temelBilgiler.filter(b => b.kategori_id === kategori.id);
          if (icerikler.length === 0) return null;
          return (
            <View key={kategori.id} style={s.kategoriBlok}>
              <View style={s.kategoriBaslikRow}>
                <Text style={s.kategoriIkon}>{kategori.ikon}</Text>
                <Text style={s.kategoriLabel}>{kategori.label}</Text>
                <Text style={s.kategoriSayi}>{icerikler.length}</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.yatayScroll}>
                {icerikler.map(item => (
                  <TouchableOpacity key={item.id} style={s.kart} onPress={() => onItem(item)}>
                    <Image source={{ uri: item.gorsel }} style={s.kartImg} />
                    <View style={s.kartOverlay} />
                    <View style={s.kartIcerik}>
                      <Text style={s.kartBaslik} numberOfLines={2}>{item.baslik}</Text>
                      <Text style={s.kartMeta}>{item.sure_okuma} okuma</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header: { paddingHorizontal: 24, paddingTop: 50, paddingBottom: 24, backgroundColor: C.bg },
  geri: { fontSize: 14, color: C.accent, letterSpacing: 1, marginBottom: 12 },
  baslik: { fontSize: 28, fontWeight: '300', color: C.text, fontStyle: 'italic' },
  altBaslik: { fontSize: 13, color: C.textMuted, marginTop: 4 },
  kategoriBlok: { marginBottom: 32 },
  kategoriBaslikRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 14, gap: 8 },
  kategoriIkon: { fontSize: 16 },
  kategoriLabel: { fontSize: 12, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', flex: 1 },
  kategoriSayi: { fontSize: 11, color: C.textDim, backgroundColor: C.bg2, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  yatayScroll: { paddingLeft: 24 },
  kart: { width: 180, height: 220, borderRadius: 12, overflow: 'hidden', marginRight: 12, backgroundColor: C.bg2 },
  kartImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  kartOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  kartIcerik: { position: 'absolute', bottom: 16, left: 14, right: 14 },
  kartBaslik: { fontSize: 15, fontWeight: '400', color: C.text, fontStyle: 'italic', lineHeight: 20, marginBottom: 6 },
  kartMeta: { fontSize: 11, color: C.accent },
});