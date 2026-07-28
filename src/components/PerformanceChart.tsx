import { useEffect, useId, useState } from "react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	RadialBar,
	RadialBarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export type ChartVariant =
	| "area"
	| "bars"
	| "line"
	| "radar"
	| "donut"
	| "funnel"
	| "gauge"
	| "heatmap";

const trendData = [
	{ label: "Jan", organic: 31, paid: 18, partner: 12 },
	{ label: "Feb", organic: 44, paid: 25, partner: 18 },
	{ label: "Mar", organic: 39, paid: 34, partner: 22 },
	{ label: "Apr", organic: 58, paid: 31, partner: 29 },
	{ label: "May", organic: 66, paid: 42, partner: 37 },
	{ label: "Jun", organic: 83, paid: 54, partner: 46 },
];

const barData = [
	{ label: "Search", value: 84 },
	{ label: "Social", value: 61 },
	{ label: "Email", value: 47 },
	{ label: "Direct", value: 39 },
];

const radarData = [
	{ label: "Reach", value: 88 },
	{ label: "Trust", value: 72 },
	{ label: "Speed", value: 91 },
	{ label: "UX", value: 79 },
	{ label: "Intent", value: 83 },
];

const donutData = [
	{ label: "Organic", value: 36, color: "#237ded" },
	{ label: "Paid", value: 24, color: "#ef0612" },
	{ label: "Partner", value: 18, color: "#22c763" },
	{ label: "Email", value: 13, color: "#ff8c19" },
	{ label: "Direct", value: 9, color: "#8b5cf6" },
];

const funnelData = [
	{ label: "Discover", value: 100 },
	{ label: "Engage", value: 72 },
	{ label: "Convert", value: 46 },
	{ label: "Retain", value: 31 },
];

const heatmapData = [
	18, 46, 72, 34, 86, 58, 92, 63, 41, 76, 29, 67, 95, 52, 81,
];

const colors = {
	white: "#237ded",
	red: "#ef0612",
	yellow: "#ff8c19",
	blue: "#237ded",
	green: "#22c763",
} as const;

function ChartTooltip({ color }: { color: string }) {
	return (
		<Tooltip
			cursor={{ fill: "rgba(8,8,8,.06)" }}
			contentStyle={{
				background: "#ffffff",
				border: `1px solid ${color}`,
				borderRadius: "8px",
				boxShadow: "0 12px 26px rgba(0,0,0,.28)",
			}}
			labelStyle={{ color: "#080808", fontSize: 12, fontWeight: 700 }}
			itemStyle={{ color: "#080808", fontSize: 12 }}
		/>
	);
}

