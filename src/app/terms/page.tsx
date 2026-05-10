import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for the Perspective Health Iowa website, including medical disclaimers, acceptable use, and limitations of liability.",
};

export default function TermsPage() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-3">
          Terms of Use
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Effective January 1, 2026
        </p>

        <div className="prose prose-gray max-w-none text-gray-700">
          <p>
            Welcome to the Perspective Health Iowa website (the &ldquo;Site&rdquo;).
            By accessing or using this Site, you agree to be bound by these
            Terms of Use (&ldquo;Terms&rdquo;). If you do not agree, please do
            not use the Site.
          </p>

          <h2>Not Medical Advice</h2>
          <p>
            The information on this Site is provided for general informational
            and educational purposes only. It is{" "}
            <strong>not a substitute for professional medical advice,
            diagnosis, or treatment</strong>. Always seek the advice of your
            physician or other qualified healthcare provider with any questions
            you may have regarding a medical condition. Never disregard
            professional medical advice or delay seeking it because of something
            you have read on this Site.
          </p>
          <p>
            If you think you may have a medical emergency, call your doctor or
            911 immediately. Reliance on any information provided on the Site
            is solely at your own risk.
          </p>

          <h2>No Doctor–Patient Relationship</h2>
          <p>
            Use of this Site, including the contact form, chat, or
            informational pages, does not create a doctor–patient or any
            similar professional relationship between you and Perspective
            Health Iowa. A patient relationship is established only after you
            schedule and attend an appointment and complete the appropriate
            intake forms.
          </p>

          <h2>Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use the Site in any way that violates applicable federal, state,
              or local law or regulation
            </li>
            <li>
              Attempt to gain unauthorized access to any portion of the Site,
              other accounts, or connected systems
            </li>
            <li>
              Interfere with or disrupt the Site, servers, or networks, or
              upload viruses, malware, or other harmful code
            </li>
            <li>
              Use any automated means (bots, scrapers) to access or collect
              information from the Site without our written permission
            </li>
            <li>
              Submit false, misleading, or fraudulent information through any
              form, chat, or other Site feature
            </li>
            <li>
              Use the Site to harass, abuse, or harm another person, or to
              impersonate any person or entity
            </li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content on this Site - including text, graphics, logos, images,
            and software - is the property of Perspective Health Iowa or its
            licensors and is protected by U.S. and international copyright,
            trademark, and other intellectual property laws. You may view and
            print pages from the Site for your own personal, non-commercial use
            only. You may not otherwise reproduce, distribute, modify, or
            create derivative works from any content without our prior written
            permission.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites or services that
            are not owned or controlled by Perspective Health Iowa. We are not
            responsible for the content, privacy policies, or practices of any
            third-party sites and do not endorse them. You access third-party
            sites at your own risk.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            The Site and all content are provided &ldquo;as is&rdquo; and
            &ldquo;as available&rdquo; without warranties of any kind, either
            express or implied, including without limitation warranties of
            merchantability, fitness for a particular purpose,
            non-infringement, accuracy, or that the Site will be uninterrupted
            or error-free. We do not warrant that the Site or its server are
            free of viruses or other harmful components.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Perspective Health Iowa,
            its affiliates, providers, employees, and agents shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising out of or related to your use of, or
            inability to use, the Site or any content on it, even if we have
            been advised of the possibility of such damages. Our total
            liability for any claim arising out of these Terms or your use of
            the Site shall not exceed one hundred dollars (USD $100).
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Perspective Health Iowa
            and its providers, employees, and agents from any claims,
            liabilities, damages, losses, and expenses (including reasonable
            attorneys&rsquo; fees) arising out of or related to your use of the
            Site, your violation of these Terms, or your violation of any
            rights of another.
          </p>

          <h2>Privacy</h2>
          <p>
            Your use of the Site is also governed by our{" "}
            <Link href="/privacy-policy">
              Privacy Policy and Notice of Privacy Practices
            </Link>
            , which describes how we handle your personal and health
            information.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Iowa, without
            regard to its conflict-of-laws provisions. Any dispute arising out
            of or related to these Terms or the Site shall be brought
            exclusively in the state or federal courts located in Polk County,
            Iowa, and you consent to the personal jurisdiction of those courts.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may revise these Terms from time to time. The most current
            version will always be posted on this page with an updated
            effective date. Your continued use of the Site after changes
            become effective constitutes your acceptance of the revised Terms.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <p>
            Perspective Health Iowa
            <br />
            8860 Northpark Dr., Suite 200
            <br />
            Urbandale, IA 50131
            <br />
            <a href="tel:5157240377">(515) 724-0377</a>
            <br />
            <a href="mailto:info@perspectivehealthiowa.com">
              info@perspectivehealthiowa.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
