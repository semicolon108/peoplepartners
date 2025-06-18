// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
// You can create a type for your service links for better maintenance
const services = [
  { name: "Payroll Services", href: "/services/payroll" },
  { name: "PEO / Employer of Record", href: "/services/peo" },
  { name: "Business Process Outsourcing", href: "/services/bpo" },
  { name: "Recruitment Services", href: "/services/recruitment" },
  { name: "Career Transitioning", href: "/services/career-transitioning" },
  { name: "HR Consulting", href: "/services/hr-consulting" },
  { name: "Visa & Immigration", href: "/services/visa" },
];

const companyLinks = [
  { name: "Why Choose Us?", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
  { name: "Free Consultation", href: "/contact#consultation" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue-dark text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Section 1: About */}
          <div className="footer-section">
            {/* <h3 className="mb-4 text-blue-400 font-semibold">
              People Partners Lao
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Your trusted HR partner in Laos. Comprehensive solutions for
              payroll, PEO services, recruitment, and HR consulting.
            </p> */}
            <Link href="/">
              {/* Add your logo to the public folder */}
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/24/108-PP-Logo-Final.svg"
                alt="People Partners Logo"
                width={150}
                height={40}
                priority
              />
            </Link>
            <div className="mt-4 text-slate-300">
              <strong className="text-white">📍 Address:</strong>
              <br />
              1st Floor, 108Hill Building 
              <br />
              Dongpaina Road, Saphanthong Village, Sisattanak District
              <br />
              Vientiane Capital, Lao PDR.
            </div>
          </div>

          {/* Section 2: Services */}
          <div className="footer-section">
            <h3 className="mb-4 text-blue-400 font-semibold">Our Services</h3>
            {services.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="block mb-2 text-slate-300 hover:text-white transition-colors"
              >
                {service.name}
              </Link>
            ))}
          </div>

          {/* Section 3: Company */}
          <div className="footer-section">
            <h3 className="mb-4 text-blue-400 font-semibold">Company</h3>
            {companyLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block mb-2 text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4">
              <strong className="text-white">Sister Company:</strong>
              <br />
              <a
                href="https://108.jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                108Jobs - Laos&apos; No. 1 Job Portal
              </a>
            </div>
          </div>

          {/* Section 4: Contact */}
          <div className="footer-section">
            <h3 className="mb-4 text-blue-400 font-semibold">
              Contact Information
            </h3>
            <div className="text-slate-300 space-y-4">
              <div>
                <strong>📞 Phone:</strong>
                <br />
                <a href="tel:+85621414148" className="hover:text-white">
                  +856 20 28811009
                </a>
              </div>
              <div>
                <strong>📧 Email:</strong>
                <br />
                <a
                  href="mailto:info@peoplepartnerslao.com"
                  className="hover:text-white"
                >
                  info@peoplepartnerslao.com
                </a>
              </div>
              <div>
                <strong>🕒 Business Hours:</strong>
                <br />
                Monday - Friday: 9:00 AM - 4:00 PM
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-gray-dark pt-4 text-center text-slate-400">
          <p>
            © {new Date().getFullYear()} People Partners Lao. All rights
            reserved. | Sister company of 108Jobs
          </p>
        </div>
      </div>
    </footer>
  );
}
