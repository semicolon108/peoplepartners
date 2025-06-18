// components/layout/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react'; // Using a proper icon

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Why Choose Us?', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

const services = [
  { name: 'Payroll Services', href: '/services/payroll' },
  { name: 'PEO / Employer of Record', href: '/services/peo' },
  { name: 'Business Process Outsourcing', href: '/services/bpo' },
  { name: 'Recruitment Services', href: '/services/recruitment' },
  { name: 'Career Transitioning', href: '/services/career-transitioning' },
  { name: 'HR Consulting', href: '/services/hr-consulting' },
  { name: 'Visa & Immigration', href: '/services/visa' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-white/80 backdrop-blur-sm'
        }`}
    >
      <nav className="container flex justify-between items-center py-4">
        <Link href="/">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/24/108-PP-Logo-Final.svg"
            alt="People Partners Logo"
            width={150} // Adjust width as needed
            height={40}
            priority
          />
        </Link>
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 1).map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="font-medium text-slate-700 hover:text-brand-blue transition-colors">
                {link.name}
              </Link>
            </li>
          ))}

          {/* --- FIX IS HERE --- */}
          {/* 1. Add padding-bottom to the group to create the "bridge" */}
          <li className="relative group pb-4 -mb-4">
            <Link href="/#services" className="font-medium text-slate-700 hover:text-brand-blue transition-colors flex items-center gap-1">
              Services <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
            </Link>
            {/* 2. Remove the margin-top (mt-2) from the dropdown div */}
            <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 invisible group-hover:visible transform group-hover:translate-y-0 translate-y-2">
              {services.map((service) => (
                <Link key={service.name} href={service.href} className="block w-full text-left px-4 py-2 text-slate-700 rounded-md hover:bg-slate-100 hover:text-brand-blue">
                  {service.name}
                </Link>
              ))}
            </div>
          </li>
          {/* --- END OF FIX --- */}

          {navLinks.slice(1).map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="font-medium text-slate-700 hover:text-brand-blue transition-colors">
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            <Link href="/contact#consultation" className="bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Get Consultation
            </Link>
          </li>
        </ul>
        <div className="lg:hidden">
          <button className="text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}