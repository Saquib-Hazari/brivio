import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
import { faqStructuredData } from "../components/FaqSection";
import Footer from "../components/Footer";
import Header from "../components/Header";

import appCss from "../styles.css?url";

const siteUrl = "https://brivio.tech";
const siteDescription =
	"Brivio is a performance-first digital agency connecting technical SEO, AEO, GEO, conversion design, fast development, and social distribution.";

const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": `${siteUrl}/#organization`,
			name: "Brivio",
			url: siteUrl,
			email: "hello@brivio.tech",
			description: siteDescription,
		},
		{
			"@type": "WebSite",
			"@id": `${siteUrl}/#website`,
			url: siteUrl,
			name: "Brivio",
			description: siteDescription,
			publisher: { "@id": `${siteUrl}/#organization` },
			inLanguage: "en",
		},
		{
			"@type": "ProfessionalService",
			"@id": `${siteUrl}/#service`,
			name: "Brivio Digital Performance Agency",
			url: siteUrl,
			description: siteDescription,
			provider: { "@id": `${siteUrl}/#organization` },
			areaServed: "Worldwide",
			serviceType: [
				"Technical SEO",
				"Answer Engine Optimization",
				"Generative Engine Optimization",
				"Conversion-focused web development",
				"Social demand generation",
			],
		},
		{
			"@type": "FAQPage",
			"@id": `${siteUrl}/#faq`,
			mainEntity: faqStructuredData,
		},
	],
};

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Brivio | SEO, AEO, GEO & Digital Performance Agency",
			},
			{
				name: "description",
				content: siteDescription,
			},
			{
				name: "robots",
				content: "index, follow, max-image-preview:large",
			},
			{
				name: "theme-color",
				content: "#000000",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: "Brivio",
			},
			{
				property: "og:title",
				content: "Brivio | Digital Performance Agency",
			},
			{
				property: "og:description",
				content: siteDescription,
			},
			{
				property: "og:url",
				content: siteUrl,
			},
			{
				property: "og:image",
				content: `${siteUrl}/og-image.png`,
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "Brivio | Digital Performance Agency",
			},
			{
				name: "twitter:description",
				content: siteDescription,
			},
			{
				name: "twitter:image",
				content: `${siteUrl}/og-image.png`,
			},
		],
		links: [
			{ rel: "canonical", href: siteUrl },
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
			{ rel: "manifest", href: "/site.webmanifest" },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400;1,14..32,500&family=Montserrat:ital,wght@0,500;0,600;0,700;1,500&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
	errorComponent: RootError,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			</head>
			<body>
				<a className="skip-link" href="#main-content">
					Skip to main content
				</a>
				<Header />
				{children}
				<Footer />
				<Scripts />
			</body>
		</html>
	);
}

function RootError({ error }: { error: Error }) {
	const router = useRouter();
	if (import.meta.env.DEV) console.error(error);

	return (
		<main id="main-content" className="route-state">
			<div>
				<p className="eyebrow">A temporary interruption</p>
				<h1>We could not load this view.</h1>
				<p>
					Your progress is safe. Retry the page, or return home and continue
					exploring Brivio.
				</p>
				<div className="route-state-actions">
					<button
						type="button"
						className="button button-yellow"
						onClick={() => router.invalidate()}
					>
						Try again
					</button>
					<Link to="/" className="text-link">
						Return home
					</Link>
				</div>
			</div>
		</main>
	);
}

function NotFound() {
	return (
		<main id="main-content" className="route-state">
			<div>
				<p className="eyebrow">404 / Page not found</p>
				<h1>This page is outside the system.</h1>
				<p>
					The address may have changed. Return to the homepage to explore our
					process, services, work, and contact options.
				</p>
				<Link to="/" className="button button-yellow">
					Return home
				</Link>
			</div>
		</main>
	);
}
