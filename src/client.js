import { createClient } from '@supabase/supabase-js';

const URL = 'https://inwvioubawjxwcbfcnhs.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlud3Zpb3ViYXdqeHdjYmZjbmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3Mzg2NTcsImV4cCI6MjAzOTMxNDY1N30.Hydm0eyZfNT6upLXmSZyh9b7vXM6UTZLv3PsDN9WlNk';

export const supabase = createClient(URL, API_KEY);