import { useState } from "react";

const questions = [
	{
		question: "What does a performance-first digital agency do?",
		answer:
			"A performance-first agency connects technical SEO, conversion design, fast development, and distribution so visibility becomes measurable demand rather than traffic alone.",
	},
	{
		question: "How do SEO, AEO, and GEO work together?",
		answer:
			"SEO earns search visibility, AEO structures direct answers, and GEO makes credible brand information easier for generative engines to understand, cite, and recommend.",
	},
	{
		question: "When should a business invest in conversion optimization?",
		answer:
			"Invest when qualified visitors arrive but do not consistently become inquiries or customers. Start with analytics, user intent, message clarity, accessibility, and page speed.",
	},
	{
		question: "How does Brivio improve website performance?",
		answer:
			"We audit Core Web Vitals, remove avoidable frontend weight, improve semantic structure, reserve media space, and test the complete experience across devices and connection conditions.",
	},
] as const;

export function FaqSection() {
	const [openQuestion, setOpenQuestion] = useState<string | null>(null);

	return (
		<section className="faq-section" aria-labelledby="faq-heading">
			<div className="site-container faq-grid">
				<div className="faq-intro">
					<p className="eyebrow">Direct answers</p>
					<h2 data-heading-reveal id="faq-heading">
						Questions ambitious teams ask first.
					</h2>
					<p>
						Concise answers about search visibility, conversion, and digital
						performance.
					</p>
				</div>
				<div className="faq-list">
					{questions.map((item, index) => (
						<div
							className={`faq-item${openQuestion === item.question ? " is-open" : ""}`}
							key={item.question}
						>
							<button
								aria-controls={`faq-answer-${index}`}
								aria-expanded={openQuestion === item.question}
								className="faq-question"
								id={`faq-question-${index}`}
								onClick={() =>
									setOpenQuestion((current) =>
										current === item.question ? null : item.question,
									)
								}
								type="button"
							>
								{item.question}
							</button>
							<div
								aria-hidden={openQuestion !== item.question}
								className="faq-answer"
								id={`faq-answer-${index}`}
							>
								<div className="faq-answer-inner">
									<p>{item.answer}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export const faqStructuredData = questions.map((item) => ({
	"@type": "Question",
	name: item.question,
	acceptedAnswer: {
		"@type": "Answer",
		text: item.answer,
	},
}));
