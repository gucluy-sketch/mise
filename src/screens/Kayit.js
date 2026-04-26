import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { C } from '../theme';
import { supabase } from '../supabase';

export default function Kayit({ onGirisGec, onKayitBasarili }) {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreTekrar, setSifreTekrar] = useState('');
  const [ad, setAd] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');
  const [basarili, setBasarili] = useState(false);

  const kayitOl = async () => {
    if (!email || !sifre || !ad) { setHata('Tüm alanları doldur.'); return; }
    if (sifre !== sifreTekrar) { setHata('Şifreler eşleşmiyor.'); return; }
    if (sifre.length < 6) { setHata('Şifre en az 6 karakter olmalı.'); return; }
    setYukleniyor(true);
    setHata('');
    const { error } = await supabase.auth.signUp({
      email,
      password: sifre,
      options: { data: { ad } },
    });
    if (error) { setHata('Kayıt başarısız: ' + error.message); setYukleniyor(false); return; }
    setBasarili(true);
    setYukleniyor(false);
  };

  if (basarili) {
    return (
      <View style={[s.root, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }]}>
        <Text style={s.logo}>mise</Text>
        <View style={s.basariliKutu}>
          <Text style={s.basariliBaslik}>Kayıt başarılı!</Text>
          <Text style={s.basariliMetin}>
            E-posta adresine bir doğrulama linki gönderdik. Linke tıkladıktan sonra giriş yapabilirsin.
          </Text>
          <TouchableOpacity style={s.btn} onPress={onGirisGec}>
            <Text style={s.btnText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={s.icerik}>
        <Text style={s.logo}>mise</Text>
        <Text style={s.logoAlt}>her şey yerli yerinde</Text>

        <View style={s.form}>
          <Text style={s.baslik}>Kayıt Ol</Text>

          <TextInput
            style={s.input}
            placeholder="Adın"
            placeholderTextColor={C.textDim}
            value={ad}
            onChangeText={setAd}
          />
          <TextInput
            style={s.input}
            placeholder="E-posta"
            placeholderTextColor={C.textDim}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={s.input}
            placeholder="Şifre"
            placeholderTextColor={C.textDim}
            value={sifre}
            onChangeText={setSifre}
            secureTextEntry
          />
          <TextInput
            style={s.input}
            placeholder="Şifre tekrar"
            placeholderTextColor={C.textDim}
            value={sifreTekrar}
            onChangeText={setSifreTekrar}
            secureTextEntry
          />

          {hata ? <Text style={s.hata}>{hata}</Text> : null}

          <TouchableOpacity style={s.btn} onPress={kayitOl} disabled={yukleniyor}>
            {yukleniyor
              ? <ActivityIndicator color={C.bg} />
              : <Text style={s.btnText}>Kayıt Ol</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity style={s.linkBtn} onPress={onGirisGec}>
            <Text style={s.linkText}>Zaten hesabın var mı? <Text style={s.linkVurgu}>Giriş yap</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  icerik: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  logo: { fontSize: 48, fontWeight: '300', color: C.text, letterSpacing: 10, fontStyle: 'italic', textAlign: 'center', marginBottom: 4 },
  logoAlt: { fontSize: 11, color: C.accentDim, letterSpacing: 4, textTransform: 'uppercase', textAlign: 'center', marginBottom: 48 },
  form: { backgroundColor: C.bg2, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: C.border },
  baslik: { fontSize: 20, fontWeight: '300', color: C.text, marginBottom: 24, fontStyle: 'italic' },
  input: { backgroundColor: C.bg3, borderRadius: 10, padding: 14, color: C.text, fontSize: 15, borderWidth: 1, borderColor: C.border, marginBottom: 12 },
  hata: { fontSize: 13, color: '#e05555', marginBottom: 12 },
  btn: { backgroundColor: C.accent, borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 4 },
  btnText: { fontSize: 15, fontWeight: '600', color: C.bg },
  linkBtn: { marginTop: 16, alignItems: 'center' },
  linkText: { fontSize: 14, color: C.textMuted },
  linkVurgu: { color: C.accent },
  basariliKutu: { backgroundColor: C.bg2, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: C.border, width: '100%' },
  basariliBaslik: { fontSize: 20, color: C.accent, fontStyle: 'italic', marginBottom: 12 },
  basariliMetin: { fontSize: 14, color: C.textMuted, lineHeight: 22, marginBottom: 24 },
});