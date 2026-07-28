import { Check } from "lucide-react";

const principles = [
	{
		title: "Our Mission",
		body: "We bridge the gap between aesthetics and performance. Every pixel serves a purpose, and every line of code drives a result.",
		points: ["Outcome-led planning", "Measurable priorities"],
	},
	{
		title: "Core Values",
		body: "The principles that guide every decision we make, from initial strategy to final deployment.",
		points: ["Performance first", "Data driven", "Radical trust"],
	},
	{
		title: "The Experts",
		body: "A collective of strategists, designers, and developers built to solve high-stakes digital problems.",
		points: ["Senior specialists", "One integrated team"],
	},
	{
		title: "Unmatched Expertise",
		body: "Technical SEO, conversion UI/UX, and scalable infrastructure come together in one disciplined practice.",
		points: ["Technical SEO", "Conversion UI/UX", "Scalable infrastructure"],
	},
] as const;

export function AboutBoard() {
	return (
		<section
			id="about"
			className="case-study-section about-board"
			aria-labelledby="about-heading"
		>
			<div className="site-container case-study-heading">
				<p className="eyebrow">Our agency</p>
				<h2 data-heading-reveal id="about-heading">
					Building the Future of Digital Performance.
				</h2>
				<p>
					BRIVIO is a high-performance digital agency dedicated to scaling
					brands through data-driven design and SEO-centric architecture.
				</p>
			</div>
			<div className="site-container case-study-grid">
				{principles.map((principle) => (
					<article className="case-study-card" key={principle.title}>
						<div className="unified-feature-grid feature-grid">
							<div className="feature-copy work-case-copy">
								<p className="section-tag">BRIVIO principle</p>
								<h3>{principle.title}</h3>
								<p>{principle.body}</p>
								<ul>
									{principle.points.map((point) => (
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
