import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { type Illustration, PanelVisual } from "./PanelVisual";
import { useReveal, useStackedPanels } from "./Reveal";

type Feature = {
	number: string;
	title: string;
	body: string;
	image: string;
	visual?: Illustration;
	color: "red" | "yellow" | "blue" | "green" | "white";
	points?: string[];
};

const illustrationSequence: Illustration[] = [
	"strategy",
	"design",
	"engineering",
	"growth",
];

export function AgencyPage({
	eyebrow,
	title,
	intro,
	features,
	stacked = false,
	unified = false,
	boardEyebrow = "Selected work",
	boardHeading = "Built to move the business forward.",
	boardIntro = "A clear path from research to launch, conversion, and ongoing audience growth.",
	boardClassName = "",
	showFeatureNumbers = true,
}: {
	eyebrow: string;
	title: string;
	intro: string;
	features: Feature[];
	stacked?: boolean;
	unified?: boolean;
	boardEyebrow?: string;
	boardHeading?: string;
	boardIntro?: string;
	boardClassName?: string;
	showFeatureNumbers?: boolean;
}) {
	const page = useReveal();
	const featureStack = useStackedPanels<HTMLDivElement>();
	const renderFeature = (
		feature: Feature,
		index: number,
		inUnifiedSection = false,
	) => (
		<article
			key={feature.number}
			className={
				inUnifiedSection
					? `unified-feature case-study-card panel-${feature.color}`
					: undefined
			}
		>
			<div
				className={`${inUnifiedSection ? "unified-feature-grid " : "site-container "}feature-grid ${index % 2 ? "media-first" : ""}`}
			>
				<div
					data-reveal
					className={`feature-copy${inUnifiedSection ? " work-case-copy" : ""}`}
				>
					{showFeatureNumbers && (
						<span className="step-number">{feature.number}</span>
					)}
					<p data-reveal-left className="section-tag">
						{inUnifiedSection
							? "Project system"
							: `Growth system / ${feature.title}`}
					</p>
					<h2 data-heading-reveal>{feature.title}</h2>
					<p>{feature.body}</p>
					{feature.points && (
						<ul>
							{feature.points.map((point) => (
								<li key={point}>
									<Check aria-hidden="true" />
									{point}
								</li>
							))}
						</ul>
					)}
					<div className="panel-metrics">
						<span>01 / Demand</span>
						<span>02 / Experience</span>
						<span>03 / Revenue</span>
					</div>
					{!inUnifiedSection && (
						<a className="feature-link" href="#contact">
							Explore {feature.title}
							<ArrowRight aria-hidden="true" />
						</a>
					)}
				</div>
				{!inUnifiedSection && (
					<PanelVisual
						title={feature.title}
						tone={feature.color}
						chart={index === 0}
						illustration={
							feature.visual ??
							illustrationSequence[index % illustrationSequence.length]
						}
						variant="area"
					/>
				)}
			</div>
		</article>
	);
	return (
		<main ref={page}>
			<section className={`inner-hero${unified ? " inner-hero-work" : ""}`}>
				<div className="site-container">
					<p data-reveal className="eyebrow">
						{eyebrow}
					</p>
					<h1 data-heading-reveal>{title}</h1>
					<p data-reveal>{intro}</p>
					{!unified && (
						<>
							<div data-reveal className="hero-signal-grid">
								<span>Discover</span>
								<span>Decide</span>
								<span>Convert</span>
							</div>
							<div data-reveal className="hero-brief-grid">
								<article>
									<span>01</span>
									<strong>Insight</strong>
									<p>Find the signal buyers already trust.</p>
								</article>
								<article>
									<span>02</span>
									<strong>System</strong>
									<p>Connect content, experience, and delivery.</p>
								</article>
								<article>
									<span>03</span>
									<strong>Momentum</strong>
									<p>Turn attention into measurable growth.</p>
								</article>
							</div>
						</>
					)}
				</div>
			</section>
			{unified ? (
				<section className={`case-study-section ${boardClassName}`}>
					<div className="site-container case-study-heading">
						<p className="eyebrow">{boardEyebrow}</p>
						<h2 data-heading-reveal>{boardHeading}</h2>
						<p>{boardIntro}</p>
					</div>
					<div className="site-container case-study-grid">
						{features.map((feature, index) =>
							renderFeature(feature, index, true),
						)}
					</div>
				</section>
			) : (
				<div
					ref={stacked ? featureStack : undefined}
					className={stacked ? "feature-stack" : "feature-sequence"}
				>
					{features.map((feature, index) => (
						<section
							key={feature.number}
							data-process-panel={stacked || undefined}
							className={`feature-panel panel-${feature.color}`}
						>
							{renderFeature(feature, index)}
						</section>
					))}
				</div>
			)}
			<section className="cta-section">
				<div className="site-container">
					<h2 data-heading-reveal>Ready to start your evolution?</h2>
					<p>
						Whether you are building from scratch or scaling a global brand, we
						have the expertise to get you there.
					</p>
					<Link className="button button-yellow" to="/case-studies">
						View our work <ArrowRight aria-hidden="true" />
					</Link>
				</div>
			</section>
		</main>
	);
}
