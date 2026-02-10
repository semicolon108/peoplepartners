
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, X, Menu } from 'lucide-react';

type NavItem = {
  name: string;
  href: string;
};

type NavGroup = {
  name: string;
  items: NavItem[];
};

type NavSection = {
  name: string;
  type: 'link' | 'dropdown';
  href?: string;
  items?: NavItem[];
  groups?: NavGroup[];
  width?: string;
};

const navigation: NavSection[] = [
  {
    name: 'For Employers',
    type: 'dropdown',
    width: 'w-72',
    groups: [
      {
        name: 'Find Talent',
        items: [
          //  { name: 'Highlight Candidates', href: '/candidates' },
          { name: 'Recruitment Services', href: '/services/recruitment' },
        ]
      },
      {
        name: 'HR Solutions',
        items: [
          { name: 'PEO / Employer of Record', href: '/services/peo' },
          { name: 'Payroll Services', href: '/services/payroll' },
          { name: 'Business Process Outsourcing', href: '/services/bpo' },
          { name: 'HR Consulting', href: '/services/hr-consulting' },
          { name: 'Visa & Immigration', href: '/services/visa' },
          { name: "Salary Survey", href: "/services/salary-survey" },
          { name: 'Career Transitioning', href: '/services/career-transitioning' },
        ]
      }
    ]
  },
  {
    name: 'For Candidates',
    type: 'dropdown',
    width: 'w-56',
    items: [
      { name: 'Browse Jobs', href: '/careers' },
      { name: 'Submit Your CV', href: '/apply' },
    ]
  },
  { name: 'Why Choose Us?', href: '/about', type: 'link' },
  { name: 'News & Insights', href: '/news', type: 'link' },
  { name: 'Contact', href: '/contact', type: 'link' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
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
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const toggleMobileSection = (name: string) => {
    setMobileExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpanded({});
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-sm shadow-md"
        : "bg-white/80 backdrop-blur-sm"
        }`}
    >
      <nav className="container flex justify-between items-center py-4 relative">
        <Link href="/">
          <Image
            src="/PPL-Logo.svg"
            alt="People Partners Logo"
            width={150}
            height={40}
            priority
            className="w-auto h-16"
            style={{ width: 'auto' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-700">
          {navigation.map((section) => (
            <li key={section.name} className="relative group">
              {section.type === 'link' ? (
                <Link href={section.href!} className="hover:text-brand-blue-600 transition-colors py-4">
                  {section.name}
                </Link>
              ) : (
                <div className="relative py-4">
                  <button className="flex items-center gap-1 hover:text-brand-blue-600 transition-colors focus:outline-none">
                    {section.name} <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 ${section.width || 'w-64'} bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 invisible group-hover:visible transform group-hover:translate-y-0 translate-y-2 overflow-hidden`}>
                    {section.items ? (
                      // Simple list
                      <div className="py-2">
                        {section.items.map(item => (
                          <Link key={item.name} href={item.href} className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-blue-600 text-slate-700">
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      // Grouped list
                      <div className="p-3 space-y-3 bg-white">
                        {section.groups?.map(group => (
                          <div key={group.name} className="border-b last:border-b-0 border-gray-100 pb-3 last:pb-0">
                            <h4 className="px-2 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{group.name}</h4>
                            {group.items.map(item => (
                              <Link key={item.name} href={item.href} className="block px-2 py-1.5 rounded-md hover:bg-slate-50 hover:text-brand-blue-600 text-slate-700 text-sm">
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}

          <li>
            <Link
              href="/contact#consultation"
              className="bg-brand-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Get Consultation
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-slate-800 p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Mobile Card Menu */}
          {mobileMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-80 bg-white shadow-2xl rounded-xl p-4 z-50 border border-gray-100 max-h-[85vh] overflow-y-auto"
            >
              <div className="space-y-1">
                {navigation.map((section) => (
                  <div key={section.name}>
                    {section.type === 'link' ? (
                      <Link
                        href={section.href!}
                        onClick={closeMobileMenu}
                        className="block px-4 py-3 font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
                      >
                        {section.name}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleMobileSection(section.name)}
                          className="w-full flex justify-between items-center px-4 py-3 font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
                        >
                          {section.name}
                          {mobileExpanded[section.name] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {mobileExpanded[section.name] && (
                          <div className="bg-slate-50 rounded-lg mx-2 mb-2 p-2">
                            {section.items && (
                              section.items.map(item => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={closeMobileMenu}
                                  className="block px-3 py-2 text-sm text-slate-600 hover:text-brand-blue-600 rounded-md"
                                >
                                  {item.name}
                                </Link>
                              ))
                            )}
                            {section.groups && (
                              section.groups.map(group => (
                                <div key={group.name} className="mb-3 last:mb-0">
                                  <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase">{group.name}</div>
                                  {group.items.map(item => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      onClick={closeMobileMenu}
                                      className="block px-3 py-2 text-sm text-slate-600 hover:text-brand-blue-600 rounded-md"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-4 mt-2 border-t border-gray-100">
                  <Link
                    href="/contact#consultation"
                    onClick={closeMobileMenu}
                    className="block w-full text-center bg-brand-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-brand-blue-700"
                  >
                    Get Consultation
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
