export function CodingSketch() {
	return (
		<figure className="coding-sketch" aria-labelledby="coding-sketch-title">
			<figcaption id="coding-sketch-title">Engineering illustration</figcaption>
			<svg
				viewBox="0 0 640 520"
				role="img"
				aria-label="Bold black code editor and system architecture illustration"
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
					ENGINEERING
				</text>
				<g className="code-window">
					<rect x="72" y="120" width="322" height="270" rx="18" />
					<path d="M72 170h322" />
					<circle cx="105" cy="145" r="9" />
					<circle cx="132" cy="145" r="9" />
					<circle cx="159" cy="145" r="9" />
					<path d="M112 210h88M112 246h182M112 282h136M112 318h222M112 354h92" />
					<path d="M218 210h112M255 282h95M190 354h150" />
				</g>
				<g className="code-nodes">
					<rect x="445" y="145" width="100" height="52" rx="26" />
					<rect x="445" y="242" width="100" height="52" rx="26" />
					<rect x="445" y="339" width="100" height="52" rx="26" />
					<path d="M495 197v45M495 294v45" />
					<text x="465" y="177">
						API
					</text>
					<text x="456" y="274">
						CORE
					</text>
					<text x="450" y="371">
						SHIP
					</text>
				</g>
			</svg>
		</figure>
	);
}
