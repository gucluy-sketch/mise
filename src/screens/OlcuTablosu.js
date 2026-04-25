import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { C } from '../theme';
import { OLCU_TABLOSU } from '../data/olcular';

export default function OlcuTablosu({ onGeri }) {
  const kolonlar = ['çay k.', 'yemek k.', 'tatlı k.', 'çay b.', 'su b.'];
  const alanlar = ['cay_kasigi', 'yemek_kasigi', 'tatli_kasigi', 'cay_bardagi', 'su_bardagi'];

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <TouchableOpacity onPress={onGeri} style={{ marginBottom: 16 }}>
          <Text style={s.geri}>← geri</Text>
        </TouchableOpacity>
        <Text style={s.baslik}>altın standart ölçüler</Text>
        <Text style={s.aciklama}>Tüm değerler gram cinsindendir</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={s.tablo}>
          {/* Başlık */}
          <View style={s.baslikRow}>
            <View style={[s.hucre, s.malzemeHucre]}>
              <Text style={s.kolonBaslik}>malzeme</Text>
            </View>
            {kolonlar.map(k => (
              <View key={k} style={s.hucre}>
                <Text style={s.kolonBaslik}>{k}</Text>
              </View>
            ))}
          </View>
          {/* Satırlar */}
          {OLCU_TABLOSU.map((row, i) => (
            <View key={i} style={[s.satir, i % 2 === 1 && s.satirAlt]}>
              <View style={[s.hucre, s.malzemeHucre]}>
                <Text style={s.malzemeText}>{row.malzeme}</Text>
              </View>
              {alanlar.map(a => (
                <View key={a} style={s.hucre}>
                  <Text style={s.degerText}>{row[a] ?? '—'}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={s.not}>
        <Text style={s.notText}>
          Ölçüler standart Türk mutfak aletlerine göredir.{'\n'}
          Çay bardağı: 200ml · Su bardağı: 250ml · Yemek kaşığı: 15ml · Çay kaşığı: 5ml
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 24, paddingTop: 50, paddingBottom: 24 },
  geri: { fontSize: 14, color: C.accent, letterSpacing: 1 },
  baslik: { fontSize: 26, fontWeight: '300', color: C.text, fontStyle: 'italic', marginBottom: 8 },
  aciklama: { fontSize: 13, color: C.textMuted },
  tablo: { marginLeft: 24, marginRight: 24, marginTop: 8 },
  baslikRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.accentDim, paddingBottom: 10, marginBottom: 4 },
  satir: { flexDirection: 'row', paddingVertical: 12 },
  satirAlt: { backgroundColor: C.bg2, borderRadius: 6 },
  hucre: { width: 72, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  malzemeHucre: { width: 110, alignItems: 'flex-start' },
  kolonBaslik: { fontSize: 10, color: C.accentDim, textTransform: 'uppercase', letterSpacing: 1 },
  malzemeText: { fontSize: 13, color: C.text },
  degerText: { fontSize: 13, color: C.accent },
  not: { margin: 24, padding: 16, backgroundColor: C.bg2, borderRadius: 10, borderWidth: 1, borderColor: C.border },
  notText: { fontSize: 12, color: C.textMuted, lineHeight: 20 },
});