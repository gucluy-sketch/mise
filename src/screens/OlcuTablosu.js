import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { C } from '../theme';

export default function OlcuTablosu({ malzemeler, onGeri }) {
  const [arama, setArama] = useState('');
  const [aktifKategori, setAktifKategori] = useState('Tümü');

  const kategoriler = ['Tümü', ...new Set(malzemeler.map(m => m.kategori))];

  const filtrelenmis = malzemeler.filter(m => {
    const aramaUygun = m.isim.toLowerCase().includes(arama.toLowerCase());
    const kategoriUygun = aktifKategori === 'Tümü' || m.kategori === aktifKategori;
    return aramaUygun && kategoriUygun;
  });

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={s.header}>
        <TouchableOpacity onPress={onGeri} style={{ marginBottom: 12 }}>
          <Text style={s.geri}>← geri</Text>
        </TouchableOpacity>
        <Text style={s.baslik}>altın standart ölçüler</Text>
        <Text style={s.aciklama}>{malzemeler.length} malzeme · gramaj & besin değerleri</Text>
      </View>

      <View style={s.aramaKutu}>
        <TextInput
          style={s.aramaInput}
          placeholder="Malzeme ara..."
          placeholderTextColor={C.textDim}
          value={arama}
          onChangeText={setArama}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.kategoriler}>
        {kategoriler.map(k => (
          <TouchableOpacity
            key={k}
            style={[s.kategoriBtn, aktifKategori === k && s.kategoriBtnAktif]}
            onPress={() => setAktifKategori(k)}
          >
            <Text style={[s.kategoriBtnText, aktifKategori === k && s.kategoriBtnTextAktif]}>{k}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={s.tablo}>
            <View style={s.baslikSatir}>
              <View style={[s.hucre, s.isimHucre]}><Text style={s.baslikText}>malzeme</Text></View>
              <View style={s.hucre}><Text style={s.baslikText}>çay k.</Text></View>
              <View style={s.hucre}><Text style={s.baslikText}>tatlı k.</Text></View>
              <View style={s.hucre}><Text style={s.baslikText}>yemek k.</Text></View>
              <View style={s.hucre}><Text style={s.baslikText}>çay b.</Text></View>
              <View style={s.hucre}><Text style={s.baslikText}>su b.</Text></View>
              <View style={s.ayrac} />
              <View style={s.hucre}><Text style={s.baslikText}>kalori</Text></View>
              <View style={s.hucre}><Text style={s.baslikText}>karb.</Text></View>
              <View style={s.hucre}><Text style={s.baslikText}>protein</Text></View>
              <View style={s.hucre}><Text style={s.baslikText}>yağ</Text></View>
              <View style={s.hucre}><Text style={s.baslikText}>lif</Text></View>
              <View style={s.hucre}><Text style={s.baslikText}>sodyum</Text></View>
            </View>

            {filtrelenmis.map((m, i) => (
              <View key={m.id} style={[s.satir, i % 2 === 1 && s.satirAlt]}>
                <View style={[s.hucre, s.isimHucre]}>
                  <Text style={s.isimText}>{m.isim}</Text>
                  <Text style={s.kategoriText}>{m.kategori}</Text>
                </View>
                <View style={s.hucre}><Text style={s.degerText}>{m.cay_kasigi ?? '—'}</Text></View>
                <View style={s.hucre}><Text style={s.degerText}>{m.tatli_kasigi ?? '—'}</Text></View>
                <View style={s.hucre}><Text style={s.degerText}>{m.yemek_kasigi ?? '—'}</Text></View>
                <View style={s.hucre}><Text style={s.degerText}>{m.cay_bardagi ?? '—'}</Text></View>
                <View style={s.hucre}><Text style={s.degerText}>{m.su_bardagi ?? '—'}</Text></View>
                <View style={s.ayrac} />
                <View style={s.hucre}><Text style={s.besinText}>{m.kalori}</Text></View>
                <View style={s.hucre}><Text style={s.besinText}>{m.karbonhidrat}</Text></View>
                <View style={s.hucre}><Text style={s.besinText}>{m.protein}</Text></View>
                <View style={s.hucre}><Text style={s.besinText}>{m.yag}</Text></View>
                <View style={s.hucre}><Text style={s.besinText}>{m.lif}</Text></View>
                <View style={s.hucre}><Text style={s.besinText}>{m.sodyum}</Text></View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={s.not}>
          <Text style={s.notText}>
            Gramaj değerleri standarttır, malzemenin yoğunluğuna göre ±%10 sapma olabilir.{'\n'}
            Çay bardağı: 200ml · Su bardağı: 250ml · Yemek kaşığı: 15ml · Çay kaşığı: 5ml{'\n'}
            Besin değerleri: USDA ve Türk Gıda Kodeksi referanslıdır.
          </Text>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header: { paddingHorizontal: 24, paddingTop: 50, paddingBottom: 12, backgroundColor: C.bg },
  geri: { fontSize: 14, color: C.accent, letterSpacing: 1 },
  baslik: { fontSize: 26, fontWeight: '300', color: C.text, fontStyle: 'italic', marginBottom: 4 },
  aciklama: { fontSize: 13, color: C.textMuted },
  aramaKutu: { marginHorizontal: 24, marginBottom: 12 },
  aramaInput: { backgroundColor: C.bg2, borderRadius: 10, padding: 12, color: C.text, fontSize: 14, borderWidth: 1, borderColor: C.border },
  kategoriler: { paddingLeft: 24, marginBottom: 16, flexGrow: 0 },
  kategoriBtn: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: C.border, marginRight: 8 },
  kategoriBtnAktif: { backgroundColor: C.accent, borderColor: C.accent },
  kategoriBtnText: { fontSize: 12, color: C.textMuted },
  kategoriBtnTextAktif: { color: C.bg, fontWeight: '500' },
  tablo: { paddingLeft: 24, paddingRight: 24 },
  baslikSatir: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.accentDim, paddingBottom: 8, marginBottom: 2 },
  satir: { flexDirection: 'row', paddingVertical: 10, alignItems: 'center' },
  satirAlt: { backgroundColor: C.bg2, borderRadius: 6 },
  hucre: { width: 68, alignItems: 'center', paddingHorizontal: 4 },
  isimHucre: { width: 150, alignItems: 'flex-start' },
  ayrac: { width: 1, backgroundColor: C.border, marginHorizontal: 4, alignSelf: 'stretch' },
  baslikText: { fontSize: 10, color: C.accentDim, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' },
  isimText: { fontSize: 13, color: C.text, fontWeight: '400' },
  kategoriText: { fontSize: 10, color: C.textDim, marginTop: 2 },
  degerText: { fontSize: 13, color: C.accent, textAlign: 'center' },
  besinText: { fontSize: 13, color: C.textMuted, textAlign: 'center' },
  not: { margin: 24, padding: 16, backgroundColor: C.bg2, borderRadius: 10, borderWidth: 1, borderColor: C.border },
  notText: { fontSize: 11, color: C.textMuted, lineHeight: 19 },
});