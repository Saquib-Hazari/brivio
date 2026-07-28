import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import designMockup from "../../../UI/Mock1.png";
import deployMockup from "../../../UI/Mock2.png";
import { AboutBoard } from "../components/AboutBoard";
import { ContactForm } from "../components/ContactForm";
import { FaqSection } from "../components/FaqSection";
import { PanelVisual } from "../components/PanelVisual";
import { ProcessWithUs } from "../components/ProcessWithUs";
import { useReveal, useStackedPanels } from "../components/Reveal";
import { ServiceBoard } from "../components/ServiceBoard";
import { SkillsGrid } from "../components/SkillsGrid";
import { WorkShowcase } from "../components/WorkShowcase";

const process = [
	{
		number: "01",
		title: "Strategy",
		color: "white",
		image:
			"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=85",
		items: ["Search demand architecture", "Conversion journeys"],
	},
	{
		number: "02",
		title: "Design",
		color: "red",
		image:
			"https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1100&q=85",
		items: ["High-fidelity design", "UX architecture"],
	},
	{
		number: "03",
		title: "Code",
		color: "yellow",
		image:
			"https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1100&q=85",
		items: ["Custom performance", "Agentic workflows"],
	},
	{
		number: "04",
		title: "Deploy",
		color: "blue",
		image:
			"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=85",
		items: ["Zero-downtime launch", "Cloud infrastructure"],
	},
	{
		number: "05",
		title: "SEO",
		color: "green",
		image:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=85",
		items: ["SEO, AEO & GEO", "Authority building"],
	},
] as const;

const skills = [
	"TanStack Start",
	"TypeScript",
	"React JS",
	"JavaScript",
	"Node.js",
	"Database Management",
	"Figma",
];

const processChartPairs = [
	["line", "donut"],
	["line", "donut"],
	["line", "donut"],
	["line", "donut"],
	["line", "donut"],
] as const;

const processQuotes = [
	"“Start with the signal, not the solution.”",
	"“The best journeys are intentional from the first click.”",
	"“Great experiences remove the reasons to hesitate.”",
	"“Performance is felt before it is measured.”",
	"“Keep what works. Improve what matters next.”",
] as const;

const capabilityArt = {
	Design: designMockup,
	Deploy: deployMockup,
} as const;

