import { useState, useEffect } from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import { C } from './src/theme';
import { getTarifler, getTemelBilgiler, getTarih, getMalzemeler } from './src/api';

import AnaSayfa from './src/screens/AnaSayfa';
import TarifDetay from './src/screens/TarifDetay';
import MakaleDetay from './src/screens/MakaleDetay';
import ListeEkrani from './src/screens/ListeEkrani';
import TemelBilgiler from './src/screens/TemelBilgiler';
import OlcuTablosu from './src/screens/OlcuTablosu';
import Menu from './src/screens/Menu';

export default function App() {
  const [ekran, setEkran] = useState('ana');
  const [menuAcik, setMenuAcik] = useState(false);
  const [secilenTarif, setSecilenTarif] = useState(null);
  const [secilenMakale, setSecilenMakale] = useState(null);
  const [makaleTip, setMakaleTip] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);

  const [tarifler, setTarifler] = useState([]);
  const [temelBilgiler, setTemelBilgiler] = useState([]);
  const [tarih, setTarih] = useState([]);
  const [malzemeler, setMalzemeler] = useState([]);

  useEffect(() => {
    const veriYukle = async () => {
      const [t, tb, ta, m] = await Promise.all([
        getTarifler(),
        getTemelBilgiler(),
        getTarih(),
        getMalzemeler(),
      ]);
      setTarifler(t);
      setTemelBilgiler(tb);
      setTarih(ta);
      setMalzemeler(m);
      setYukleniyor(false);
    };
    veriYukle();
  }, []);

  const navigate = (hedef) => { setMenuAcik(false); setEkran(hedef); };
  const tarifAc = (t) => { setSecilenTarif(t); setEkran('tarif'); };
  const temelAc = (m) => { setSecilenMakale(m); setMakaleTip('temel'); setEkran('makale'); };
  const tarihAc = (m) => { setSecilenMakale(m); setMakaleTip('tarih'); setEkran('makale'); };
  const geri = () => setEkran('ana');

  if (yukleniyor) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={C.accent} size="large" />
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
      {menuAcik && <Menu aktif={ekran} onNavigate={navigate} onKapat={() => setMenuAcik(false)} />}
    </SafeAreaView>
  );
}