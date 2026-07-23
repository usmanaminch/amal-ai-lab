# v10 Fix

This patch fixes the likely issue from the screenshot:

- Vercel returned a plain text error page instead of JSON.
- The frontend now handles non-JSON errors cleanly.
- The backend function max duration is increased to 300 seconds.
- Week 1–5 image generations now run in parallel instead of one after another.

After pushing this, Vercel should redeploy automatically.

If it still fails, open:

Vercel → amal-ai-lab → Logs

and copy the newest function error.