const codeShowcaseVideo = {
	poster: "/media/code-showcase-poster.jpg",
	src: "/media/code-showcase.mp4",
} as const;

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	const page = useReveal();
	const processStack = useStackedPanels();
	return (
		<main id="main-content" ref={page}>
			<section className="home-hero">
				<div className="site-container hero-content">
					<p data-reveal className="eyebrow">
						Performance-first digital agency
					</p>
					<h1 data-heading-reveal>
						Designing SEO-Optimized Websites That Help You Grow Revenue Faster.
					</h1>
					<p data-reveal className="hero-copy">
						We connect technical SEO, answer-engine optimization, generative
						search visibility, and social distribution to turn your website into
						a durable demand engine.
					</p>
					<a
						data-reveal
						className="button button-yellow hero-explore"
						href="#process"
					>
						Explore
					</a>
					<SkillsGrid />
					<div data-reveal className="hero-signal-grid home-signals">
						<span>SEO + AEO + GEO</span>
						<span>Conversion systems</span>
						<span>Social demand</span>
					</div>
					<div data-reveal className="hero-brief-grid home-brief-grid">
						<article>
							<span>01</span>
							<strong>Search intelligence</strong>
							<p>Map the questions that create qualified demand.</p>
						</article>
						<article>
							<span>02</span>
							<strong>Revenue experience</strong>
							<p>Design the path from first visit to conversation.</p>
						</article>
						<article>
							<span>03</span>
							<strong>Distribution loop</strong>
							<p>Compound visibility across search, AI, and social.</p>
						</article>
					</div>
				</div>
			</section>
			<ProcessWithUs />

			<section
				id="capabilities"
				ref={processStack}
				className="process-list"
				aria-label="Our capabilities"
			>
				<div className="process-stack">
					{process.map((item, index) => (
						<article
							key={item.number}
							data-process-panel
							className={`process-panel panel-${item.color}`}
						>
							<div className="site-container process-grid">
								<div data-reveal className="process-text">
									<span className="step-number">{item.number}</span>
									<p data-reveal-left className="section-tag">
										{item.title} / {item.items[0]}
									</p>
									<h2 data-heading-reveal>{item.title}</h2>
									<blockquote className="process-quote">
										{processQuotes[index]}
									</blockquote>
									{item.items.map((label) => (
										<div className="service-snippet" key={label}>
											<h3>{label}</h3>
											<p>{descriptionFor(label)}</p>
										</div>
									))}
									<div className="panel-metrics">
										<span>Signal / {item.number}</span>
										<span>System / Active</span>
										<span>Outcome / Ready</span>
									</div>
								</div>
								<div data-reveal className="process-media">
									{item.title === "Code" ? (
										<CapabilityVideo
											title={item.title}
											{...codeShowcaseVideo}
										/>
									) : item.title in capabilityArt ? (
										<CapabilityArtwork
											title={item.title}
											src={
												capabilityArt[item.title as keyof typeof capabilityArt]
											}
										/>
									) : item.title === "SEO" ? (
										<div className="seo-performance-chart">
											<PanelVisual
												title="SEO performance / 92"
												tone="green"
												chart
												variant="donut"
											/>
										</div>
									) : (
										<div className="process-chart-grid">
											{processChartPairs[index].map((variant, chartIndex) => (
												<PanelVisual
													key={variant}
													title={`${item.title} signal ${chartIndex + 1}`}
													tone={item.color}
													chart
													variant={variant}
												/>
											))}
										</div>
									)}
								</div>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="pricing-section">
				<div className="site-container">
					<p className="eyebrow">Investment</p>
					<h2 data-heading-reveal>Pricing</h2>
					<p className="section-intro">
						Simple, transparent pricing for businesses ready to scale their
						digital presence.
					</p>
					<div className="pricing-grid">
						<PriceCard
							title="Starter Plan"
							price="$999"
							details={[
								"Technical SEO & conversion audit",
								"Five revenue-ready landing pages",
								"Monthly search-led content plan",
								"Local visibility & reputation setup",
								"Monthly pipeline performance report",
							]}
						/>
						<PriceCard
							featured
							title="Growth Plan"
							price="$2,499"
							details={[
								"Full-funnel SEO, AEO & GEO system",
								"Conversion pages and ongoing CRO",
								"Social media demand campaigns",
								"Authority content & digital PR roadmap",
								"Lead tracking with executive dashboards",
								"Priority growth strategy sessions",
							]}
						/>
					</div>
					<div className="pricing-support">
						<article>
							<span>01 / Choosing a plan</span>
							<h3>Start with your next growth constraint.</h3>
							<p>
								Choose Starter when you need a focused foundation, or Growth
								when you are ready to connect search, conversion, and
								distribution.
							</p>
						</article>
						<article>
							<span>02 / Tailored scope</span>
							<h3>Need something more specific?</h3>
							<p>
								We can shape a focused engagement around the opportunities that
								matter most to your business.
							</p>
							<a href="#contact-form" className="text-link">
								Discuss your scope <ArrowRight aria-hidden="true" />
							</a>
						</article>
					</div>
				</div>
			</section>
			<section className="skills-marquee" aria-label="Technical skills">
				<div className="marquee-track">
					{skills.map((skill) => (
						<span key={skill}>
							{skill} <b>•</b>
						</span>
					))}
					{skills.map((skill) => (
						<span key={`copy-${skill}`}>
							{skill} <b>•</b>
						</span>
					))}
				</div>
			</section>
			<WorkShowcase />
			<ServiceBoard />
			<AboutBoard />
			<FaqSection />
			<section className="cta-section">
				<div className="site-container">
					<h2 data-heading-reveal>
						Ready to turn your website into a revenue engine?
					</h2>
					<p>
						Bring us your biggest growth challenge. We will build the system
						that moves it forward.
					</p>
					<a href="#contact-form" className="button button-yellow">
						Book strategy session <ArrowRight aria-hidden="true" />
					</a>
				</div>
			</section>
			<ContactForm />
		</main>
	);
}

function CapabilityArtwork({ title, src }: { title: string; src: string }) {
	const [failed, setFailed] = useState(false);

	if (failed) {
		return (
			<div
				className="capability-art-fallback"
				role="img"
				aria-label={`${title} capability`}
			>
				<span>BRIVIO / {title}</span>
				<strong>Capability illustration unavailable.</strong>
				<p>
					The complete capability details remain available beside this panel.
				</p>
			</div>
		);
	}

	return (
		<figure className={`capability-art capability-art-${title.toLowerCase()}`}>
			<img
				alt={`${title} capability illustration`}
				src={src}
				loading="lazy"
				decoding="async"
				width="960"
				height="960"
				onError={() => setFailed(true)}
			/>
		</figure>
	);
}

function CapabilityVideo({
	title,
	src,
	poster,
}: {
	title: string;
	src: string;
	poster: string;
}) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [failed, setFailed] = useState(false);
	const [shouldLoad, setShouldLoad] = useState(false);
	const [shouldPlay, setShouldPlay] = useState(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const motionPreference = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		);
		const updatePlayback = () => setShouldPlay(!motionPreference.matches);
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				setShouldLoad(true);
				observer.disconnect();
			},
			{ rootMargin: "200px" },
		);

		updatePlayback();
		observer.observe(video);
		motionPreference.addEventListener("change", updatePlayback);

		return () => {
			observer.disconnect();
			motionPreference.removeEventListener("change", updatePlayback);
		};
	}, []);

	if (failed) {
		return <CapabilityArtwork title={title} src={poster} />;
	}

	return (
		<figure className="capability-art capability-art-code capability-video">
			<video
				ref={videoRef}
				autoPlay={shouldPlay && shouldLoad}
				loop
				muted
				playsInline
				poster={poster}
				preload="metadata"
				aria-label={`${title} capability video`}
				onError={() => setFailed(true)}
			>
				{shouldLoad ? <source src={src} type="video/mp4" /> : null}
			</video>
		</figure>
	);
}

