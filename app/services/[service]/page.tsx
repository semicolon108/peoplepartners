// app/services/[service]/page.tsx
import { notFound, redirect } from 'next/navigation'

// List of valid services
const validServices = [
    'bpo',
    'career-transitioning',
    'hr-consulting',
    'payroll',
    'peo',
    'recruitment',
    'salary-survey',
    'visa'
] as const

export default function ServiceRedirect({
    params
}: {
    params: { service: string }
}) {
    // Validate service exists
    if (!validServices.includes(params.service as never)) {
        notFound()
    }

    // Redirect to the static service page
    redirect(`/services/${params.service}`)
}

// Generate static params for all services
export function generateStaticParams() {
    return validServices.map((service) => ({
        service,
    }))
}