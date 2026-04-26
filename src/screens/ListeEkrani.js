import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { C } from '../theme';
import { supabase } from '../supabase';

export default function ListeEkrani({ baslik, veriler, onItem, onGeri }) {
  const [taglar, setTaglar] = useState([]);
  const [seciliTaglar, setSeciliTaglar] = useState({});
  const [filtrelenmis, setFiltrelenmis] = useState(veriler);

  useEffect(() => {
    const yukle = async () => {
      const { data } = await supabase.from('taglar').select('*').order('id');
      if (data) setTaglar(data);
    };
    yukle();
  }, []);

  useEffect(() => {
    const secilenIdler = Object.values(seciliTaglar).filter(Boolean);
    if (secilenIdler.length === 0) {
      setFiltrelenmis(veriler);
      return;
    }
    const filtrele = async () => {
      const { data } = await supabase
        .from('icerik_taglar')
        .select('icerik_id')
        .eq('icerik_turu', 'tarif')
        .in('tag_id', secilenIdler);
      if (data) {
        const ids = data.map(d => d.icerik_id);
        setFiltrelenmis(veriler.filter(v => ids.includes(v.id)));
      }
    };
    filtrele();
  }, [seciliTaglar, veriler]);

  const tagSec = (tur, tagId) => {
    setSeciliTaglar(prev => ({
      ...prev,
      [tur]: prev[tur] === tagId ? null : tagId,
    }));
  };

  const turler = [
    { key: 'mutfak', label: 'Mutfak' },
    { key: 'tip', label: 'Tip' },
    { key: 'sure', label: 'Süre' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={s.header}>
        <TouchableOpacity onPress={onGeri}>
          <Text style={s.geri}>← geri</Text>
        </TouchableOpacity>
        <Text style={s.baslik}>{baslik}</Text>
        <Text style={s.sayi}>{filtrelenmis.length} sonuç</Text>
      </View>

      {turler.map(({ key, label }) => {
        const gruTaglar = taglar.filter(t => t.tur === key);
        if (gruTaglar.length === 0) return null;
        return (
          <View key={key} style={s.filtreSatir}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filtreScroll}>
              <Text style={s.filtreBaslik}>{label}</Text>
              {gruTaglar.map(tag => (
                <TouchableOpacity
                  key={tag.id}
                  style={[s.filtreBtn, seciliTaglar[key] === tag.id && s.filtreBtnAktif]}
                  onPress={() => tagSec(key, tag.id)}
                >
                  <Text style={[s.filtreBtnText, seciliTaglar[key] === tag.id && s.filtreBtnTextAktif]}>
                    {tag.isim}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );
      })}

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        {filtrelenmis.length === 0 ? (
          <View style={s.bosKutu}>
            <Text style={s.bosMetin}>Bu filtreye uygun sonuç bulunamadı.</Text>
          </View>
        ) : filtrelenmis.map((item) => (
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
  header: { paddingHorizontal: 24, paddingTop: 50, paddingBottom: 12, backgroundColor: C.bg },
  geri: { fontSize: 14, color: C.accent, letterSpacing: 1, marginBottom: 12 },
  baslik: { fontSize: 28, fontWeight: '300', color: C.text, fontStyle: 'italic' },
  sayi: { fontSize: 12, color: C.textMuted, marginTop: 4 },
  filtreSatir: { marginBottom: 8 },
  filtreScroll: { paddingLeft: 24, flexGrow: 0 },
  filtreBaslik: { fontSize: 10, color: C.accentDim, letterSpacing: 3, textTransform: 'uppercase', alignSelf: 'center', marginRight: 8 },
  filtreBtn: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: C.border, marginRight: 8 },
  filtreBtnAktif: { backgroundColor: C.accent, borderColor: C.accent },
  filtreBtnText: { fontSize: 12, color: C.textMuted },
  filtreBtnTextAktif: { color: C.bg, fontWeight: '500' },
  scroll: { flex: 1, backgroundColor: C.bg },
  kart: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 16, backgroundColor: C.bg2, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  kartImg: { width: 90, height: 90 },
  kartBilgi: { flex: 1, paddingHorizontal: 16, paddingVertical: 12 },
  kartKategori: { fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 },
  kartIsim: { fontSize: 15, fontWeight: '400', color: C.text, fontStyle: 'italic', marginBottom: 4 },
  kartMeta: { fontSize: 12, color: C.textMuted },
  ok: { fontSize: 22, color: C.textDim, paddingRight: 16 },
  bosKutu: { padding: 40, alignItems: 'center' },
  bosMetin: { fontSize: 14, color: C.textMuted, fontStyle: 'italic' },
});