
import { Trophy, Target, Star, Globe, ShieldCheck, HandCoins, HeartHandshake, Rocket, Handshake, Lock } from 'lucide-react';

// Data for the entire page, centralized for easy maintenance
export const serviceData = {
    title: 'Why Choose Us?',
    hero: {
        title: "Why Choose People Partners Laos?",
        description: "Your trusted HR partner in Laos, combining deep local expertise with international standards to deliver exceptional results for over a decade.",
        icon: <HeartHandshake />, // A fitting icon for partnership
        buttonText: "Get Consultation",
        buttonLink: "/contact#consultation",
    },
    storyHighlights: [
        { icon: <Trophy />, title: "Sister company of 108Jobs", description: "Laos' leading job portal since 2011" },
        { icon: <Target />, title: "Proven Track Record", description: "14+ years of HR excellence in Laos" },
        { icon: <Star />, title: "Trusted by Multinationals", description: "Supporting global businesses in Laos" },
    ],
    uspCards: [
        { icon: <Globe />, title: "Local Expertise, Global Standards", description: "Deep understanding of Lao regulations, business culture, and labor laws combined with international HR best practices." },
        { icon: <ShieldCheck />, title: "100% Compliance Guarantee", description: "Stay fully compliant with ever-changing Lao labor laws, tax regulations, and social security requirements." },
        { icon: <HandCoins />, title: "Cost-Effective Solutions", description: "Reduce operational costs by up to 40% compared to managing HR in-house. Transparent and scalable solutions." },
        { icon: <Rocket />, title: "Rapid Market Entry", description: "Enter the Lao market quickly without establishing a legal entity via our PEO services." },
        { icon: <Handshake />, title: "Dedicated Support", description: "Personalized service with dedicated account managers and proactive communication. Your success is our priority." },
        { icon: <Lock />, title: "Data Security & Privacy", description: "Bank-level security protocols, encrypted data storage, and strict confidentiality measures protect your sensitive HR info." },
    ],
    teamSections: [
        { image: "/team/1. keovisouk.jpg", name: "Keovisouk Dalasane", role: "Founder and Managing Director", bio: "Leading the vision and strategy for People Partners Laos." },
        { image: "/team/14. Phoutthalak.jpg", name: "Phoutthalak Phansalithong", role: "Acting General Manager", bio: "Overseeing daily operations and ensuring service excellence." },
        { image: "/team/2. Toui.jpg", name: "Phetsamone Dalasane", role: "Chief Financial Officer", bio: "Managing financial strategy and compliance." },
        { image: "/team/4.khaek.jpg", name: "Douangnaly Keokachay", role: "Hiring Solution & Staff Outsourcing Team Leader", bio: "Expert in mass recruitment and outsourcing solutions." },
        { image: "/team/13. Toutou.jpg", name: "Phonethida Thorchamlernshouk", role: "Recruitment Specialist", bio: "Specializing in talent acquisition and candidate placement." },
        { image: "/team/15. larnoy.jpg", name: "Larnoy Pholavanh", role: "EOR and Payroll Specialist", bio: "Ensuring accurate and timely payroll for our clients." },
        { image: "/team/16. Tik.jpg", name: "Phitsamay Sivilay", role: "Recruitment Specialist", bio: "Connecting top talent with leading organizations." },
    ],
    testimonials: [
        { quote: "People Partners Laos made our expansion into Laos seamless. Their deep local knowledge combined with international standards gave us the confidence to focus on our core business.", author: "Regional Manager", company: "International Trading Company" },
        { quote: "The payroll accuracy and compliance expertise is outstanding. We've hardly had any issues with tax filings or social security, and their reporting gives us complete visibility.", author: "Country Manager", company: "International Tech Company" },
        { quote: "Their Recruitment services allowed us to hire our employees in Laos within weeks instead of months. The process was smooth, compliant, and cost-effective. Highly recommended.", author: "HR Manager", company: "International Organization" },
    ],
    finalCTA: {
        title: "Ready to Partner with Us?",
        description: "Join the growing number of successful businesses that trust People Partners Laos with their HR needs. Let's discuss how we can support your growth in Laos.",
        buttonText: "Schedule a Consultation",
        buttonLink: "/contact#consultation",
    }
};