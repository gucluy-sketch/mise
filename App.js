import { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { TARIFLER } from './src/data/tarifler';
import { C } from './src/theme';
import AnaSayfa from './src/screens/AnaSayfa';
import TarifDetay from './src/screens/TarifDetay';
import OlcuTablosu from './src/screens/OlcuTablosu';

export default function App() {
  const [ekran, setEkran] = useState('ana');
  const [secilenTarif, setSecilenTarif] = useState(null);

  const tarifAc = (t) => { setSecilenTarif(t); setEkran('tarif'); };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      {ekran === 'ana'   && <AnaSayfa tarifler={TARIFLER} onTarif={tarifAc} onOlcu={() => setEkran('olcu')} />}
      {ekran === 'tarif' && <TarifDetay tarif={secilenTarif} onGeri={() => setEkran('ana')} />}
      {ekran === 'olcu'  && <OlcuTablosu onGeri={() => setEkran('ana')} />}
    </SafeAreaView>
  );
}