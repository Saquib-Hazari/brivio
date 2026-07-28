import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
	const wordmarkRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!wordmarkRef.current) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const context = gsap.context(() => {
			gsap.fromTo(
				wordmarkRef.current,
				{ opacity: 0, y: 56, scale: 0.96 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 1.25,
					ease: "power3.out",
					scrollTrigger: {
						trigger: wordmarkRef.current,
						start: "top 88%",
						toggleActions: "play none none none",
					},
				},
			);
		}, wordmarkRef);

		return () => context.revert();
	}, []);

	return (
		<footer className="site-footer">
			<div className="site-container footer-grid">
				<section>
					<Link to="/" className="brand footer-brand">
						BRIVIO
					</Link>
					<p className="footer-copy">
						The performance-first digital agency connecting search visibility,
						conversion, and resilient web experiences.
					</p>
					<nav className="social-links" aria-label="Social links">
						<a href="https://twitter.com" aria-label="Brivio on X">
							<Twitter aria-hidden="true" />
						</a>
						<a href="https://linkedin.com" aria-label="Brivio on LinkedIn">
							<Linkedin aria-hidden="true" />
						</a>
						<a href="https://instagram.com" aria-label="Brivio on Instagram">
							<Instagram aria-hidden="true" />
						</a>
						<a href="https://discord.com" aria-label="Brivio on Discord">
							<DiscordIcon />
						</a>
						<a href="https://reddit.com" aria-label="Brivio on Reddit">
							<RedditIcon />
						</a>
					</nav>
				</section>
				<section>
					<h2>Services</h2>
					<Link to="/" hash="services">
						SEO Performance
					</Link>
					<Link to="/" hash="services">
						Paid Advertising
					</Link>
					<Link to="/" hash="services">
						Web Development
					</Link>
					<Link to="/" hash="services">
						Social Growth
					</Link>
				</section>
				<section>
					<h2>Agency</h2>
					<Link to="/" hash="process">
						Our Process
					</Link>
					<Link to="/" hash="about">
						About Us
					</Link>
					<Link to="/" hash="work">
						Our Work
					</Link>
					<Link to="/" hash="contact-form">
						Contact
					</Link>
				</section>
				<section>
					<h2>Reach us</h2>
					<p>
						<MapPin aria-hidden="true" /> Remote-first studio serving ambitious
						teams worldwide
					</p>
					<a className="footer-email" href="mailto:hello@brivio.tech">
						<Mail aria-hidden="true" /> hello@brivio.tech
					</a>
				</section>
			</div>
			<div className="site-container footer-bottom">
				<span>© 2026 BRIVIO AGENCY. ALL RIGHTS RESERVED.</span>
				<div>
					<a href="#privacy">Privacy policy</a>
					<a href="#terms">Terms of service</a>
				</div>
			</div>
			<div
				ref={wordmarkRef}
				className="site-container footer-wordmark"
				aria-hidden="true"
			>
				<span data-text="BRIVIO">BRIVIO</span>
			</div>
		</footer>
	);
}

function DiscordIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path
				fill="currentColor"
				d="M19.3 5.3A16 16 0 0 0 15.4 4l-.5 1a13 13 0 0 0-5.8 0l-.5-1a16 16 0 0 0-3.9 1.3C2.2 9 1.5 12.7 1.8 16.4a16 16 0 0 0 4.8 2.4l1.2-1.7-1.8-.9.4-.3a13.6 13.6 0 0 0 11.2 0l.4.3-1.8.9 1.2 1.7a16 16 0 0 0 4.8-2.4c.4-4.3-.7-8-2.9-11.1ZM8.5 14.5c-1.1 0-2-1.1-2-2.4s.9-2.4 2-2.4 2 1.1 2 2.4-.9 2.4-2 2.4Zm7 0c-1.1 0-2-1.1-2-2.4s.9-2.4 2-2.4 2 1.1 2 2.4-.9 2.4-2 2.4Z"
			/>
		</svg>
	);
}

function RedditIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path
				fill="currentColor"
				d="M20.7 12.2c.1-.3.2-.6.2-1a2.2 2.2 0 0 0-3.7-1.6 10.7 10.7 0 0 0-4.6-1.4l.8-3.5 2.5.6a1.8 1.8 0 1 0 .3-1.1l-3.1-.7a.6.6 0 0 0-.7.4l-1 4.3a10.6 10.6 0 0 0-4.6 1.4 2.2 2.2 0 0 0-3.7 1.6c0 .4.1.7.2 1A3.5 3.5 0 0 0 3 13.6c0 3 4 5.4 9 5.4s9-2.4 9-5.4c0-.5-.1-1-.3-1.4ZM7.7 13.7a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Zm7.5 2.1c-.7.7-1.8 1-3.2 1s-2.5-.3-3.2-1a.6.6 0 0 1 .8-.8c.5.5 1.3.7 2.4.7s1.9-.2 2.4-.7a.6.6 0 0 1 .8.8Zm1.1-2.1a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z"
			/>
		</svg>
	);
}
