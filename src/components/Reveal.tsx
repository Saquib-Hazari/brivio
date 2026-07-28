import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useReveal(selector = "[data-reveal]") {
	const scope = useRef<HTMLElement>(null);

	useEffect(() => {
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduceMotion || !scope.current) return;

		const context = gsap.context(() => {
			const targets = gsap.utils.toArray<HTMLElement>(selector);
			gsap.fromTo(
				targets,
				{ opacity: 0, y: 36 },
				{
					opacity: 1,
					y: 0,
					duration: 0.82,
					stagger: 0.1,
					ease: "power3.out",
				},
			);
			gsap.fromTo(
				gsap.utils.toArray<HTMLElement>("[data-reveal-left]"),
				{ opacity: 0, x: -42 },
				{
					opacity: 1,
					x: 0,
					duration: 0.7,
					stagger: 0.12,
					ease: "power3.out",
				},
			);
			const headingDistance = window.matchMedia("(max-width: 640px)").matches
				? 24
				: 54;
			gsap.utils
				.toArray<HTMLElement>("[data-heading-reveal]")
				.forEach((heading, index) => {
					gsap.fromTo(
						heading,
						{
							opacity: 0,
							x: index % 2 === 0 ? -headingDistance : headingDistance,
						},
						{
							opacity: 1,
							x: 0,
							duration: 1.05,
							ease: "power3.out",
							scrollTrigger: {
								trigger: heading,
								start: "top 86%",
								toggleActions: "play none none none",
							},
						},
					);
				});
		}, scope);

		return () => context.revert();
	}, [selector]);

	return scope;
}

export function useStackedPanels<T extends HTMLElement = HTMLElement>() {
	const scope = useRef<T>(null);

	useLayoutEffect(() => {
		if (!scope.current) return;

		const media = gsap.matchMedia();
		const context = gsap.context(() => {
			media.add(
				"(min-width: 1100px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
				() => {
					const panels = gsap.utils.toArray<HTMLElement>(
						"[data-process-panel]",
					);
					if (panels.length < 2) return;

					gsap.set(panels.slice(1), { yPercent: 100 });
					gsap
						.timeline({
							scrollTrigger: {
								trigger: scope.current,
								start: "top top",
								end: () => `+=${window.innerHeight * (panels.length - 1)}`,
								scrub: 0.75,
								pin: true,
								anticipatePin: 1,
								invalidateOnRefresh: true,
							},
						})
						.to(panels.slice(1), {
							yPercent: 0,
							duration: 1,
							ease: "none",
							stagger: 1,
						});
				},
			);
		}, scope);

		return () => {
			media.revert();
			context.revert();
		};
	}, []);

	return scope;
}
