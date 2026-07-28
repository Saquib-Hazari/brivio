export function DesignSketch() {
	return (
		<figure className="design-sketch" aria-labelledby="design-sketch-title">
			<figcaption id="design-sketch-title">
				Brand direction illustration
			</figcaption>
			<svg
				viewBox="0 0 640 520"
				role="img"
				aria-label="Bold black brand direction illustration with logo mark, typography, and layout cards"
			>
				<rect
					className="art-card"
					x="32"
					y="34"
					width="576"
					height="452"
					rx="26"
				/>
				<text className="art-kicker" x="72" y="83">
					BRAND SYSTEM
				</text>
				<g className="design-logo">
					<circle cx="184" cy="245" r="108" />
					<path d="M124 296l60-126 60 126-60-40z" />
					<circle cx="184" cy="245" r="27" />
				</g>
				<text className="art-display" x="72" y="404">
					FORM
				</text>
				<g className="design-layout">
					<rect x="338" y="134" width="206" height="112" rx="14" />
					<rect x="338" y="268" width="96" height="136" rx="14" />
					<rect x="450" y="268" width="94" height="136" rx="14" />
					<path d="M362 165h91M362 187h154M362 209h72M360 300h52M360 320h37M472 300h48M472 320h55" />
				</g>
				<g className="design-dots">
					<circle cx="305" cy="167" r="12" />
					<circle cx="305" cy="206" r="12" />
					<circle cx="305" cy="245" r="12" />
				</g>
			</svg>
		</figure>
	);
}
