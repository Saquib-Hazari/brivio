import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Gauge,
	Lightbulb,
	Map as MapIcon,
	Rocket,
	Search,
} from "lucide-react";
import type { ComponentType } from "react";

type ProcessStep = {
	title: string;
	description: string;
	quote: string;
	icon: ComponentType<{ "aria-hidden"?: boolean }>;
};

const steps: ProcessStep[] = [
	{
		title: "Discovery & Analysis",
		description:
			"Find the market signals, customer questions, and technical gaps worth solving first.",
		quote: "Clarity turns activity into direction.",
		icon: Search,
	},
	{
		title: "Digital Roadmapping",
		description:
			"Turn insight into a clear sequence of priorities, outcomes, and measurable milestones.",
		quote: "A good plan makes the next move obvious.",
		icon: MapIcon,
	},
	{
		title: "High-Fidelity UI/UX",
		description:
			"Shape a precise, accessible experience that earns trust and makes action feel natural.",
		quote: "Every useful detail earns its place.",
		icon: Lightbulb,
	},
	{
		title: "Performance Engineering",
		description:
			"Build fast, resilient foundations that support growth without adding unnecessary complexity.",
		quote: "Speed is a product decision.",
		icon: Gauge,
	},
	{
		title: "Optimization & Launch",
		description:
			"Launch with confidence, monitor the signal, and keep improving what drives demand.",
		quote: "Launch is where learning starts.",
		icon: Rocket,
	},
];

export function ProcessWithUs() {
	return (
		<section
			id="process"
			className="process-with-section"
			aria-labelledby="process-with-heading"
		>
			<div className="site-container process-with-grid">
				<div data-reveal className="process-with-title">
					<p className="eyebrow">Our process</p>
					<h2 data-heading-reveal id="process-with-heading">
						WITH US
					</h2>
					<p>
						Clear thinking, disciplined delivery, and momentum at every step.
					</p>
				</div>

				{steps.map((step) => {
					const Icon = step.icon;
					return (
						<article
							data-reveal
							className="process-value-card"
							key={step.title}
						>
							<span className="process-value-icon">
								<Icon aria-hidden />
							</span>
							<h3>{step.title}</h3>
							<p>{step.description}</p>
							<blockquote>{step.quote}</blockquote>
						</article>
					);
				})}

				<aside data-reveal className="process-proof-quote">
					“Strong systems make ambitious work feel inevitable.”
				</aside>

				<div data-reveal className="process-with-cta">
					<p>One integrated team, focused on the next meaningful move.</p>
					<Link
						className="button process-cta-button"
						to="/"
						hash="contact-form"
					>
						Let’s talk <ArrowRight aria-hidden="true" />
					</Link>
				</div>
			</div>
		</section>
	);
}
