import molinoPastelloLogo from "../../../UI/logos/Molino new logo.png";

const feedback = [
	"Clear strategy, fast execution, and a team that made a complex project feel manageable.",
	"The work gave our team a sharper story and a much stronger path from interest to action.",
	"Thoughtful, collaborative, and relentlessly focused on the outcomes that mattered to us.",
] as const;

const middleTiles = [
	{ id: "middle-a", label: "Bloombaby", className: "client-tile-pyramid-1" },
	{
		id: "middle-b",
		label: "Virtual Portfolio",
		href: "https://tanstack-start-app.saquibhazari1000.workers.dev/",
		className: "client-tile-pyramid-2",
	},
	{ id: "middle-c", label: "", className: "client-tile-pyramid-3" },
	{ id: "middle-d", label: "", className: "client-tile-pyramid-4" },
] as const;
const bottomTiles = [
	"bottom-a",
	"bottom-b",
	"bottom-c",
	"bottom-d",
	"bottom-e",
	"bottom-f",
] as const;

export function WorkShowcase() {
	return (
		<section
			id="work"
			className="work-showcase-section"
			aria-labelledby="work-heading"
		>
			<div className="site-container">
				<div className="work-section-heading">
					<p className="eyebrow">Selected work</p>
					<h2 data-heading-reveal id="work-heading">
						SELECTED CLIENTS
					</h2>
				</div>

				<div className="client-wall">
					<p className="client-wall-copy">
						Trusted by ambitious teams building brands, products, and digital
						experiences that need to move faster.
					</p>
					<a
						className="client-tile client-tile-top client-tile-pyramid-top-1"
						href="https://molino-pastello.saquibhazari1000.workers.dev/"
						target="_blank"
						rel="noreferrer"
						aria-label="Open Maleno Pastalo in a new tab"
					>
						<img
							className="client-tile-logo"
							src={molinoPastelloLogo}
							alt="Molino Pastello"
						/>
					</a>
					<a
						className="client-tile client-tile-top client-tile-pyramid-top-2"
						href="https://jupitr.studio/"
						target="_blank"
						rel="noreferrer"
						aria-label="Open Jupitr Studio in a new tab"
					>
						Jupitr Studio
					</a>
					{middleTiles.map((tile) =>
						tile.href ? (
							<a
								className={`client-tile client-tile-middle ${tile.className}`}
								href={tile.href}
								key={tile.id}
								target="_blank"
								rel="noreferrer"
								aria-label="Open Virtual Portfolio in a new tab"
							>
								{tile.label}
							</a>
						) : (
							<div
								className={`client-tile client-tile-middle ${tile.className}`}
								key={tile.id}
								aria-hidden={tile.label ? undefined : true}
							>
								{tile.label}
							</div>
						),
					)}
					{bottomTiles.map((tile, index) => (
						<div
							className={`client-tile client-tile-bottom client-tile-pyramid-bottom-${index + 1}`}
							key={tile}
							aria-hidden="true"
						/>
					))}
				</div>
			</div>

			<section className="feedback-marquee" aria-label="Client feedback">
				<div className="feedback-track">
					{feedback.map((quote) => (
						<blockquote key={quote}>
							<p>“{quote}”</p>
							<cite>Client feedback</cite>
						</blockquote>
					))}
					{feedback.map((quote) => (
						<blockquote key={`repeat-${quote}`} aria-hidden="true">
							<p>“{quote}”</p>
							<cite>Client feedback</cite>
						</blockquote>
					))}
				</div>
			</section>
		</section>
	);
}
