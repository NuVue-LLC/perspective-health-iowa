import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HIPAA Notice of Privacy Practices",
  description:
    "Perspective Health Iowa's HIPAA Notice of Privacy Practices - how we use and disclose your Protected Health Information and your rights regarding that information.",
};

export default function HipaaNoticePage() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container max-w-3xl">
        <p className="text-xs uppercase tracking-wider text-teal font-semibold mb-2">
          Perspective Health
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-3">
          Notice of Privacy Practices
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Effective Date: January 1, 2026
        </p>

        <div className="prose prose-gray max-w-none text-gray-700">
          <p className="font-semibold uppercase tracking-wide text-charcoal">
            This notice describes how medical information about you may be used
            and disclosed and how you can get access to this information.
            Please review it carefully.
          </p>

          <h2>Our Commitment to Your Privacy</h2>
          <p>
            Perspective Health is committed to protecting the privacy of your
            health information. This Notice of Privacy Practices describes how
            we may use and share your Protected Health Information (PHI) and
            your rights regarding that information. We are required by law to
            maintain the privacy of your PHI, provide you with this Notice, and
            abide by the terms described herein.
          </p>

          <h2>How We May Use and Disclose Your Health Information</h2>

          <h3>Uses and Disclosures for Treatment, Payment, and Operations</h3>
          <p>
            We may use and disclose your health information for the following
            purposes without your written authorization:
          </p>
          <ul>
            <li>
              <strong>Treatment:</strong> To provide, coordinate, or manage your
              healthcare and related services, including sharing information
              with other providers involved in your care.
            </li>
            <li>
              <strong>Payment:</strong> To obtain payment for services rendered,
              including submitting claims to your insurance company or other
              payer.
            </li>
            <li>
              <strong>Healthcare Operations:</strong> For internal business
              functions including quality assessment, staff training,
              accreditation, and administrative activities.
            </li>
          </ul>

          <h3>
            Other Permitted Uses and Disclosures (No Authorization Required)
          </h3>
          <ul>
            <li>As required by federal, state, or local law</li>
            <li>
              Public health activities (e.g., reporting communicable diseases to
              public health authorities)
            </li>
            <li>Health oversight activities by government agencies</li>
            <li>
              Judicial and administrative proceedings, when required by a court
              order or subpoena
            </li>
            <li>Law enforcement purposes, as permitted or required by law</li>
            <li>Coroners, medical examiners, and funeral directors</li>
            <li>Organ, eye, or tissue donation organizations</li>
            <li>Research purposes, subject to applicable legal requirements</li>
            <li>To avert a serious threat to health or safety</li>
            <li>
              Workers&rsquo; compensation, as authorized by and to the extent
              necessary for workers&rsquo; compensation laws
            </li>
            <li>
              Military and veterans&rsquo; activities, national security, and
              intelligence activities
            </li>
          </ul>

          <h3>Uses and Disclosures Requiring Your Written Authorization</h3>
          <p>
            The following uses and disclosures require your written
            authorization, which you may revoke at any time in writing:
          </p>
          <ul>
            <li>Psychotherapy notes (unless otherwise permitted by law)</li>
            <li>Marketing communications</li>
            <li>Sale of your health information</li>
            <li>
              Most uses and disclosures of your PHI not covered by this Notice
            </li>
          </ul>

          <h2>Your Rights Regarding Your Health Information</h2>

          <h3>Right to Access Your Records</h3>
          <p>
            You have the right to inspect and obtain a copy of your health
            information. Requests must be made in writing. We may charge a
            reasonable fee for copies. We may deny access in certain limited
            circumstances; if so, you may request a review of the denial.
          </p>

          <h3>Right to Request an Amendment</h3>
          <p>
            You may request that we amend health information we maintain about
            you if you believe it is inaccurate or incomplete. We may deny the
            request under certain conditions and will notify you of the reason
            in writing.
          </p>

          <h3>Right to an Accounting of Disclosures</h3>
          <p>
            You may request a list of disclosures we have made of your PHI for
            purposes other than treatment, payment, healthcare operations, and
            certain other exceptions, for up to six years prior to the date of
            your request.
          </p>

          <h3>Right to Request Restrictions</h3>
          <p>
            You may request restrictions on how we use or disclose your PHI. We
            are not required to agree to your request, except: we must agree to
            a restriction on disclosures to a health plan for services you (or
            someone on your behalf) paid for in full out-of-pocket.
          </p>

          <h3>Right to Request Confidential Communications</h3>
          <p>
            You may request that we communicate with you about your health
            information in a specific way or at a specific location (e.g., only
            at home or only by mail). We will accommodate reasonable requests.
          </p>

          <h3>Right to a Paper Copy of This Notice</h3>
          <p>
            You may request a paper copy of this Notice at any time, even if you
            have agreed to receive it electronically.
          </p>

          <h3>Right to Notification of a Breach</h3>
          <p>
            We are required to notify you in the event of a breach of your
            unsecured PHI, as required by the HITECH Act and applicable
            regulations.
          </p>

          <h3>Right to File a Complaint</h3>
          <p>
            If you believe your privacy rights have been violated, you may file
            a complaint with us or with the U.S. Department of Health and Human
            Services Office for Civil Rights. You will not be penalized for
            filing a complaint.
          </p>
          <ul>
            <li>
              Contact our Privacy Officer:{" "}
              <a href="mailto:privacy@perspectivehealthiowa.com">
                privacy@perspectivehealthiowa.com
              </a>
            </li>
            <li>
              HHS Office for Civil Rights:{" "}
              <a
                href="https://www.hhs.gov/ocr"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.hhs.gov/ocr
              </a>{" "}
              or 1-800-368-1019
            </li>
          </ul>

          <h2>Changes to This Notice</h2>
          <p>
            Perspective Health reserves the right to change the terms of this
            Notice and to make the new notice provisions effective for all PHI
            we maintain. We will post the revised Notice in our facility and on
            our website. You may request a copy of the current Notice at any
            time.
          </p>

          <h2>Contact Information</h2>
          <p>
            <strong>Privacy Officer</strong>
            <br />
            Perspective Health Iowa
            <br />
            8860 Northpark Dr, Suite 200
            <br />
            Urbandale, IA 50131
            <br />
            <a href="tel:5157240377">515-724-0377</a>
            <br />
            <a href="mailto:info@perspectivehealthiowa.com">
              info@perspectivehealthiowa.com
            </a>
          </p>
          <p>
            <strong>HHS Office for Civil Rights</strong>
            <br />
            200 Independence Ave., S.W.
            <br />
            Washington, D.C. 20201
            <br />
            Phone: 1-800-368-1019
            <br />
            Website:{" "}
            <a
              href="https://www.hhs.gov/ocr"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.hhs.gov/ocr
            </a>
          </p>

          <hr />
          <p className="text-sm text-gray-500">
            This Notice is effective January 1, 2026, and supersedes all prior
            notices.
          </p>
        </div>
      </div>
    </section>
  );
}
