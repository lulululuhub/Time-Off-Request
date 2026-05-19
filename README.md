[UICU_PTO_Flyer.html](https://github.com/user-attachments/files/28026199/UICU_PTO_Flyer.html)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>UICU PTO Tracker — Flyer</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  :root{
    --green:#2d6a22;--green-light:#4a8c3f;--green-pale:#eaf5e6;
    --gold:#c8a84b;--gold-light:#f5e9c8;
    --ink:#1a1a14;--muted:#6b6a60;--white:#fefefe;
    --surface:#f7f6f1;
  }
  body{
    font-family:'DM Sans',sans-serif;
    background:#e8e6df;
    display:flex;align-items:center;justify-content:center;
    min-height:100vh;padding:40px 20px;
  }
  .flyer{
    width:680px;
    background:var(--white);
    border-radius:4px;
    overflow:hidden;
    box-shadow:0 8px 60px rgba(0,0,0,0.18),0 2px 12px rgba(0,0,0,0.1);
    position:relative;
  }

  /* ── HEADER ── */
  .header{
    background:var(--green);
    padding:44px 48px 36px;
    position:relative;
    overflow:hidden;
  }
  .header::before{
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse at 80% 20%,rgba(255,255,255,0.08) 0%,transparent 60%),
               radial-gradient(ellipse at 20% 80%,rgba(0,0,0,0.15) 0%,transparent 50%);
  }
  .header-inner{position:relative;z-index:1}
  .logo-row{display:flex;align-items:center;gap:12px;margin-bottom:24px}
  .logo-badge{
    width:42px;height:42px;border-radius:10px;
    background:rgba(255,255,255,0.15);
    display:flex;align-items:center;justify-content:center;
    border:1px solid rgba(255,255,255,0.2);
  }
  .logo-badge svg{width:22px;height:22px}
  .logo-text{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:rgba(255,255,255,0.7);letter-spacing:2px;text-transform:uppercase}
  .header-tag{
    display:inline-block;background:var(--gold);color:var(--ink);
    font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;
    padding:5px 12px;border-radius:20px;margin-bottom:14px;
  }
  .header-title{
    font-family:'DM Serif Display',serif;
    font-size:46px;line-height:1.05;color:#fff;
    margin-bottom:6px;
    letter-spacing:-1px;
  }
  .header-title em{
    font-style:italic;color:var(--gold);
  }
  .header-sub{
    font-size:15px;color:rgba(255,255,255,0.72);
    font-weight:300;line-height:1.5;
    max-width:460px;
  }

  /* ── DECORATIVE STRIP ── */
  .strip{
    height:6px;
    background:linear-gradient(90deg,var(--gold) 0%,#e8c56a 40%,var(--gold) 100%);
  }

  /* ── BODY ── */
  .body{padding:40px 48px}

  .intro{
    font-size:15.5px;line-height:1.7;color:var(--ink);
    margin-bottom:36px;
    padding-bottom:32px;
    border-bottom:1px solid #e8e5dc;
  }
  .intro strong{color:var(--green)}

  /* ── FEATURES GRID ── */
  .features-title{
    font-family:'DM Serif Display',serif;
    font-size:22px;color:var(--ink);
    margin-bottom:20px;
    letter-spacing:-0.3px;
  }
  .features-grid{
    display:grid;grid-template-columns:1fr 1fr;
    gap:14px;margin-bottom:36px;
  }
  .feature{
    background:var(--surface);border-radius:10px;
    padding:16px 18px;
    border:1px solid #e4e1d8;
    position:relative;overflow:hidden;
  }
  .feature::before{
    content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:var(--green);border-radius:3px 3px 0 0;
  }
  .feature-icon{
    width:34px;height:34px;border-radius:8px;
    background:var(--green-pale);
    display:flex;align-items:center;justify-content:center;
    margin-bottom:10px;
  }
  .feature-icon svg{width:17px;height:17px;stroke:var(--green)}
  .feature-name{font-size:13px;font-weight:600;color:var(--ink);margin-bottom:5px}
  .feature-desc{font-size:12.5px;color:var(--muted);line-height:1.5}

  /* ── ACCRUAL BOX ── */
  .accrual-box{
    background:var(--green);border-radius:12px;
    padding:22px 24px;margin-bottom:32px;
    display:grid;grid-template-columns:repeat(3,1fr);gap:0;
    position:relative;overflow:hidden;
  }
  .accrual-box::after{
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse at 90% 10%,rgba(255,255,255,0.07),transparent 60%);
  }
  .accrual-item{
    text-align:center;padding:8px 12px;
    border-right:1px solid rgba(255,255,255,0.15);
    position:relative;z-index:1;
  }
  .accrual-item:last-child{border-right:none}
  .accrual-val{
    font-family:'DM Mono',monospace;
    font-size:26px;font-weight:500;color:var(--gold);
    letter-spacing:-0.5px;margin-bottom:4px;
  }
  .accrual-label{font-size:11px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:.8px}

  /* ── HOW IT WORKS ── */
  .steps-title{
    font-family:'DM Serif Display',serif;
    font-size:22px;color:var(--ink);margin-bottom:18px;
  }
  .steps{display:flex;flex-direction:column;gap:12px;margin-bottom:36px}
  .step{display:flex;align-items:flex-start;gap:14px}
  .step-num{
    width:28px;height:28px;border-radius:50%;
    background:var(--green);color:#fff;
    font-size:12px;font-weight:600;
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;margin-top:1px;
  }
  .step-text{font-size:13.5px;color:var(--ink);line-height:1.55}
  .step-text strong{color:var(--green)}

  /* ── LEAVE TYPES ── */
  .leave-row{
    display:flex;gap:8px;flex-wrap:wrap;
    margin-bottom:36px;
  }
  .leave-tag{
    padding:6px 14px;border-radius:20px;
    font-size:12.5px;font-weight:500;
  }
  .leave-tag.green{background:var(--green-pale);color:var(--green);border:1px solid #b8ddb5}
  .leave-tag.blue{background:#eaf1fb;color:#1a4d7c;border:1px solid #b5cfe8}
  .leave-tag.gray{background:#f0efe9;color:#6b6a60;border:1px solid #e0deda}
  .leave-tag.amber{background:#fef8f0;color:#b5651d;border:1px solid #f5d5b0}

  /* ── CTA ── */
  .cta{
    background:linear-gradient(135deg,var(--green-pale) 0%,#d5eed0 100%);
    border-radius:12px;padding:24px 28px;
    border:1px solid #b8ddb5;
    display:flex;align-items:center;gap:20px;
    margin-bottom:32px;
  }
  .cta-icon{
    width:52px;height:52px;border-radius:12px;
    background:var(--green);flex-shrink:0;
    display:flex;align-items:center;justify-content:center;
  }
  .cta-icon svg{width:26px;height:26px;stroke:#fff}
  .cta-text{}
  .cta-label{font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:var(--green);margin-bottom:5px}
  .cta-url{
    font-family:'DM Mono',monospace;
    font-size:13px;color:var(--ink);word-break:break-all;line-height:1.5;
  }
  .cta-note{font-size:12px;color:var(--muted);margin-top:4px}

  /* ── FOOTER ── */
  .footer{
    background:var(--ink);
    padding:20px 48px;
    display:flex;align-items:center;justify-content:space-between;
  }
  .footer-left{font-size:12px;color:rgba(255,255,255,0.5)}
  .footer-left strong{color:rgba(255,255,255,0.8);display:block;font-size:13px;margin-bottom:2px}
  .footer-right{
    font-family:'DM Mono',monospace;
    font-size:11px;color:rgba(255,255,255,0.35);
    letter-spacing:.5px;
  }

  @media print{
    body{background:#fff;padding:0}
    .flyer{box-shadow:none;border-radius:0;width:100%}
  }
</style>
</head>
<body>
<div class="flyer">

  <!-- HEADER -->
  <div class="header">
    <div class="header-inner">
      <div class="logo-row">
        <div class="logo-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M3 9h18M9 3v3M15 3v3"/>
          </svg>
        </div>
        <span class="logo-text">UICUSA Human Resources</span>
      </div>
      <div class="header-tag">✦ Now Live</div>
      <div class="header-title">Your Time Off,<br><em>Simplified.</em></div>
      <div class="header-sub">Introducing the UICUSA PTO Tracker — a smart, easy-to-use system for managing your paid time off, viewing balances, and submitting requests online.</div>
    </div>
  </div>
  <div class="strip"></div>

  <!-- BODY -->
  <div class="body">

    <div class="intro">
      We're excited to launch the <strong>UICUSA PTO Tracker</strong> — built specifically for our team. No more spreadsheets, no more guessing your balance. Log in with your <strong>Google Workspace account</strong> and everything is there: your balance, your history, your team's calendar, all in one place.
    </div>

    <!-- ACCRUAL NUMBERS -->
    <div class="accrual-box">
      <div class="accrual-item">
        <div class="accrual-val">120h</div>
        <div class="accrual-label">Annual · 0–4 Years</div>
      </div>
      <div class="accrual-item">
        <div class="accrual-val">160h</div>
        <div class="accrual-label">Annual · 5+ Years</div>
      </div>
      <div class="accrual-item">
        <div class="accrual-val">×1.5</div>
        <div class="accrual-label">Accrual Cap</div>
      </div>
    </div>

    <!-- FEATURES -->
    <div class="features-title">What You Can Do</div>
    <div class="features-grid">
      <div class="feature">
        <div class="feature-icon">
          <svg viewBox="0 0 16 16" fill="none" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
        </div>
        <div class="feature-name">Real-Time Balance</div>
        <div class="feature-desc">See your available hours, accrued total, rollover, and pending requests — updated live every time you log in.</div>
      </div>
      <div class="feature">
        <div class="feature-icon">
          <svg viewBox="0 0 16 16" fill="none" stroke-width="1.5"><rect x="1" y="3" width="14" height="12" rx="2"/><path d="M1 7h14M5 1v4M11 1v4"/></svg>
        </div>
        <div class="feature-name">Future Accrual Schedule</div>
        <div class="feature-desc">View your projected balance for every upcoming pay period so you can plan time off with confidence.</div>
      </div>
      <div class="feature">
        <div class="feature-icon">
          <svg viewBox="0 0 16 16" fill="none" stroke-width="1.5"><path d="M8 2v4l3 3"/><circle cx="8" cy="8" r="6"/></svg>
        </div>
        <div class="feature-name">Submit Requests Online</div>
        <div class="feature-desc">Request time off in seconds. Your manager receives an instant email with one-click Approve or Deny buttons.</div>
      </div>
      <div class="feature">
        <div class="feature-icon">
          <svg viewBox="0 0 16 16" fill="none" stroke-width="1.5"><circle cx="6" cy="5" r="3"/><path d="M1 14c0-3 2-5 5-5h0c3 0 5 2 5 5"/><circle cx="12" cy="5" r="2"/><path d="M14 13c0-2-1-3-2-3"/></svg>
        </div>
        <div class="feature-name">Team Calendar</div>
        <div class="feature-desc">See who's off and when, including all company holidays — so you can coordinate with your team easily.</div>
      </div>
    </div>

    <!-- LEAVE TYPES -->
    <div class="features-title" style="font-size:17px;margin-bottom:12px">4 Types of Leave Tracked</div>
    <div class="leave-row">
      <span class="leave-tag green">✓ Paid Time Off</span>
      <span class="leave-tag blue">Unpaid Time Off</span>
      <span class="leave-tag gray">Bereavement</span>
      <span class="leave-tag amber">Other</span>
    </div>
    <p style="font-size:12.5px;color:var(--muted);margin-bottom:32px;line-height:1.6">
      Unpaid Time Off, Bereavement, and Other leave are <strong style="color:var(--ink)">recorded but do not deduct</strong> from your PTO balance. Only Paid Time Off affects your available hours.
    </p>

    <!-- HOW IT WORKS -->
    <div class="steps-title">Getting Started</div>
    <div class="steps">
      <div class="step"><div class="step-num">1</div><div class="step-text"><strong>Open the link below</strong> in your browser — sign in automatically with your @uicusa.com Google account. No separate password needed.</div></div>
      <div class="step"><div class="step-num">2</div><div class="step-text"><strong>Check your balance</strong> on the My PTO tab. You'll see your accrued hours, rollover, and a full projection of future accruals.</div></div>
      <div class="step"><div class="step-num">3</div><div class="step-text"><strong>Submit a time-off request</strong> — choose your dates, enter hours, and hit Submit. Your manager gets an email instantly and you'll be notified when it's approved or denied.</div></div>
    </div>

    <!-- CTA -->
    <div class="cta">
      <div class="cta-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      </div>
      <div class="cta-text">
        <div class="cta-label">Access the PTO Tracker</div>
        <div class="cta-url"><a href="https://script.google.com/a/macros/uicusa.com/s/AKfycbyttufXXUwhRirargI6t7hr6E0WnWDM9Ua4-dWD7MliH2l7axbLyFIHuUcqBx9zuaipvA/exec" style="color:var(--ink);word-break:break-all">https://script.google.com/a/macros/uicusa.com/s/<wbr>AKfycbyttufXXUwhRirargI6t7hr6E0WnWDM9Ua4-dWD7MliH2l7axbLyFIHuUcqBx9zuaipvA/exec</a></div>
        <div class="cta-note">Sign in with your @uicusa.com Google account · No setup required</div>
      </div>
    </div>

    <p style="font-size:12.5px;color:var(--muted);line-height:1.7;margin-bottom:0">
      Questions? Contact <strong style="color:var(--ink)">UICUSA HR</strong> at <strong style="color:var(--ink)">lchao@uicusa.com</strong> · Accruals process semi-monthly on the <strong style="color:var(--ink)">15th and last day</strong> of each month · Minimum request is <strong style="color:var(--ink)">4 hours</strong>
    </p>

  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-left">
      <strong>UICUSA Human Resources</strong>
      2901 Bayview Drive, Fremont, CA 94538 · Tel: 510-438-6799
    </div>
    <div class="footer-right">PTO TRACKER · 2026</div>
  </div>

</div>
</body>
</html>
