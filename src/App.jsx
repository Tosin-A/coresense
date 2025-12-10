import React from "react";

export default function App(){
  return (
    <div style={{fontFamily:'Inter,system-ui,-apple-system',padding:'36px',maxWidth:920,margin:'0 auto'}}>
      <header style={{marginBottom:28}}>
        <h1 style={{fontSize:36,margin:0}}>CoreSense — AI life coach for your health & habits</h1>
        <p style={{color:'#555',marginTop:8}}>Personalised weekly insights from your sleep, steps and habits — privacy-first.</p>
      </header>

      <section style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:20}}>
        <div style={{padding:16,boxShadow:'0 6px 18px rgba(20,20,40,0.06)',borderRadius:12}}>
          <strong>Real Data</strong>
          <div style={{color:'#666',marginTop:8}}>Connect Apple Health & wearables to surface honest trends.</div>
        </div>
        <div style={{padding:16,boxShadow:'0 6px 18px rgba(20,20,40,0.06)',borderRadius:12}}>
          <strong>Personal Coaching</strong>
          <div style={{color:'#666',marginTop:8}}>AI suggestions tailored to your week and goals.</div>
        </div>
        <div style={{padding:16,boxShadow:'0 6px 18px rgba(20,20,40,0.06)',borderRadius:12}}>
          <strong>Privacy First</strong>
          <div style={{color:'#666',marginTop:8}}>Data stays private — opt-in syncing to cloud only.</div>
        </div>
      </section>

      <section style={{marginBottom:28}}>
        <h3>Join the waitlist</h3>
        <p style={{color:'#666',marginTop:6}}>Sign up to get early access and a chance to reserve your username.</p>

        {/* === Formspree example - replace FORM_ID with your Formspree ID === */}
        <form
          action="https://formspree.io/f/https://formspree.io/f/manrpqwb"
          method="POST"
          style={{display:'flex',gap:8,marginTop:12}}
        >
          <input name="name" placeholder="Your name (optional)" style={{flex:1,padding:12,borderRadius:8,border:'1px solid #e6e9ef'}} />
          <input name="email" type="email" placeholder="Email" required style={{flex:1,padding:12,borderRadius:8,border:'1px solid #e6e9ef'}} />
          <input type="hidden" name="source" value="landing_waitlist" />
          <button type="submit" style={{padding:'12px 18px',borderRadius:8,background:'#111',color:'#fff'}}>Get early access</button>
        </form>

        <p style={{color:'#999',fontSize:13,marginTop:10}}>Expect a confirmation email — we'll ask a quick one-question survey after signup.</p>
      </section>

      <section style={{marginTop:8}}>
        <h4>Quick tests</h4>
        <ol>
          <li><strong>Fake door:</strong> Button above leads to survey after signup (ask which feature they'd use).</li>
          <li><strong>Pre-order CTA:</strong> Offer "Reserve username" via a second button on post-signup page.</li>
          <li><strong>Interview ask:</strong> When someone signs up, follow up asking for a 15-min interview.</li>
        </ol>
      </section>

      <footer style={{marginTop:36,color:'#888',fontSize:13}}>
        <div>• Join <strong>the waitlist</strong> • Built by Tosin</div>
      </footer>
    </div>
  );
}