import { Check } from "lucide-react";

const steps = [
	{
		number: "01",
		title: "Research & Strategy",
		body: "Mapped the audience, search intent, and competitor gaps before a single screen was designed.",
		points: ["Audience research", "Search opportunity map"],
	},
	{
		number: "02",
		title: "Website Creation",
		body: "Designed and developed a responsive website built around clarity, trust, and action.",
		points: ["UI / UX system", "Responsive frontend"],
	},
	{
		number: "03",
		title: "Payments & Conversion",
		body: "Connected a friction-free payment path that makes it easier for ready buyers to act.",
		points: ["Secure checkout", "Conversion-ready flow"],
	},
	{
		number: "04",
		title: "Social Growth",
		body: "Built a social content direction that turns useful ideas into ongoing audience attention.",
		points: ["Content direction", "Audience growth loop"],
	},
] as const;

export function CaseStudyBoard() {
	return (
		<section id="work" className="case-study-section">
			<div className="site-container case-study-heading">
				<p className="eyebrow">Selected work</p>
				<h2 data-heading-reveal>Built to move the business forward.</h2>
				<p>
					A clear path from research to launch, conversion, and ongoing audience
					growth.
				</p>
			</div>
			<div className="site-container case-study-grid">
				{steps.map((step) => (
					<article className="case-study-card" key={step.number}>
						<div className="unified-feature-grid feature-grid">
							<div className="feature-copy work-case-copy">
								<span className="step-number">{step.number}</span>
								<p className="section-tag">Project system</p>
								<h2 data-heading-reveal>{step.title}</h2>
								<p>{step.body}</p>
								<ul>
									{step.points.map((point) => (
										<li key={point}>
											<Check aria-hidden="true" />
											{point}
										</li>
									))}
								</ul>
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
