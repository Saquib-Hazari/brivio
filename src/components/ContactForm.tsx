import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { sendContactInquiry } from "../lib/contact.functions";

export function ContactForm() {
	const successMessageRef = useRef<HTMLHeadingElement>(null);
	const [status, setStatus] = useState<"idle" | "sending" | "ready" | "error">(
		"idle",
	);

	useEffect(() => {
		if (status === "ready") successMessageRef.current?.focus();
	}, [status]);

	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		if (!form.reportValidity()) return;

		try {
			setStatus("sending");
			const data = new FormData(form);
			await sendContactInquiry({
				data: {
					name: String(data.get("name") ?? ""),
					email: String(data.get("email") ?? ""),
					message: String(data.get("message") ?? ""),
				},
			});
			setStatus("ready");
		} catch {
			setStatus("error");
		}
	}

	return (
		<section id="contact-form" className="contact-section">
			<div className="site-container contact-grid">
				<div>
					<p className="eyebrow">Start a conversation</p>
					<h2 data-heading-reveal>
						Build the growth system your business deserves.
					</h2>
					<p>
						Tell us where growth is getting stuck. We will respond with the
						clearest next move across SEO, AEO, GEO, social distribution, and
						conversion.
					</p>
					<a className="contact-email" href="mailto:hello@brivio.tech">
						<Mail aria-hidden="true" /> hello@brivio.tech
					</a>
				</div>
				<form className="contact-form" onSubmit={submit} noValidate>
					{status === "ready" ? (
						<output className="form-success" aria-live="polite">
							<CheckCircle2 aria-hidden="true" />
							<h3 ref={successMessageRef} tabIndex={-1}>
								Your inquiry is on its way.
							</h3>
							<p>
								Thanks for reaching out. We will review your growth goal and
								respond to your work email soon.
							</p>
							<button
								className="text-link form-reset"
								type="button"
								onClick={() => setStatus("idle")}
							>
								Edit inquiry
							</button>
						</output>
					) : (
						<>
							{status === "error" ? (
								<p className="form-error" role="alert">
									We could not send your inquiry. Please try again or email
									hello@brivio.tech directly.
								</p>
							) : null}
							<label>
								Name
								<input
									name="name"
									autoComplete="name"
									placeholder="e.g. Alex Morgan"
									required
								/>
							</label>
							<label>
								Email address
								<input
									name="email"
									type="email"
									autoComplete="email"
									placeholder="alex@yourcompany.com"
									required
								/>
							</label>
							<label>
								What would you like to grow?
								<textarea
									name="message"
									rows={4}
									placeholder="For example: improve qualified leads from search, AI answers, social, and our website."
									required
								/>
							</label>
							<button
								className="button button-yellow"
								type="submit"
								disabled={status === "sending"}
							>
								{status === "sending" ? "Sending inquiry…" : "Send inquiry"}{" "}
								<ArrowRight aria-hidden="true" />
							</button>
							<p className="form-note">
								Your inquiry is sent securely to the Brivio team.
							</p>
						</>
					)}
				</form>
			</div>
		</section>
	);
}
