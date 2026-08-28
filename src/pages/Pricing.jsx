import { useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Headphones,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import {
  Accordion,
  CheckList,
  Eyebrow,
  GalleryRail,
  MicroBadge,
  SectionHeading,
} from "../components.jsx";
import { comparisonRows, pricingFaqs, pricingPlans } from "../data.js";

function PlanCard({ plan, currency, openAuth }) {
  return (
    <article className={`pricing-card pricing-card--${plan.tone}`} data-reveal>
      <div className="pricing-card__topline">
        <div><h2>{plan.name}</h2><p>{plan.eyebrow}</p></div>
        <div className="pricing-card__badges">
          {plan.discount && <span>{plan.discount}</span>}
          <strong>{plan.badge}</strong>
        </div>
      </div>
      <div className="pricing-card__credit">
        <span><Sparkles size={17} /></span>
        <strong>{plan.credits}</strong>
        <small>{plan.access}</small>
      </div>
      <div className="pricing-card__price">
        {plan.oldPrice && <del>{currency === "PKR" ? "Rs. " : "$"}{plan.oldPrice[currency]}</del>}
        <strong>{currency === "PKR" ? "Rs. " : "$"}{plan.price[currency]}</strong>
        <span>{currency} / {plan.days}</span>
      </div>
      <button className="button pricing-card__cta" onClick={() => openAuth("signup", plan.name)}>{plan.cta}<ArrowRight size={17} /></button>
      <div className="pricing-card__save">{plan.save[currency]}</div>
      <MicroBadge>No Ads</MicroBadge>
      <CheckList items={plan.features} />
      <div className="pricing-card__tools">
        <div><span>PREMIUM TOOLS</span><b>{plan.name} POWER</b></div>
        {plan.tools.map(([name, value]) => <p key={name}><strong>{name}</strong><span>{value}</span></p>)}
      </div>
    </article>
  );
}

function ComparisonValue({ value }) {
  if (value === true) return <span className="compare-check"><Check size={16} /></span>;
  if (value === false) return <span className="compare-x"><X size={15} /></span>;
  return <strong>{value}</strong>;
}

export function Pricing({ openAuth }) {
  const [currency, setCurrency] = useState("PKR");
  return (
    <main className="pricing-page">
      <section className="page-hero pricing-hero">
        <div className="page-hero__orb" aria-hidden="true" />
        <div className="container page-hero__inner" data-reveal>
          <Eyebrow>AVONFlow Plans</Eyebrow>
          <h1>Start <span>Free Trial</span></h1>
          <p>Sign up for three days of full creator access — no credit card. Then choose Plus, Max or Heavy when you are ready to create without limits.</p>
          <div className="page-hero__trust"><span><CheckCircle2 size={16} /> Instant activation</span><span><ShieldCheck size={16} /> Secure workspace</span><span><CreditCard size={16} /> No card to begin</span></div>
        </div>
        <GalleryRail compact />
      </section>

      <section className="pricing-plans section-pad">
        <div className="container">
          <div className="currency-switch" role="tablist" aria-label="Currency">
            <button role="tab" aria-selected={currency === "PKR"} className={currency === "PKR" ? "is-active" : ""} onClick={() => setCurrency("PKR")}><span>PK</span> PKR</button>
            <button role="tab" aria-selected={currency === "USD"} className={currency === "USD" ? "is-active" : ""} onClick={() => setCurrency("USD")}><span>US</span> USD</button>
          </div>
          <p className="currency-note">Rate used for display: 1 USD = 290 PKR · one-time payment</p>
          <div className="pricing-grid">
            {pricingPlans.map((plan) => <PlanCard key={plan.id} plan={plan} currency={currency} openAuth={openAuth} />)}
          </div>
          <div className="plan-assurances" data-reveal>
            <span><ShieldCheck size={17} /> Secure payment</span>
            <span><Zap size={17} /> Active in 5–10 minutes</span>
            <span><Headphones size={17} /> Creator support</span>
          </div>
        </div>
      </section>

      <section className="comparison section-pad section-deep">
        <div className="container">
          <SectionHeading align="center" eyebrow="COMPARE ALL PLANS" title="Side-by-side" accent="comparison." description="Every important feature, every plan — at a glance." />
          <div className="comparison__scroll" data-reveal>
            <table>
              <thead><tr><th>FEATURE</th><th>PLUS</th><th>MAX</th><th>HEAVY</th></tr></thead>
              <tbody>
                {comparisonRows.map(([feature, plus, max, heavy]) => (
                  <tr key={feature}><th>{feature}</th><td><ComparisonValue value={plus} /></td><td><ComparisonValue value={max} /></td><td><ComparisonValue value={heavy} /></td></tr>
                ))}
                <tr className="comparison__price"><th>Price ({currency})</th>{pricingPlans.map((plan) => <td key={plan.id}>{currency === "PKR" ? "Rs. " : "$"}{plan.price[currency]}</td>)}</tr>
                <tr className="comparison__actions"><th />{pricingPlans.map((plan) => <td key={plan.id}><button onClick={() => openAuth("signup", plan.name)}>Get {plan.name[0] + plan.name.slice(1).toLowerCase()} <ArrowRight size={14} /></button></td>)}</tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="pricing-faq section-pad">
        <div className="container pricing-faq__inner">
          <SectionHeading align="center" eyebrow="BEFORE YOU CHOOSE" title="Frequently asked" accent="questions." description="Clear answers, without the fine-print maze." />
          <Accordion items={pricingFaqs} />
        </div>
      </section>

      <section className="compact-cta">
        <div className="container compact-cta__inner">
          <div data-reveal><Eyebrow icon="crown">TRY THE FULL WORKSPACE</Eyebrow><h2>Three days of AVONFlow. <span>On us.</span></h2><p>Create before you commit. No credit card and no automatic renewal during the trial.</p></div>
          <div data-reveal><button className="button button--primary" onClick={() => openAuth("signup")}>Start free trial <ArrowRight size={17} /></button><span><Clock3 size={15} /> Takes less than a minute</span></div>
        </div>
      </section>
    </main>
  );
}

