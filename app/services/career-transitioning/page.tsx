// app/services/career-transitioning/page.tsx
import type { Metadata } from 'next';
import CareerTransitioningView from './CareerTransitioningView';

export const metadata: Metadata = {
    title: 'Career Transitioning Services',
    description: 'Advance your career with professional coaching, CV optimization, and interview preparation. We help talented individuals unlock new opportunities and achieve their career goals in Laos\' competitive job market.',
}

export default function CareerTransitioningPage() {
    return <CareerTransitioningView />;
}
