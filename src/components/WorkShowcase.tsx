const feedback = [
	"Clear strategy, fast execution, and a team that made a complex project feel manageable.",
	"The work gave our team a sharper story and a much stronger path from interest to action.",
	"Thoughtful, collaborative, and relentlessly focused on the outcomes that mattered to us.",
] as const;

const middleTiles = [
	{ id: "middle-a", label: "Bloombaby" },
	{ id: "middle-b", label: "Virtual Portfolio" },
	{ id: "middle-c", label: "" },
	{ id: "middle-d", label: "" },
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
					<div className="client-tile client-tile-top">Maleno Pastalo</div>
					<div className="client-tile client-tile-top">Jupytr Studio</div>
					{middleTiles.map((tile) => (
						<div
							className="client-tile client-tile-middle"
							key={tile.id}
							aria-hidden={tile.label ? undefined : true}
						>
							{tile.label}
						</div>
					))}
					{bottomTiles.map((tile) => (
						<div
							className="client-tile client-tile-bottom"
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
