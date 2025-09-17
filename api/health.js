export default async function handler(req, res) {
  try {
    const details = {
      method: req.method,
      hasEnv: {
        SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
        SUPABASE_ANON_KEY: Boolean(process.env.SUPABASE_ANON_KEY),
        SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      },
      timestamp: new Date().toISOString(),
    };

    res.status(200).json({ ok: true, ...details });
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message || 'unknown error' });
  }
}

