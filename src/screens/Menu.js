import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { C } from '../theme';
import { supabase } from '../supabase';

const MENU_ITEMS = [
  { id: 'Ana', label: 'Ana Sayfa', ikon: '⌂' },
  { id: 'Tarifler', label: 'Tarifler', ikon: '◎' },
  { id: 'TemelBilgiler', label: 'Temel Bilgiler', ikon: '◈' },
  { id: 'Tarih', label: 'Yemeğin Tarihi', ikon: '◉' },
  { id: 'Olcu', label: 'Altın Standart Ölçüler', ikon: '◆' },
];

export default function Menu({ navigation, kullanici }) {
  const cikisYap = async () => {
    await supabase.auth.signOut();
    navigation.goBack();
  };

  return (
    <View style={s.overlay}>
      <TouchableOpacity style={s.backdrop} onPress={() => navigation.goBack()} />
      <View style={s.panel}>
        <View style={s.header}>
          <Text style={s.logo}>mise</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.kapatBtn}>
            <Text style={s.kapatText}>✕</Text>
          </TouchableOpacity>
        </View>

        {kullanici && (
          <View style={s.kullaniciKutu}>
            <Text style={s.kullaniciAd}>{kullanici.user_metadata?.ad || kullanici.email}</Text>
            <Text style={s.kullaniciEmail}>{kullanici.email}</Text>
          </View>
        )}

        <View style={s.ayrac} />

        {MENU_ITEMS.map(item => (
          <TouchableOpacity
            key={item.id}
            style={s.menuItem}
            onPress={() => { navigation.goBack(); navigation.navigate(item.id); }}
          >
            <Text style={s.menuIkon}>{item.ikon}</Text>
            <Text style={s.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={s.premiumBtn}
          onPress={() => { navigation.goBack(); navigation.navigate('Abonelik'); }}
        >
          <Text style={s.premiumBtnText}>✦ Premium'a Geç</Text>
          <Text style={s.premiumBtnAlt}>₺29,99 / ay</Text>
        </TouchableOpacity>

        <View style={s.ayrac} />

        <TouchableOpacity style={s.cikisBtn} onPress={cikisYap}>
          <Text style={s.cikisText}>Çıkış Yap</Text>
        </TouchableOpacity>

        <Text style={s.versiyon}>mise · v0.1</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.6)' },
  backdrop: { flex: 1 },
  panel: { width: 280, backgroundColor: C.bg2, paddingTop: 50, paddingBottom: 40, borderLeftWidth: 1, borderLeftColor: C.border },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  logo: { fontSize: 28, fontWeight: '300', color: C.text, letterSpacing: 6, fontStyle: 'italic' },
  kapatBtn: { padding: 8 },
  kapatText: { fontSize: 16, color: C.textMuted },
  kullaniciKutu: { paddingHorizontal: 24, marginBottom: 16 },
  kullaniciAd: { fontSize: 15, color: C.text, fontWeight: '400', marginBottom: 2 },
  kullaniciEmail: { fontSize: 12, color: C.textMuted },
  ayrac: { height: 1, backgroundColor: C.border, marginHorizontal: 24, marginVertical: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 24, gap: 14 },
  menuIkon: { fontSize: 14, color: C.accentDim, width: 20 },
  menuLabel: { fontSize: 15, color: C.textMuted, fontWeight: '300' },
  premiumBtn: { marginHorizontal: 24, backgroundColor: C.accent, borderRadius: 12, padding: 16, alignItems: 'center' },
  premiumBtnText: { fontSize: 15, fontWeight: '600', color: C.bg, marginBottom: 2 },
  premiumBtnAlt: { fontSize: 11, color: C.bg, opacity: 0.7 },
  cikisBtn: { paddingVertical: 14, paddingHorizontal: 24 },
  cikisText: { fontSize: 15, color: '#e05555' },
  versiyon: { fontSize: 11, color: C.textDim, paddingHorizontal: 24, paddingTop: 8, letterSpacing: 2 },
});