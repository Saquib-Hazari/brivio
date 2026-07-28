import { useEffect, useState } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const data = [
	{ month: "M1", visibility: 18, leads: 8 },
	{ month: "M2", visibility: 29, leads: 13 },
	{ month: "M3", visibility: 44, leads: 21 },
	{ month: "M4", visibility: 61, leads: 34 },
	{ month: "M5", visibility: 76, leads: 48 },
	{ month: "M6", visibility: 92, leads: 67 },
];

export function GrowthChart({
	title = "Search visibility growth",
}: {
	title?: string;
}) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => setIsMounted(true), []);

	return (
		<div className="growth-chart" role="img" aria-label={title}>
			<div className="chart-heading">
				<span>{title}</span>
				<strong>+273%</strong>
			</div>
			{isMounted ? (
				<ResponsiveContainer width="100%" height="88%">
					<AreaChart
						data={data}
						margin={{ top: 14, right: 6, bottom: 0, left: -24 }}
					>
						<defs>
							<linearGradient id="growth-fill" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stopColor="#22c763" stopOpacity={0.5} />
								<stop offset="100%" stopColor="#22c763" stopOpacity={0.02} />
							</linearGradient>
						</defs>
						<CartesianGrid
							stroke="#ffffff"
							strokeOpacity={0.15}
							vertical={false}
						/>
						<XAxis
							dataKey="month"
							stroke="#ffffff"
							strokeOpacity={0.65}
							tickLine={false}
							axisLine={false}
							tick={{ fontSize: 11 }}
						/>
						<YAxis
							stroke="#ffffff"
							strokeOpacity={0.65}
							tickLine={false}
							axisLine={false}
							tick={{ fontSize: 11 }}
						/>
						<Tooltip
							contentStyle={{
								background: "#0a0a0a",
								border: "1px solid rgba(255,255,255,.3)",
								borderRadius: "10px",
							}}
							labelStyle={{ color: "#fff" }}
							itemStyle={{ color: "#22c763" }}
							formatter={(value) => [`${value}%`, "Visibility"]}
						/>
						<Area
							type="monotone"
							dataKey="visibility"
							stroke="#22c763"
							strokeWidth={4}
							fill="url(#growth-fill)"
							activeDot={{ r: 6 }}
						/>
					</AreaChart>
				</ResponsiveContainer>
			) : (
				<div className="chart-loading">Loading performance signal…</div>
			)}
		</div>
	);
}
