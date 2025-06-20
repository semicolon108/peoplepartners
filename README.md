# People Partners Lao - Corporate Website

A modern, responsive website for People Partners Lao, built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Performance Optimized**: Image optimization, font optimization, code splitting
- **SEO Ready**: Structured metadata, sitemap, robots.txt
- **Security First**: Rate limiting, input sanitization, security headers
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Contact Form**: Secure email handling with validation and rate limiting
- **Accessibility**: WCAG compliant with proper focus management

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Email**: Nodemailer
- **Fonts**: Noto Sans (Google Fonts)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- SMTP server credentials for contact form

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ppl2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables:
   - SMTP configuration for email functionality
   - Other optional services (analytics, monitoring)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ppl2025/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (pages)/           # Page components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── home/             # Home page components
│   ├── layout/           # Layout components
│   ├── services/         # Service page components
│   └── shared/           # Shared components
├── lib/                  # Utility functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

Required variables (see `.env.example`):

- `SMTP_HOST` - Your SMTP server host
- `SMTP_PORT` - SMTP server port (usually 587)
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `FROM_EMAIL` - Sender email address
- `TO_EMAIL` - Recipient email address

### Security Features

- **Rate Limiting**: Contact form limited to 5 submissions per 15 minutes per IP
- **Input Sanitization**: All form inputs are sanitized to prevent XSS
- **Security Headers**: CSP, X-Frame-Options, X-Content-Type-Options
- **Email Validation**: Enhanced email format validation

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Setup

1. Set all required environment variables
2. Configure SMTP server
3. Add proper domain to metadata configuration
4. Set up monitoring and analytics (optional)

### Recommended Hosting

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: Optimized with code splitting and tree shaking

## 🔒 Security

- Rate limiting on contact form
- Input sanitization and validation
- Security headers configured
- HTTPS enforced in production
- Environment variables for sensitive data

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary and confidential to People Partners Lao.

## 🆘 Support

For technical support or questions, contact the development team.