export function PerformanceChart({
	title,
	variant,
	tone = "yellow",
}: {
	title: string;
	variant: ChartVariant;
	tone?: keyof typeof colors;
}) {
	const [isMounted, setIsMounted] = useState(false);
	const [hoveredCell, setHoveredCell] = useState<number | null>(null);
	const gradientId = useId().replace(/:/g, "");
	const color = colors[tone];

	useEffect(() => setIsMounted(true), []);

	function renderChart() {
		switch (variant) {
			case "bars":
				return (
					<BarChart
						data={barData}
						margin={{ top: 18, right: 4, bottom: 0, left: -22 }}
					>
						<CartesianGrid stroke="rgba(8,8,8,.18)" vertical={false} />
						<XAxis
							dataKey="label"
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#242424", fontSize: 11 }}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#242424", fontSize: 11 }}
						/>
						<ChartTooltip color={color} />
						<Bar dataKey="value" fill={color} radius={[5, 5, 0, 0]} />
					</BarChart>
				);
			case "line":
				return (
					<LineChart
						data={trendData}
						margin={{ top: 18, right: 8, bottom: 0, left: -22 }}
					>
						<CartesianGrid stroke="rgba(8,8,8,.18)" vertical={false} />
						<XAxis
							dataKey="label"
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#242424", fontSize: 11 }}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#242424", fontSize: 11 }}
						/>
						<ChartTooltip color={color} />
						<Legend
							iconType="circle"
							iconSize={8}
							wrapperStyle={{ fontSize: 10 }}
						/>
						<Line
							type="monotone"
							dataKey="organic"
							name="Organic"
							stroke="#237ded"
							strokeWidth={3}
							dot={{ fill: "#237ded", r: 3 }}
							activeDot={{ r: 6 }}
						/>
						<Line
							type="monotone"
							dataKey="paid"
							name="Paid"
							stroke="#ef0612"
							strokeWidth={3}
							dot={{ fill: "#ef0612", r: 3 }}
							activeDot={{ r: 6 }}
						/>
						<Line
							type="monotone"
							dataKey="partner"
							name="Partner"
							stroke="#22c763"
							strokeWidth={3}
							dot={{ fill: "#22c763", r: 3 }}
							activeDot={{ r: 6 }}
						/>
					</LineChart>
				);
			case "radar":
				return (
					<RadarChart data={radarData} outerRadius="68%">
						<PolarGrid stroke="rgba(8,8,8,.22)" />
						<PolarAngleAxis
							dataKey="label"
							tick={{ fill: "#242424", fontSize: 11 }}
						/>
						<ChartTooltip color={color} />
						<Radar
							dataKey="value"
							stroke={color}
							fill={color}
							fillOpacity={0.4}
						/>
					</RadarChart>
				);
			case "donut":
				return (
					<PieChart>
						<ChartTooltip color={color} />
						<Pie
							data={donutData}
							dataKey="value"
							nameKey="label"
							innerRadius="42%"
							outerRadius="72%"
							paddingAngle={3}
							labelLine={false}
							label={({ value }) => `${value}%`}
						>
							{donutData.map((entry) => (
								<Cell key={entry.label} fill={entry.color} />
							))}
						</Pie>
						<Legend
							iconType="circle"
							iconSize={8}
							wrapperStyle={{ fontSize: 10 }}
						/>
					</PieChart>
				);
			case "funnel":
				return (
					<BarChart
						data={funnelData}
						layout="vertical"
						margin={{ top: 12, right: 16, bottom: 0, left: 18 }}
					>
						<XAxis type="number" hide domain={[0, 100]} />
						<YAxis
							type="category"
							dataKey="label"
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#242424", fontSize: 11 }}
							width={64}
						/>
						<ChartTooltip color={color} />
						<Bar dataKey="value" fill={color} radius={[0, 5, 5, 0]} />
					</BarChart>
				);
			case "gauge":
				return (
					<RadialBarChart
						cx="50%"
						cy="54%"
						innerRadius="60%"
						outerRadius="90%"
						startAngle={210}
						endAngle={-30}
						data={[{ label: "Readiness", value: 84, fill: color }]}
					>
						<RadialBar
							background={{ fill: "rgba(20,20,20,.18)" }}
							cornerRadius={8}
							dataKey="value"
						/>
						<ChartTooltip color={color} />
					</RadialBarChart>
				);
			default:
				return (
					<AreaChart
						data={trendData}
						margin={{ top: 18, right: 8, bottom: 0, left: -22 }}
					>
						<defs>
							<linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stopColor={color} stopOpacity={0.6} />
								<stop offset="100%" stopColor={color} stopOpacity={0.02} />
							</linearGradient>
						</defs>
						<CartesianGrid stroke="rgba(8,8,8,.18)" vertical={false} />
						<XAxis
							dataKey="label"
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#242424", fontSize: 11 }}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#242424", fontSize: 11 }}
						/>
						<ChartTooltip color={color} />
						<Area
							type="monotone"
							dataKey="value"
							stroke={color}
							strokeWidth={4}
							fill={`url(#${gradientId})`}
							activeDot={{ r: 6 }}
						/>
					</AreaChart>
				);
		}
	}

	return (
		<figure className="performance-chart">
			<figcaption className="sr-only">{title} performance chart</figcaption>
			{isMounted && variant === "heatmap" ? (
				<div className="chart-heatmap">
					{heatmapData.map((value, index) => (
						<button
							aria-label={`Search demand score ${value}`}
							className="heatmap-cell"
							key={value}
							onBlur={() => setHoveredCell(null)}
							onFocus={() => setHoveredCell(index)}
							onMouseEnter={() => setHoveredCell(index)}
							onMouseLeave={() => setHoveredCell(null)}
							style={{ backgroundColor: color, opacity: 0.25 + value / 130 }}
							type="button"
						/>
					))}
					{hoveredCell !== null ? (
						<span className="heatmap-tooltip">
							Demand score: {heatmapData[hoveredCell]}
						</span>
					) : null}
				</div>
			) : isMounted ? (
				<ResponsiveContainer width="100%" height="100%">
					{renderChart()}
				</ResponsiveContainer>
			) : (
				<div className="chart-loading">Loading performance signal…</div>
			)}
		</figure>
	);
}
