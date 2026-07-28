export function DeploySketch() {
	return (
		<figure className="deploy-sketch" aria-labelledby="deploy-sketch-title">
			<figcaption id="deploy-sketch-title">Deployment illustration</figcaption>
			<svg
				viewBox="0 0 640 520"
				role="img"
				aria-label="Bold black rocket launching from cloud infrastructure toward the web"
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
					GLOBAL RELEASE
				</text>
				<g className="deploy-cloud">
					<path d="M70 378h198c38 0 65-26 65-60 0-36-30-63-66-59-13-43-51-66-95-55-28 7-49 27-57 53-42-6-76 23-76 62 0 33 27 59 31 59z" />
					<path d="M92 411h192M119 438h138" />
					<rect x="104" y="299" width="67" height="42" rx="12" />
					<rect x="190" y="299" width="67" height="42" rx="12" />
				</g>
				<g className="deploy-rocket">
					<path d="M337 330c4-95 51-157 137-185 28 88 2 158-79 204l-58-19z" />
					<circle cx="426" cy="220" r="24" />
					<path d="M348 302l-58 21 54 37M393 339l-11 61 61-39" />
					<path d="M336 360l-61 74M363 377l-42 76" />
				</g>
				<g className="deploy-web">
					<circle cx="533" cy="156" r="46" />
					<path d="M487 156h92M533 110c19 24 19 68 0 92M533 110c-19 24-19 68 0 92" />
					<text x="501" y="163">
						WEB
					</text>
				</g>
			</svg>
		</figure>
	);
}
