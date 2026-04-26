import { supabase } from './supabase';

// TARİFLER
export const getTarifler = async () => {
  const { data, error } = await supabase
    .from('tarifler')
    .select('*')
    .eq('aktif', true)
    .order('id');
  if (error) { console.error('Tarifler hatası:', error); return []; }
  return data;
};

export const getTarifDetay = async (id) => {
  const [{ data: tarif }, { data: malzemeler }, { data: adimlar }] = await Promise.all([
    supabase.from('tarifler').select('*').eq('id', id).single(),
    supabase.from('tarif_malzemeleri').select('*').eq('tarif_id', id).order('sira'),
    supabase.from('tarif_adimlari').select('*').eq('tarif_id', id).order('sira'),
  ]);
  return {
    ...tarif,
    malzemeler: malzemeler || [],
    adimlar: (adimlar || []).map(a => a.aciklama),
    besin: {
      kalori: tarif?.kalori,
      protein: tarif?.protein,
      karbonhidrat: tarif?.karbonhidrat,
      yag: tarif?.yag,
    },
  };
};

// TEMEL BİLGİLER
export const getTemelBilgiler = async () => {
  const { data, error } = await supabase
    .from('temel_bilgiler')
    .select('*')
    .eq('aktif', true)
    .order('id');
  if (error) { console.error('Temel bilgiler hatası:', error); return []; }
  return data;
};

// TARİH
export const getTarih = async () => {
  const { data, error } = await supabase
    .from('tarih')
    .select('*')
    .eq('aktif', true)
    .order('id');
  if (error) { console.error('Tarih hatası:', error); return []; }
  return data;
};

// MALZEMELER
export const getMalzemeler = async () => {
  const { data, error } = await supabase
    .from('malzemeler')
    .select('*')
    .order('isim');
  if (error) { console.error('Malzemeler hatası:', error); return []; }
  return data;
};