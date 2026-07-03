// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";

// Categorized links to match Header.tsx
const employerLinks = [
  { name: "Recruitment Services", href: "/services/recruitment" },
  { name: "PEO / Employer of Record", href: "/services/peo" },
  { name: "Payroll Services", href: "/services/payroll" },
  { name: "Business Process Outsourcing", href: "/services/bpo" },
  { name: "HR Consulting", href: "/services/hr-consulting" },
  { name: "Visa & Immigration", href: "/services/visa" },
  { name: "Salary Survey", href: "/services/salary-survey" },
  { name: "Career Transitioning", href: "/services/career-transitioning" },
];

const candidateLinks = [
  { name: "Browse Jobs", href: "/careers" },
  { name: "Submit Your CV", href: "/apply" },
];

const companyLinks = [
  { name: "Why Choose Us?", href: "/about" },
  { name: "News & Insights", href: "/news" },
  { name: "Contact", href: "/contact" },
  { name: "Get Consultation", href: "/contact#consultation" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue-950 text-white py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Section 1: About */}
          <div className="footer-section">
            <Link href="/" className="block mb-6">
              <Image
                src="/PPL-Logo.svg"
                alt="People Partners Logo"
                width={150}
                height={40}
                priority
                className="w-[140px] h-auto"
              />
            </Link>
            <div className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-white block mb-2">📍 Address:</strong>
              1st Floor, 108Hill Building
              <br />
              Dongpaina Road, Saphanthong Village, Sisattanak District
              <br />
              Vientiane Capital, Lao PDR.
            </div>
          </div>

          {/* Section 2: For Employers */}
          <div className="footer-section">
            <h3 className="mb-4 text-brand-blue-400 font-semibold text-sm uppercase tracking-wider">
              For Employers
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              {employerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Section 3: For Candidates & Company */}
          <div className="footer-section">
            <div className="mb-8">
              <h3 className="mb-4 text-brand-blue-400 font-semibold text-sm uppercase tracking-wider">
                For Candidates
              </h3>
              <div className="flex flex-col gap-2.5 text-sm">
                {candidateLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-brand-blue-400 font-semibold text-sm uppercase tracking-wider">
                Company
              </h3>
              <div className="flex flex-col gap-2.5 text-sm">
                {companyLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <strong className="text-white block mb-1 text-xs uppercase tracking-wide opacity-80">
                    Sister Company:
                  </strong>
                  <a
                    href="https://108.jobs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white transition-colors hover:underline"
                  >
                    108.Jobs - Laos&apos; No. 1 Job Portal
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Contact */}
          <div className="footer-section">
            <h3 className="mb-4 text-brand-blue-400 font-semibold text-sm uppercase tracking-wider">
              Contact Information
            </h3>
            <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
              <div>
                <strong className="text-white block mb-1">📞 Phone:</strong>
                <a href="tel:+85621414148" className="hover:text-white transition-colors">
                  +856 20 28811009
                </a>
              </div>
              <div>
                <strong className="text-white block mb-1">📧 Email:</strong>
                <a
                  href="mailto:info@peoplepartners.la"
                  className="hover:text-white transition-colors"
                >
                  info@peoplepartners.la
                </a>
              </div>
              <div>
                <strong className="text-white block mb-1">🕒 Business Hours:</strong>
                Monday - Friday: 9:00 AM - 4:00 PM
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-gray-800 pt-8 mt-8 text-center text-slate-500 text-xs">
          <p>
            © {new Date().getFullYear()} People Partners Laos. All rights
            reserved. | Sister company of 108.Jobs
          </p>
        </div>
      </div>
    </footer>
  );
}