function PriceCard({
	title,
	price,
	details,
	featured = false,
}: {
	title: string;
	price: string;
	details: string[];
	featured?: boolean;
}) {
	return (
		<article data-reveal className={`price-card ${featured ? "featured" : ""}`}>
			<div className="price-card-surface">
				{featured ? <span className="price-badge">Most popular</span> : null}
				<h3>{title}</h3>
				<p className="price">
					{price}
					<small>/mo</small>
				</p>
				<div className="price-decision">
					<span>Monthly investment</span>
					<strong>
						{featured ? "Most complete system" : "Growth foundation"}
					</strong>
				</div>
				<p className="price-positioning">
					Built to turn attention into attributable revenue.
				</p>
				<ul>
					{details.map((detail) => (
						<li key={detail}>
							<Check aria-hidden="true" />
							{detail}
						</li>
					))}
				</ul>
				<a
					className={`button ${featured ? "button-yellow" : "button-white"} price-connect`}
					href="#contact-form"
				>
					Connect <ChevronRight aria-hidden="true" />
				</a>
			</div>
		</article>
	);
}

function descriptionFor(label: string) {
	const descriptions: Record<string, string> = {
		"Search demand architecture":
			"We map your revenue goals to the queries, topics, and conversion paths that earn qualified attention.",
		"Conversion journeys":
			"Every journey is structured to turn curiosity into conversations, leads, and revenue.",
		"High-fidelity design":
			"High-converting interfaces engineered for human behavior.",
		"UX architecture":
			"Every interaction is mapped to eliminate friction and drive action.",
		"Custom performance":
			"Clean semantic code built for lightning-fast website delivery.",
		"Agentic workflows":
			"Advanced AI automation integrated into core operations.",
		"Zero-downtime launch":
			"A seamless, technically rigorous deployment from day one.",
		"Cloud infrastructure":
			"Global edge delivery that keeps your application fast everywhere.",
		"SEO, AEO & GEO":
			"We earn visibility across search, AI answers, and generative experiences where buyers now research.",
		"Authority building":
			"Strategic content and quality acquisition that earns trust.",
	};
	return descriptions[label];
}
