import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { C } from '../theme';

export default function AnaSayfa({ tarifler, temelBilgiler, tarih, onTarif, onTemel, onTarih, onMenu }) {

  // Her kategoriden rastgele 1 tane seç
  const gunTarifi = tarifler[Math.floor(Math.random() * tarifler.length)];
  const gunBilgi = temelBilgiler[Math.floor(Math.random() * temelBilgiler.length)];
  const gunTarih = tarih[Math.floor(Math.random() * tarih.length)];

  return (
    <View style={{ flex: 1 }}>

      {/* Üst bar */}
      <View style={s.topBar}>
        <View>
          <Text style={s.logo}>mise</Text>
          <Text style={s.logoAlt}>her şey yerli yerinde</Text>
        </View>
        <TouchableOpacity style={s.menuBtn} onPress={onMenu}>
          <View style={s.menuLine} />
          <View style={s.menuLine} />
          <View style={s.menuLine} />
        </TouchableOpacity>
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>

        {/* GÜNÜN TARİFİ */}
        <Text style={s.bolumBaslik}>günün tarifi</Text>
        <TouchableOpacity style={s.buyukKart} onPress={() => onTarif(gunTarifi)}>
          <Image source={{ uri: gunTarifi.gorsel }} style={s.buyukKartImg} />
          <View style={s.buyukKartOverlay} />
          <View style={s.buyukKartEtiket}>
            <Text style={s.etiketText}>TARİF</Text>
          </View>
          <View style={s.buyukKartAlt}>
            <Text style={s.buyukKartMutfak}>{gunTarifi.mutfak}</Text>
            <Text style={s.buyukKartIsim}>{gunTarifi.isim}</Text>
            <Text style={s.buyukKartMeta}>{gunTarifi.sure} · {gunTarifi.zorluk}</Text>
          </View>
        </TouchableOpacity>

        {/* GÜNÜN BİLGİSİ */}
        <Text style={s.bolumBaslik}>bugün öğren</Text>
        <TouchableOpacity style={s.ortaKart} onPress={() => onTemel(gunBilgi)}>
          <Image source={{ uri: gunBilgi.gorsel }} style={s.ortaKartImg} />
          <View style={s.ortaKartOverlay} />
          <View style={s.ortaKartEtiket}>
            <Text style={s.etiketText}>TEMEL BİLGİ</Text>
          </View>
          <View style={s.ortaKartAlt}>
            <Text style={s.ortaKartKategori}>{gunBilgi.kategori}</Text>
            <Text style={s.ortaKartBaslik}>{gunBilgi.baslik}</Text>
            <Text style={s.ortaKartOzet} numberOfLines={2}>{gunBilgi.ozet}</Text>
          </View>
        </TouchableOpacity>

        {/* TARİH */}
        <Text style={s.bolumBaslik}>yemeğin tarihi</Text>
        <TouchableOpacity style={s.ortaKart} onPress={() => onTarih(gunTarih)}>
          <Image source={{ uri: gunTarih.gorsel }} style={s.ortaKartImg} />
          <View style={s.ortaKartOverlay} />
          <View style={[s.ortaKartEtiket, { backgroundColor: C.accentDim }]}>
            <Text style={s.etiketText}>TARİH</Text>
          </View>
          <View style={s.ortaKartAlt}>
            <Text style={s.ortaKartKategori}>{gunTarih.kategori}</Text>
            <Text style={s.ortaKartBaslik}>{gunTarih.baslik}</Text>
            <Text style={s.ortaKartOzet} numberOfLines={2}>{gunTarih.ozet}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },

  // Top bar
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 48, paddingBottom: 20, backgroundColor: C.bg },
  logo: { fontSize: 32, fontWeight: '300', color: C.text, letterSpacing: 6, fontStyle: 'italic' },
  logoAlt: { fontSize: 10, color: C.accentDim, letterSpacing: 3, marginTop: 2, textTransform: 'uppercase' },
  menuBtn: { padding: 8, gap: 5, justifyContent: 'center' },
  menuLine: { width: 22, height: 1.5, backgroundColor: C.accent, marginVertical: 2 },

  // Bölüm başlığı
  bolumBaslik: { fontSize: 11, color: C.accentDim, letterSpacing: 4, textTransform: 'uppercase', paddingHorizontal: 24, marginBottom: 12, marginTop: 8 },

  // Büyük kart (tarif)
  buyukKart: { marginHorizontal: 24, height: 260, borderRadius: 16, overflow: 'hidden', marginBottom: 32 },
  buyukKartImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  buyukKartOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  buyukKartEtiket: { position: 'absolute', top: 16, left: 16, backgroundColor: C.accent, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  etiketText: { fontSize: 9, color: C.bg, fontWeight: '700', letterSpacing: 2 },
  buyukKartAlt: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  buyukKartMutfak: { fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 },
  buyukKartIsim: { fontSize: 24, fontWeight: '300', color: C.text, fontStyle: 'italic', marginBottom: 6 },
  buyukKartMeta: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },

  // Orta kart (bilgi + tarih)
  ortaKart: { marginHorizontal: 24, height: 200, borderRadius: 14, overflow: 'hidden', marginBottom: 32 },
  ortaKartImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  ortaKartOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  ortaKartEtiket: { position: 'absolute', top: 14, left: 14, backgroundColor: C.accent, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  ortaKartAlt: { position: 'absolute', bottom: 18, left: 18, right: 18 },
  ortaKartKategori: { fontSize: 10, color: C.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  ortaKartBaslik: { fontSize: 18, fontWeight: '300', color: C.text, fontStyle: 'italic', marginBottom: 6 },
  ortaKartOzet: { fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 18 },
});