import styles from "./home-faq.module.css";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Where can I get an MCSS membership card?",
    answer:
      "Order a card online at the start of the school year via Google Form and pick it up on campus; message us on Instagram and we’ll help you out; or pick one up at our events.",
    options: [
      "Order a card online at the start of the school year via Google Form and pick it up on campus",
      "Message us on Instagram and we’ll help you out",
      "Pick one up at our events",
    ],
  },
  {
    question: "What kinds of events does MCSS organize?",
    answer:
      "MCSS organizes cultural workshops, food and holiday celebrations, social mixers, performances, markets, and signature events such as Casino Night. Our events are designed to welcome students from all backgrounds.",
    options: undefined,
  },
  {
    question: "Is MCSS a non-profit organization?",
    answer:
      "MCSS is a non-profit organization officially recognized under the Students' Society of McGill University (SSMU). Proceeds from our events are reinvested to support charitable causes and future programming for our members.",
    options: undefined,
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HomeFaq() {
  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className={styles.heading}>
        <h2 id="faq-heading">FAQ</h2>
      </div>
      <div className={styles.questions}>
        {faqs.map((faq) => (
          <details className={styles.item} key={faq.question}>
            <summary>
              <span>{faq.question}</span>
              <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
            </summary>
            <div className={styles.answer}>
              {faq.options ? (
                <ul>
                  {faq.options.map((option) => <li key={option}>{option}</li>)}
                </ul>
              ) : (
                <p>{faq.answer}</p>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
