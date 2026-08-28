import {
  ArrowRight,
  Banknote,
  Check,
  CircleDollarSign,
  Gift,
  Landmark,
  LockKeyhole,
  Share2,
  ShieldCheck,
  Sparkles,
  UserPlus,
  WalletCards,
  Zap,
} from "lucide-react";
import {
  Accordion,
  ButtonLink,
  CopyButton,
  Eyebrow,
  SectionHeading,
} from "../components.jsx";
import { earnFaqs } from "../data.js";

const examples = [
  ["1 person", "$0.15", "$0.21"],
  ["5 people", "$0.75", "$1.05"],
  ["10 people", "$1.50", "$2.10"],
  ["25 people", "$3.75", "$5.25"],
  ["50 people", "$7.50", "$10.50"],
];

const earnSteps = [
  [UserPlus, "01", "Sign up and get your link", "Create a free AVONFlow account. Your unique referral link appears instantly."],
  [Share2, "02", "Share with creators", "Send your link to friends, communities or clients who need AI creation tools."],
  [Gift, "03", "They choose a plan", "When an eligible referral buys Basic or Plus, tokens land in your wallet."],
  [Banknote, "04", "Withdraw your earnings", "Convert tokens to USD and request a supported cash-out method."],
];

export function Earn({ openAuth }) {
  return (
    <main className="earn-page">
      <section className="earn-hero">
        <div className="earn-hero__rings" aria-hidden="true"><i /><i /><i /></div>
        <div className="container earn-hero__inner">
          <div className="earn-hero__copy" data-reveal>
            <Eyebrow icon="gift">REFERRAL PROGRAM</Eyebrow>
            <h1>Refer friends.<span>Earn real money.</span></h1>
            <p>Share your AVONFlow referral link. Earn tokens whenever your friends buy an eligible plan. Withdraw as real cash, straight to your account.</p>
            <div><button className="button button--primary button--hero" onClick={() => openAuth("signup")}>Start earning free <ArrowRight size={18} /></button><button className="button button--outline" onClick={() => openAuth("login")}>Go to dashboard</button></div>
            <ul><li><Check size={14} /> Instant rewards</li><li><Check size={14} /> No minimum referrals</li><li><Check size={14} /> Real cash withdrawal</li><li><Check size={14} /> Fraud protected</li></ul>
          </div>
          <div className="earn-hero__card" data-reveal>
            <div className="earn-hero__card-top"><span><WalletCards size={21} /></span><div><small>AVONFLOW WALLET</small><strong>Creator earnings</strong></div><i /></div>
            <p>Available balance</p><h2>$12.42</h2><span>414 tokens</span>
            <div className="earn-hero__graph"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="earn-hero__mini"><div><small>This month</small><strong>+$4.83</strong></div><div><small>Referrals</small><strong>23</strong></div></div>
          </div>
        </div>
      </section>

      <section className="earn-rates section-pad">
        <div className="container">
          <SectionHeading eyebrow="REFERRAL ECONOMICS" title="How much" accent="you earn." description="Every qualifying plan purchase puts money in your wallet immediately." />
          <div className="conversion-card" data-reveal>
            <div><span><CircleDollarSign size={22} /></span><p><small>TOKEN CONVERSION RATE</small><strong>1 token = $0.03 USD</strong><b>Withdraw after 34 tokens.</b></p></div>
            <div><span>1</span><i>token</i><b>=</b><strong>$0.03</strong><i>USD</i></div>
          </div>
          <div className="reward-grid">
            <article data-reveal><div><span><Gift size={21} /></span><small>BASIC PLAN</small></div><p>10-day plan · paid by your referral</p><div className="reward-grid__amount"><strong>5</strong><span>tokens per referral</span><b>$0.15</b><span>in USD per referral</span></div></article>
            <article className="is-featured" data-reveal><div><span><Zap size={21} /></span><small>PLUS PLAN</small><b>HIGHEST REWARD</b></div><p>30-day plan · paid by your referral</p><div className="reward-grid__amount"><strong>7</strong><span>tokens per referral</span><b>$0.21</b><span>in USD per referral</span></div></article>
          </div>
          <div className="earnings-table" data-reveal>
            <div className="earnings-table__head"><div><small>EXAMPLE EARNINGS</small><strong>What different referral counts can earn</strong></div><span>1 token = $0.03</span></div>
            <div className="table-scroll"><table><thead><tr><th>REFERRALS</th><th>BASIC PLAN</th><th>PLUS PLAN</th></tr></thead><tbody>{examples.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
          </div>
        </div>
      </section>

      <section className="earn-process section-pad section-dark">
        <div className="container">
          <SectionHeading eyebrow="SIMPLE BY DEFAULT" title="4 steps to" accent="your first dollar." description="No promo codes to type and no waiting period before eligible rewards appear." />
          <div className="earn-process__grid">
            {earnSteps.map(([Icon, number, title, copy]) => <article key={number} data-reveal><span><Icon size={23} /></span><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="wallet-section section-pad section-deep">
        <div className="container wallet-section__grid">
          <div className="wallet-section__copy">
            <SectionHeading eyebrow="YOUR EARNINGS, VISIBLE" title="A wallet that" accent="keeps the math honest." description="Track every eligible purchase, token credit and withdrawal request from one clear ledger." />
            <div className="referral-link" data-reveal><small>YOUR REFERRAL LINK</small><div><span>avonflow.ai/r/AVON-MAHIR</span><CopyButton value="https://avonflow.ai/r/AVON-MAHIR" /></div></div>
            <ul data-reveal><li><Check size={15} /> Purchase-level reward history</li><li><Check size={15} /> Live token-to-USD conversion</li><li><Check size={15} /> Fraud and duplicate protection</li></ul>
          </div>
          <div className="wallet-mock" data-reveal>
            <div className="wallet-mock__header"><div><span><WalletCards size={21} /></span><p><small>YOUR EARNINGS WALLET</small><strong>Available to withdraw</strong></p></div><b>LIVE</b></div>
            <div className="wallet-balance"><div><small>AVAILABLE TOKENS</small><strong>37 <span>tokens</span></strong></div><div><small>USD VALUE</small><strong>$1.11</strong></div></div>
            <div className="wallet-stats"><div><small>TOTAL REFERRALS</small><strong>7 people</strong></div><div><small>THIS MONTH</small><strong>+17 tokens</strong></div></div>
            <div className="wallet-activity">
              {[['AM', 'Aamir · Plus Plan', '+7 tokens', '+$0.21'], ['FA', 'Fatima · Basic Plan', '+5 tokens', '+$0.15'], ['RA', 'Raza · Basic Plan', '+5 tokens', '+$0.15']].map((row) => <div key={row[1]}><span>{row[0]}</span><p><strong>{row[1]}</strong><small>Reward confirmed</small></p><b>{row[2]}<small>{row[3]}</small></b></div>)}
            </div>
            <button className="button button--primary button--full" onClick={() => openAuth("login")}>Withdraw earnings <ArrowRight size={17} /></button>
            <p className="wallet-minimum"><LockKeyhole size={13} /> Minimum withdrawal: 34 tokens ($1.02)</p>
          </div>
        </div>
      </section>

      <section className="withdrawal section-pad">
        <div className="container">
          <SectionHeading align="center" eyebrow="CASH OUT YOUR WAY" title="Withdraw with" accent="three options." description="Requests are reviewed and processed in the time shown for each method." />
          <div className="withdrawal__grid">
            <article data-reveal><span><Sparkles size={22} /></span><h3>Binance ID</h3><p>Transfer directly with your verified Binance UID.</p><b>Usually within 24 hours</b></article>
            <article data-reveal><span><WalletCards size={22} /></span><h3>Easypaisa</h3><p>Receive funds in your supported mobile wallet.</p><b>Usually within 24 hours</b></article>
            <article data-reveal><span><Landmark size={22} /></span><h3>Bank transfer</h3><p>Direct transfer using your verified account details.</p><b>24–48 business hours</b></article>
          </div>
          <div className="fair-strip" data-reveal><ShieldCheck size={21} /><div><strong>Fair and protected.</strong><span>No self-referrals · One reward per verified user · Purchase-only rewards</span></div></div>
        </div>
      </section>

      <section className="earn-faq section-pad section-dark">
        <div className="container earn-faq__inner">
          <SectionHeading align="center" eyebrow="COMMON QUESTIONS" title="Know before" accent="you share." description="The rules are short because the referral system should be easy to trust." />
          <Accordion items={earnFaqs} />
        </div>
      </section>

      <section className="compact-cta compact-cta--earn">
        <div className="container compact-cta__inner">
          <div data-reveal><Eyebrow icon="gift">YOUR LINK IS WAITING</Eyebrow><h2>Ready to earn? <span>Start today.</span></h2><p>Create your account, copy your referral link and earn on every eligible plan purchase.</p></div>
          <div data-reveal><button className="button button--primary" onClick={() => openAuth("signup")}>Create free account <ArrowRight size={17} /></button><button className="button button--outline" onClick={() => openAuth("login")}>Already have an account?</button></div>
        </div>
      </section>
    </main>
  );
}

