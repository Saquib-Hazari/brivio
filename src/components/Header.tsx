import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [
	{ label: "Process", to: "/", hash: "process" },
	{ label: "Work", to: "/", hash: "work" },
	{ label: "Services", to: "/", hash: "services" },
	{ label: "About", to: "/", hash: "about" },
	{ label: "Contact", to: "/", hash: "contact-form" },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [activeHash, setActiveHash] = useState("");
	const triggerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
				triggerRef.current?.focus();
			}
		};
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, []);

	useEffect(() => {
		const updateFromHash = () => setActiveHash(window.location.hash.slice(1));
		updateFromHash();
		window.addEventListener("hashchange", updateFromHash);

		const sections = links
			.map((link) => document.getElementById(link.hash))
			.filter((section): section is HTMLElement => section !== null);
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (visible) setActiveHash(visible.target.id);
			},
			{ rootMargin: "-24% 0px -58%", threshold: [0.1, 0.35, 0.6] },
		);
		sections.forEach((section) => {
			observer.observe(section);
		});

		return () => {
			window.removeEventListener("hashchange", updateFromHash);
			observer.disconnect();
		};
	}, []);

	return (
		<header className="site-header">
			<nav
				className="site-container header-inner"
				aria-label="Primary navigation"
			>
				<Link
					to="/"
					className="brand"
					aria-label="Brivio home"
					onClick={() => setIsOpen(false)}
				>
					BRIVIO
				</Link>

				<button
					ref={triggerRef}
					type="button"
					className="menu-toggle"
					aria-expanded={isOpen}
					aria-controls="primary-menu"
					onClick={() => setIsOpen((open) => !open)}
				>
					<span className="sr-only">
						{isOpen ? "Close navigation" : "Open navigation"}
					</span>
					{isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
				</button>

				<div
					id="primary-menu"
					className={`header-links ${isOpen ? "is-open" : ""}`}
				>
					{links.map((link) => (
						<Link
							key={link.label}
							to={link.to}
							hash={link.hash}
							className={`header-link ${activeHash === link.hash ? "is-active" : ""}`}
							onClick={() => {
								setActiveHash(link.hash);
								setIsOpen(false);
							}}
						>
							{link.label}
						</Link>
					))}
					<div className="header-social">
						<a
							href="https://www.linkedin.com"
							target="_blank"
							rel="noreferrer"
							aria-label="Brivio on LinkedIn"
						>
							<Linkedin aria-hidden="true" />
						</a>
						<a
							href="https://www.instagram.com"
							target="_blank"
							rel="noreferrer"
							aria-label="Brivio on Instagram"
						>
							<Instagram aria-hidden="true" />
						</a>
					</div>
				</div>
			</nav>
		</header>
	);
}
