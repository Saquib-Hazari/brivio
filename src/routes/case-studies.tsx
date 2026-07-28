import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/case-studies")({
	component: CaseStudies,
});
function CaseStudies() {
	return <Navigate to="/" hash="work" />;
}
