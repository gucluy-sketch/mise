import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { C } from '../theme';

export default function ListeEkrani({ baslik, etiket, veriler, onItem, onGeri }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={s.header}>
        <TouchableOpacity onPress={onGeri}>
          <Text style={s.geri}>← geri</Text>
        </TouchableOpacity>
        <Text style={s.baslik}>{baslik}</Text>
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        {veriler.map((item, i) => (
          <TouchableOpacity key={item.id} style={s.kart} onPress={() => onItem(item)}>
            <Image source={{ uri: item.gorsel }} style={s.kartImg} />
            <View style={s.kartBilgi}>
              <Text style={s.kartKategori}>{item.kategori || item.mutfak}</Text>
              <Text style={s.kartIsim}>{item.baslik || item.isim}</Text>
              <Text style={s.kartMeta}>
                {item.sure_okuma ? `${item.sure_okuma} okuma` : `${item.sure} · ${item.zorluk}`}
              </Text>
            </View>
            <Text style={s.ok}>›</Text>
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 24, paddingTop: 50, paddingBottom: 20, backgroundColor: C.bg },
  geri: { fontSize: 14, color: C.accent, letterSpacing: 1, marginBottom: 12 },
  baslik: { fontSize: 28, fontWeight: '300', color: C.text, fontStyle: 'italic' },
  kart: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 16, backgroundColor: C.bg2, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  kartImg: { width: 90, height: 90 },
  kartBilgi: { flex: 1, paddingHorizontal: 16, paddingVertical: 12 },
  kartKategori: { fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 },
  kartIsim: { fontSize: 15, fontWeight: '400', color: C.text, fontStyle: 'italic', marginBottom: 4 },
  kartMeta: { fontSize: 12, color: C.textMuted },
  ok: { fontSize: 22, color: C.textDim, paddingRight: 16 },
});