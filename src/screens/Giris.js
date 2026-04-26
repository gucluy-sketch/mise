import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { C } from '../theme';
import { supabase } from '../supabase';

export default function Giris({ onKayitGec, onGirisBasarili }) {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  const girisYap = async () => {
    if (!email || !sifre) { setHata('E-posta ve şifre gerekli.'); return; }
    setYukleniyor(true);
    setHata('');
    const { error } = await supabase.auth.signInWithPassword({ email, password: sifre });
    if (error) { setHata('E-posta veya şifre hatalı.'); setYukleniyor(false); return; }
    onGirisBasarili();
  };

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={s.icerik}>
        <Text style={s.logo}>mise</Text>
        <Text style={s.logoAlt}>her şey yerli yerinde</Text>

        <View style={s.form}>
          <Text style={s.baslik}>Giriş Yap</Text>

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

          {hata ? <Text style={s.hata}>{hata}</Text> : null}

          <TouchableOpacity style={s.btn} onPress={girisYap} disabled={yukleniyor}>
            {yukleniyor
              ? <ActivityIndicator color={C.bg} />
              : <Text style={s.btnText}>Giriş Yap</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity style={s.linkBtn} onPress={onKayitGec}>
            <Text style={s.linkText}>Hesabın yok mu? <Text style={s.linkVurgu}>Kayıt ol</Text></Text>
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
});