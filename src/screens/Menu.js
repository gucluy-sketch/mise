import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { C } from '../theme';

const MENU_ITEMS = [
  { id: 'ana', label: 'Ana Sayfa', icon: '⌂' },
  { id: 'tarifler', label: 'Tarifler', icon: '◎' },
  { id: 'temel', label: 'Temel Bilgiler', icon: '◈' },
  { id: 'tarih', label: 'Yemeğin Tarihi', icon: '◉' },
  { id: 'olcu', label: 'Altın Standart Ölçüler', icon: '◆' },
];

export default function Menu({ aktif, onNavigate, onKapat }) {
  return (
    <View style={s.overlay}>
      <TouchableOpacity style={s.backdrop} onPress={onKapat} />
      <View style={s.panel}>

        <View style={s.header}>
          <Text style={s.logo}>mise</Text>
          <TouchableOpacity onPress={onKapat} style={s.kapatBtn}>
            <Text style={s.kapatText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={s.ayrac} />

        {MENU_ITEMS.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[s.menuItem, aktif === item.id && s.menuItemAktif]}
            onPress={() => { onNavigate(item.id); onKapat(); }}
          >
            <Text style={s.menuIkon}>{item.icon}</Text>
            <Text style={[s.menuLabel, aktif === item.id && s.menuLabelAktif]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={{ flex: 1 }} />
        <Text style={s.versiyon}>mise · v0.1</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, flexDirection: 'row', zIndex: 100 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  panel: { width: 280, backgroundColor: C.bg2, paddingTop: 50, paddingBottom: 40, borderLeftWidth: 1, borderLeftColor: C.border },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 8 },
  logo: { fontSize: 28, fontWeight: '300', color: C.text, letterSpacing: 6, fontStyle: 'italic' },
  kapatBtn: { padding: 8 },
  kapatText: { fontSize: 16, color: C.textMuted },
  ayrac: { height: 1, backgroundColor: C.border, marginHorizontal: 24, marginBottom: 24, marginTop: 8 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 24, gap: 14 },
  menuItemAktif: { backgroundColor: C.bg3 },
  menuIkon: { fontSize: 14, color: C.accentDim, width: 20 },
  menuLabel: { fontSize: 15, color: C.textMuted, fontWeight: '300' },
  menuLabelAktif: { color: C.accent },
  versiyon: { fontSize: 11, color: C.textDim, paddingHorizontal: 24, letterSpacing: 2 },
});