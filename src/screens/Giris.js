import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { C } from '../theme';
import { supabase } from '../supabase';

WebBrowser.maybeCompleteAuthSession();

export default function Giris({ onKayitGec, onGirisBasarili }) {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '481466244478-f8lb2rrnmb4gfcndd30de3248fa0odlj.apps.googleusercontent.com',
    webClientId: '481466244478-cne4lj4hmoequ2v3cp0sv1kshrp0iq1u.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      supabase.auth.signInWithIdToken({
        provider: 'google',
        token: id_token,
      });
    }
  }, [response]);

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

          <TouchableOpacity
            style={s.googleBtn}
            onPress={() => promptAsync()}
            disabled={!request}
          >
            <Text style={s.googleIkon}>G</Text>
            <Text style={s.googleText}>Google ile Giriş Yap</Text>
          </TouchableOpacity>

          <View style={s.ayracRow}>
            <View style={s.ayracCizgi} />
            <Text style={s.ayracText}>veya</Text>
            <View style={s.ayracCizgi} />
          </View>

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
  baslik: { fontSize: 20, fontWeight: '300', color: C.text, marginBottom: 20, fontStyle: 'italic' },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg3, borderRadius: 10, padding: 14, borderWidth: 1, borderColor: C.border, gap: 10, marginBottom: 16 },
  googleIkon: { fontSize: 16, fontWeight: '700', color: '#4285F4' },
  googleText: { fontSize: 15, color: C.text },
  ayracRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
  ayracCizgi: { flex: 1, height: 1, backgroundColor: C.border },
  ayracText: { fontSize: 12, color: C.textDim },
  input: { backgroundColor: C.bg3, borderRadius: 10, padding: 14, color: C.text, fontSize: 15, borderWidth: 1, borderColor: C.border, marginBottom: 12 },
  hata: { fontSize: 13, color: '#e05555', marginBottom: 12 },
  btn: { backgroundColor: C.accent, borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 4 },
  btnText: { fontSize: 15, fontWeight: '600', color: C.bg },
  linkBtn: { marginTop: 16, alignItems: 'center' },
  linkText: { fontSize: 14, color: C.textMuted },
  linkVurgu: { color: C.accent },
});