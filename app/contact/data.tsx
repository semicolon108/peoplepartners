
// app/contact/data.tsx
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ContactLine {
  text: string;
  href?: string;
  target?: string; 
}
interface ContactDetail {
  icon: React.ReactNode;
  title: string;
  lines: ContactLine[];
}

export const contactDetails: ContactDetail[] =[
    {
        icon: <Mail />,
        title: "Email Us",
        lines: [
            { text: "info@peoplepartners.la", href: "mailto:info@peoplepartners.la" },
            { text: "We typically respond within 24 hours" }
        ]
    },
    {
        icon: <Phone />,
        title: "Call Us",
        lines: [
            { text: "+856 20 9968 6599", href: "tel:+8562028811009" },
            { text: "Mon - Fri: 9:00 AM - 4:00 PM (GMT+7)" }
        ]
    },
    {
        icon: <MapPin />,
        title: "Visit Our Office",
        lines: [
            { text: "108Hill Building, Vientiane, Laos" },
            { text: "Schedule an appointment for in-person meetings" }
        ]
    },
    {
        icon: <Globe />,
        title: "Sister Company",
        lines: [
            { text: "108Jobs", href: "https://www.108.jobs", target: "_blank" },
            { text: "Laos' #1 Job Portal" }
        ]
    }
];

export const servicesOfInterest = [
    { value: "payroll", label: "Payroll Services" },
    { value: "peo", label: "PEO / Employer of Record" },
    { value: "bpo", label: "Business Process Outsourcing" },
    { value: "recruitment", label: "Recruitment Services" },
    { value: "career", label: "Career Transitioning" },
    { value: "consulting", label: "HR Consulting" },
    { value: "visa", label: "Visa & Immigration" },
    { value: "other", label: "Other" },
];