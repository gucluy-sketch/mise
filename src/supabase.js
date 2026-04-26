import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ciglubkexgheqftictmp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zCWW0mW-BGhxrGaDdym_vg_WIh4cRSQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);