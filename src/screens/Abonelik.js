import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { C } from '../theme';

const CHECKOUT_URL = 'https://mise-gucluy.lemonsqueezy.com/checkout/buy/402ae6ca-ef17-4aa8-9f58-002dc6649d06';

export default function Abonelik({ kullanici, onGeri }) {
  const abonelikBaslat = () => {
    const url = `${CHECKOUT_URL}?checkout[email]=${kullanici.email}`;
    Linking.openURL(url);
  };

  return (
    <View style={s.root}>
      <TouchableOpacity onPress={onGeri} style={s.geriBtn}>
        <Text style={s.geriText}>← geri</Text>
      </TouchableOpacity>

      <View style={s.icerik}>
        <Text style={s.logo}>mise</Text>
        <Text style={s.baslik}>Premium'a Geç</Text>

        <View style={s.planKutu}>
          <Text style={s.planFiyat}>₺29,99</Text>
          <Text style={s.planPeriyot}>/ ay</Text>

          <View style={s.ayrac} />

          {[
            'Tüm tariflere sınırsız erişim',
            '20+ temel bilgi, sürekli genişleyen',
            'Yemeğin tarihi makaleleri',
            'Altın standart ölçü tablosu',
            'Yeni içerikler öncelikli erişim',
          ].map((ozellik, i) => (
            <View key={i} style={s.ozellikRow}>
              <Text style={s.ozellikTik}>✓</Text>
              <Text style={s.ozellikText}>{ozellik}</Text>
            </View>
          ))}

          <View style={s.ayrac} />

          <TouchableOpacity style={s.btn} onPress={abonelikBaslat}>
            <Text style={s.btnText}>Hemen Başla</Text>
          </TouchableOpacity>

          <Text style={s.iptalText}>İstediğin zaman iptal edebilirsin</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  geriBtn: { paddingTop: 50, paddingHorizontal: 24, paddingBottom: 8 },
  geriText: { fontSize: 14, color: C.accent, letterSpacing: 1 },
  icerik: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  logo: { fontSize: 36, fontWeight: '300', color: C.text, letterSpacing: 8, fontStyle: 'italic', marginBottom: 8 },
  baslik: { fontSize: 22, fontWeight: '300', color: C.text, marginBottom: 24 },
  planKutu: { backgroundColor: C.bg2, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: C.border },
  planFiyat: { fontSize: 42, fontWeight: '300', color: C.accent },
  planPeriyot: { fontSize: 16, color: C.textMuted, marginTop: -8, marginBottom: 4 },
  ayrac: { height: 1, backgroundColor: C.border, marginVertical: 16 },
  ozellikRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  ozellikTik: { fontSize: 14, color: C.accent, width: 20 },
  ozellikText: { fontSize: 14, color: C.text, fontWeight: '300', flex: 1 },
  btn: { backgroundColor: C.accent, borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 4 },
  btnText: { fontSize: 15, fontWeight: '600', color: C.bg },
  iptalText: { fontSize: 12, color: C.textMuted, textAlign: 'center', marginTop: 12 },
});