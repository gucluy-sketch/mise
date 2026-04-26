import { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import * as Linking from 'expo-linking';
import { C } from './src/theme';
import { supabase } from './src/supabase';
import { getTarifler, getTemelBilgiler, getTarih, getMalzemeler } from './src/api';

import AnaSayfa from './src/screens/AnaSayfa';
import TarifDetay from './src/screens/TarifDetay';
import MakaleDetay from './src/screens/MakaleDetay';
import ListeEkrani from './src/screens/ListeEkrani';
import TemelBilgiler from './src/screens/TemelBilgiler';
import OlcuTablosu from './src/screens/OlcuTablosu';
import Menu from './src/screens/Menu';
import Giris from './src/screens/Giris';
import Kayit from './src/screens/Kayit';
import Abonelik from './src/screens/Abonelik';

export default function App() {
  const [ekran, setEkran] = useState('ana');
  const [authEkran, setAuthEkran] = useState('giris');
  const [menuAcik, setMenuAcik] = useState(false);
  const [kullanici, setKullanici] = useState(null);
  const [authYukleniyor, setAuthYukleniyor] = useState(true);
  const [veriYukleniyor, setVeriYukleniyor] = useState(true);
  const [secilenTarif, setSecilenTarif] = useState(null);
  const [secilenMakale, setSecilenMakale] = useState(null);
  const [makaleTip, setMakaleTip] = useState(null);
  const [tarifler, setTarifler] = useState([]);
  const [temelBilgiler, setTemelBilgiler] = useState([]);
  const [tarih, setTarih] = useState([]);
  const [malzemeler, setMalzemeler] = useState([]);

  // Deep link dinle
  useEffect(() => {
    const handleURL = async ({ url }) => {
      if (url && url.includes('access_token')) {
        const params = new URLSearchParams(url.split('#')[1]);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        if (accessToken && refreshToken) {
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        }
      }
    };

    Linking.getInitialURL().then(url => { if (url) handleURL({ url }); });
    const sub = Linking.addEventListener('url', handleURL);
    return () => sub.remove();
  }, []);

  // Auth durumunu dinle
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setKullanici(session?.user ?? null);
      setAuthYukleniyor(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setKullanici(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Veri yükle
  useEffect(() => {
    const veriYukle = async () => {
      const [t, tb, ta, m] = await Promise.all([
        getTarifler(), getTemelBilgiler(), getTarih(), getMalzemeler(),
      ]);
      setTarifler(t);
      setTemelBilgiler(tb);
      setTarih(ta);
      setMalzemeler(m);
      setVeriYukleniyor(false);
    };
    veriYukle();
  }, []);

  const navigate = (hedef) => { setMenuAcik(false); setEkran(hedef); };
  const tarifAc = (t) => { setSecilenTarif(t); setEkran('tarif'); };
  const temelAc = (m) => { setSecilenMakale(m); setMakaleTip('temel'); setEkran('makale'); };
  const tarihAc = (m) => { setSecilenMakale(m); setMakaleTip('tarih'); setEkran('makale'); };
  const geri = () => setEkran('ana');
  const cikisYap = async () => { await supabase.auth.signOut(); setEkran('ana'); };

  if (authYukleniyor || veriYukleniyor) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={C.accent} size="large" />
      </SafeAreaView>
    );
  }

  if (!kullanici) {
    if (authEkran === 'giris') {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
          <Giris onKayitGec={() => setAuthEkran('kayit')} onGirisBasarili={() => setAuthEkran('giris')} />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <Kayit onGirisGec={() => setAuthEkran('giris')} onKayitBasarili={() => setAuthEkran('giris')} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      {ekran === 'ana' && (
        <AnaSayfa
          tarifler={tarifler}
          temelBilgiler={temelBilgiler}
          tarih={tarih}
          onTarif={tarifAc}
          onTemel={temelAc}
          onTarih={tarihAc}
          onMenu={() => setMenuAcik(true)}
        />
      )}
      {ekran === 'tarif' && <TarifDetay tarif={secilenTarif} onGeri={geri} />}
      {ekran === 'makale' && <MakaleDetay makale={secilenMakale} tip={makaleTip} onGeri={geri} />}
      {ekran === 'tarifler' && <ListeEkrani baslik="Tarifler" veriler={tarifler} onItem={tarifAc} onGeri={geri} />}
      {ekran === 'temel' && <TemelBilgiler temelBilgiler={temelBilgiler} onItem={temelAc} onGeri={geri} />}
      {ekran === 'tarih' && <ListeEkrani baslik="Yemeğin Tarihi" veriler={tarih} onItem={tarihAc} onGeri={geri} />}
      {ekran === 'olcu' && <OlcuTablosu malzemeler={malzemeler} onGeri={geri} />}
      {ekran === 'abonelik' && <Abonelik kullanici={kullanici} onGeri={geri} />}
      {menuAcik && (
        <Menu
          aktif={ekran}
          kullanici={kullanici}
          onNavigate={navigate}
          onCikis={cikisYap}
          onKapat={() => setMenuAcik(false)}
        />
      )}
    </SafeAreaView>
  );
}