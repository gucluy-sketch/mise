import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import Giris from './src/screens/Giris';
import Kayit from './src/screens/Kayit';
import Abonelik from './src/screens/Abonelik';
import Menu from './src/screens/Menu';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['mise://', 'https://mise-app-wheat.vercel.app'],
  config: {
    screens: {
      Ana: '',
      Tarifler: 'tarifler',
      TemelBilgiler: 'temel',
      Tarih: 'tarih',
      TarifDetay: 'tarif/:id',
      Makale: 'makale/:id',
      Olcu: 'olcu',
      Abonelik: 'abonelik',
    },
  },
};

const screenOptions = {
  headerShown: false,
  cardStyle: { flex: 1, overflow: 'scroll' },
};

export default function App() {
  const [kullanici, setKullanici] = useState(null);
  const [authYukleniyor, setAuthYukleniyor] = useState(true);
  const [veriYukleniyor, setVeriYukleniyor] = useState(true);
  const [tarifler, setTarifler] = useState([]);
  const [temelBilgiler, setTemelBilgiler] = useState([]);
  const [tarih, setTarih] = useState([]);
  const [malzemeler, setMalzemeler] = useState([]);

  useEffect(() => {
    const handleURL = async ({ url }) => {
      if (url && url.includes('access_token')) {
        const hashPart = url.split('#')[1] || url.split('?')[1] || '';
        const params = new URLSearchParams(hashPart);
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

  useEffect(() => {
    const yukle = async () => {
      const [t, tb, ta, m] = await Promise.all([
        getTarifler(), getTemelBilgiler(), getTarih(), getMalzemeler(),
      ]);
      setTarifler(t);
      setTemelBilgiler(tb);
      setTarih(ta);
      setMalzemeler(m);
      setVeriYukleniyor(false);
    };
    yukle();
  }, []);

  if (authYukleniyor || veriYukleniyor) {
    return (
      <View style={{ flex: 1, backgroundColor: C.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={C.accent} size="large" />
      </View>
    );
  }

  if (!kullanici) {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Giris">
              {props => <Giris {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Kayit">
              {props => <Kayit {...props} onGirisGec={() => props.navigation.navigate('Giris')} onKayitBasarili={() => props.navigation.navigate('Giris')} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Ana">
            {props => (
              <AnaSayfa
                {...props}
                tarifler={tarifler}
                temelBilgiler={temelBilgiler}
                tarih={tarih}
                onTarif={(t) => props.navigation.navigate('TarifDetay', { tarif: t })}
                onTemel={(m) => props.navigation.navigate('Makale', { makale: m, tip: 'temel' })}
                onTarih={(m) => props.navigation.navigate('Makale', { makale: m, tip: 'tarih' })}
                onMenu={() => props.navigation.navigate('Menu')}
                kullanici={kullanici}
                onCikis={() => supabase.auth.signOut()}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="TarifDetay">
            {props => <TarifDetay {...props} tarif={props.route.params?.tarif} onGeri={() => props.navigation.goBack()} />}
          </Stack.Screen>

          <Stack.Screen name="Makale">
            {props => <MakaleDetay {...props} makale={props.route.params?.makale} tip={props.route.params?.tip} onGeri={() => props.navigation.goBack()} />}
          </Stack.Screen>

          <Stack.Screen name="Tarifler">
            {props => (
              <ListeEkrani
                {...props}
                baslik="Tarifler"
                veriler={tarifler}
                onItem={(t) => props.navigation.navigate('TarifDetay', { tarif: t })}
                onGeri={() => props.navigation.goBack()}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="TemelBilgiler">
            {props => (
              <TemelBilgiler
                {...props}
                temelBilgiler={temelBilgiler}
                onItem={(m) => props.navigation.navigate('Makale', { makale: m, tip: 'temel' })}
                onGeri={() => props.navigation.goBack()}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Tarih">
            {props => (
              <ListeEkrani
                {...props}
                baslik="Yemeğin Tarihi"
                veriler={tarih}
                onItem={(m) => props.navigation.navigate('Makale', { makale: m, tip: 'tarih' })}
                onGeri={() => props.navigation.goBack()}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Olcu">
            {props => <OlcuTablosu {...props} malzemeler={malzemeler} onGeri={() => props.navigation.goBack()} />}
          </Stack.Screen>

          <Stack.Screen name="Abonelik">
            {props => <Abonelik {...props} kullanici={kullanici} onGeri={() => props.navigation.goBack()} />}
          </Stack.Screen>

          <Stack.Screen
            name="Menu"
            options={{ presentation: 'transparentModal', cardStyle: { backgroundColor: 'transparent' } }}
          >
            {props => <Menu {...props} kullanici={kullanici} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}