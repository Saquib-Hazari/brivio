import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ChartVariant } from "./PerformanceChart";

const PerformanceChart = lazy(() =>
	import("./PerformanceChart").then((module) => ({
		default: module.PerformanceChart,
	})),
);

const illustrations = {
	strategy: "/media/illustrations/strategy.png",
	design: "/media/illustrations/design.png",
	engineering: "/media/illustrations/engineering.png",
	growth: "/media/illustrations/growth.png",
	"about-values": "/media/illustrations/pages/about-values.png",
	"about-experts": "/media/illustrations/pages/about-experts.png",
	"about-expertise": "/media/illustrations/pages/about-expertise.png",
	"services-seo": "/media/illustrations/pages/services-seo.png",
	"services-speed": "/media/illustrations/pages/services-speed.png",
	"services-social": "/media/illustrations/pages/services-social.png",
	"process-roadmap": "/media/illustrations/pages/process-roadmap.png",
	"process-uiux": "/media/illustrations/pages/process-uiux.png",
	"process-engineering": "/media/illustrations/pages/process-engineering.png",
	"process-launch": "/media/illustrations/pages/process-launch.png",
	"case-aura": "/media/illustrations/archive/case-studies/case-aura.png",
	"case-fintech": "/media/illustrations/archive/case-studies/case-fintech.png",
	"case-eco": "/media/illustrations/archive/case-studies/case-eco.png",
} as const;

export type Illustration = keyof typeof illustrations;

function PanelContext({ title }: { title: string }) {
	return (
		<div className="panel-context">
			<span>System brief</span>
			<strong>{title}</strong>
			<p>Signal → decision → momentum</p>
		</div>
	);
}

function chooseIllustration(title: string): Illustration {
	const value = title.toLowerCase();
	if (/(design|brand|ux|creative)/.test(value)) return "design";
	if (
		/(code|deploy|cloud|engineer|api|platform|infrastructure|launch)/.test(
			value,
		)
	)
		return "engineering";
	if (/(seo|search|growth|social|authority|audience|demand)/.test(value))
		return "growth";
	return "strategy";
}

export function PanelVisual({
	title,
	tone,
	chart = false,
	variant = "area",
	illustration,
}: {
	title: string;
	tone: "white" | "red" | "yellow" | "blue" | "green";
	chart?: boolean;
	variant?: ChartVariant;
	illustration?: Illustration;
}) {
	if (chart)
		return (
			<div className="panel-chart-wrap">
				<DeferredChart
					title={`${title} signal`}
					tone={tone}
					variant={variant}
				/>
				<PanelContext title={title} />
			</div>
		);
	const selected = illustration ?? chooseIllustration(title);
	return (
		<figure className="panel-visual">
			<img
				src={illustrations[selected]}
				alt={`${title} editorial illustration`}
				loading="lazy"
				decoding="async"
				width="960"
				height="960"
			/>
			<figcaption className="panel-visual-note">
				<span>BRIVIO / ACTIVE SYSTEM</span>
				<strong>{title}</strong>
			</figcaption>
			<PanelContext title={title} />
		</figure>
	);
}

function DeferredChart({
	title,
	tone,
	variant,
}: {
	title: string;
	tone: "white" | "red" | "yellow" | "blue" | "green";
	variant: ChartVariant;
}) {
	const container = useRef<HTMLDivElement>(null);
	const [isNearViewport, setIsNearViewport] = useState(false);

	useEffect(() => {
		if (!container.current || !("IntersectionObserver" in window)) {
			setIsNearViewport(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return;
				setIsNearViewport(true);
				observer.disconnect();
			},
			{ rootMargin: "320px 0px" },
		);
		observer.observe(container.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="deferred-chart" ref={container}>
			{isNearViewport ? (
				<Suspense
					fallback={
						<output className="chart-loading">
							Preparing performance data…
						</output>
					}
				>
					<PerformanceChart title={title} tone={tone} variant={variant} />
				</Suspense>
			) : (
				<output className="chart-loading">
					Performance data loads as you explore.
				</output>
			)}
		</div>
	);
}
