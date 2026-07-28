import { Check } from "lucide-react";

const services = [
	{
		number: "01",
		title: "Digital Strategy",
		body: "The blueprint for your market dominance. We engineer success through rigorous market analysis and consumer behavior modeling.",
		points: [
			"Competitive landscape mapping",
			"User persona architecture",
			"ROI forecasting",
		],
	},
	{
		number: "02",
		title: "SEO, AEO & GEO",
		body: "Win the searches, AI answers, and generative recommendations that shape your buyers’ shortlist before they ever fill in a form.",
		points: [
			"Technical infrastructure",
			"Semantic content clusters",
			"Authority acquisition",
		],
	},
	{
		number: "03",
		title: "Speed & Performance",
		body: "Every millisecond costs money. We build ultra-fast applications that convert users at record speeds.",
		points: [
			"Core Web Vitals optimization",
			"Server-side architecture",
			"Edge delivery",
		],
	},
	{
		number: "04",
		title: "Social Demand",
		body: "Turn your expertise into a consistent distribution engine that earns attention, trust, and qualified conversations.",
		points: ["Viral dynamics", "Paid amplification"],
	},
] as const;

export function ServiceBoard() {
	return (
		<section
			id="services"
			className="case-study-section service-board"
			aria-labelledby="services-heading"
		>
			<div className="site-container case-study-heading">
				<p className="eyebrow">Services</p>
				<h2 data-heading-reveal id="services-heading">
					Systems that compound growth.
				</h2>
				<p>
					From market intelligence to distribution, each service is designed to
					strengthen the next.
				</p>
			</div>
			<div className="site-container case-study-grid">
				{services.map((service) => (
					<article className="case-study-card" key={service.number}>
						<div className="unified-feature-grid feature-grid">
							<div className="feature-copy work-case-copy">
								<p className="section-tag">Growth system</p>
								<h3>{service.title}</h3>
								<p>{service.body}</p>
								<ul>
									{service.points.map((point) => (
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
