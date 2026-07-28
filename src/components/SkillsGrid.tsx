import {
	SiCloudflare,
	SiFigma,
	SiJavascript,
	SiMysql,
	SiNodedotjs,
	SiPostgresql,
	SiReact,
	SiSupabase,
	SiTanstack,
	SiTypescript,
} from "react-icons/si";

const skills = [
	{ label: "TanStack Start", Icon: SiTanstack, color: "#ff4154" },
	{ label: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
	{ label: "React JS", Icon: SiReact, color: "#61dafb" },
	{ label: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
	{ label: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
	{ label: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
	{ label: "SQL", Icon: SiMysql, color: "#4479a1" },
	{ label: "Cloudflare", Icon: SiCloudflare, color: "#f38020" },
	{ label: "Supabase", Icon: SiSupabase, color: "#3ecf8e" },
	{ label: "Figma", Icon: SiFigma, color: "#f24e1e" },
];

export function SkillsGrid() {
	return (
		<ul className="hero-skills" aria-label="Technical skills">
			{skills.map(({ label, Icon, color }) => (
				<li className="hero-skill" key={label} title={label}>
					<Icon aria-hidden="true" style={{ color }} />
					<span className="sr-only">{label}</span>
				</li>
			))}
		</ul>
	);
}
