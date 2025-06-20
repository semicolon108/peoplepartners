"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Why Choose Us?', href: '/about' },
  { name: 'Opening Positions', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

const services = [
  { name: 'Payroll Services', href: '/services/payroll' },
  { name: 'PEO / Employer of Record', href: '/services/peo' },
  { name: 'Business Process Outsourcing', href: '/services/bpo' },
  { name: 'Recruitment Services', href: '/services/recruitment' },
  { name: 'Career Transitioning', href: '/services/career-transitioning' },
  { name: "Salary Survey", href: "/services/salary-survey" },
  { name: 'HR Consulting', href: '/services/hr-consulting' },
  { name: 'Visa & Immigration', href: '/services/visa' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
        setServicesOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }; 

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className="container flex justify-between items-center py-4 relative">
        <Link href="/">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/24/108-PP-Logo-Final.svg"
            alt="People Partners Logo"
            width={150}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center lg:gap-4 xl:gap-8 lg:text-sm xl:text-base">
          {navLinks.slice(0, 1).map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="font-medium text-slate-700 hover:text-brand-blue-600 transition-colors">
                {link.name}
              </Link>
            </li>
          ))}

          <li className="relative group pb-4 -mb-4">
            <Link href="/#services" className="font-medium text-slate-700 hover:text-brand-blue-600 transition-colors flex items-center gap-1">
              Services <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 invisible group-hover:visible transform group-hover:translate-y-0 translate-y-2">
              {services.map((service) => (
                <Link key={service.name} href={service.href} className="block w-full text-left px-4 py-2 text-slate-700 rounded-md hover:bg-slate-100 hover:text-brand-blue-600">
                  {service.name}
                </Link>
              ))}
            </div>
          </li>

          {navLinks.slice(1).map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="font-medium text-slate-700 hover:text-brand-blue-600 transition-colors">
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/contact#consultation"
              className="bg-gradient-to-r from-brand-blue-700 to-brand-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Get Consultation
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-slate-800"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Mobile Card Menu */}
          {mobileMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl p-4 z-50 space-y-2"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block text-slate-700 font-medium px-3 py-2 rounded hover:bg-slate-100"
                >
                  {link.name}
                </Link>
              ))}

              {/* Accordion for Services */}
              <div className="border-t pt-3">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex justify-between items-center px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 rounded"
                >
                  Services
                  {servicesOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {servicesOpen && (
                  <div className="mt-1 pl-3">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        onClick={handleLinkClick}
                        className="block text-sm text-slate-600 py-1 px-2 rounded hover:bg-slate-100 hover:text-brand-blue-600"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/contact#consultation"
                onClick={handleLinkClick}
                className="block text-center bg-brand-blue text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 mt-2"
              >
                Get Consultation
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
