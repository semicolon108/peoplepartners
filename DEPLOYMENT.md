# Deployment Guide

## 🚀 **Quick Deploy to Vercel (Recommended)**

### 1. **Prepare Repository**
```bash
# Ensure all changes are committed
git add .
git commit -m "Production ready build"
git push origin main
```

### 2. **Deploy to Vercel**
1. Visit [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Configure environment variables:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `FROM_EMAIL`
   - `TO_EMAIL`
4. Deploy

### 3. **Post-deployment**
- Test contact form functionality
- Verify all pages load correctly
- Check mobile responsiveness

## 🔧 **Alternative Deployment Options**

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables (same as Vercel)
```

### DigitalOcean App Platform
```yaml
# app.yaml
name: ppl-website
services:
- name: web
  source_dir: /
  github:
    repo: your-username/ppl2025
    branch: main
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: SMTP_HOST
    value: your-smtp-host
  # Add other environment variables
```

### AWS Amplify
1. Connect GitHub repository
2. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

## 🔒 **Security Configuration**

### Environment Variables
```bash
# Production environment variables
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL="People Partners Lao" <noreply@peoplepartnerslao.com>
TO_EMAIL=info@peoplepartnerslao.com

# Optional
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
SENTRY_DSN=https://your-sentry-dsn
```

### Domain Configuration
Update these files with your production domain:
- `app/layout.tsx` - metadata.metadataBase
- `app/sitemap.ts` - base URL
- `next.config.ts` - image domains if needed

## 📊 **Monitoring Setup**

### 1. **Error Monitoring (Sentry)**
```bash
npm install @sentry/nextjs
```

Add to `next.config.ts`:
```typescript
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: "your-org",
  project: "ppl-website",
});
```

### 2. **Analytics (Google Analytics)**
Add to `app/layout.tsx`:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

### 3. **Uptime Monitoring**
Recommended services:
- UptimeRobot (free)
- Pingdom
- StatusCake
- Better Uptime

## 🧪 **Testing Before Production**

### 1. **Local Production Build**
```bash
npm run build
npm start
```

### 2. **Test Checklist**
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Email delivery works
- [ ] Mobile responsiveness
- [ ] Page load speeds
- [ ] SEO meta tags
- [ ] Social media sharing

### 3. **Performance Testing**
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --output html --output-path ./lighthouse-report.html
```

## 🔄 **CI/CD Pipeline (GitHub Actions)**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🚨 **Rollback Procedures**

### Vercel Rollback
1. Go to Vercel dashboard
2. Select your project
3. Go to "Deployments" tab
4. Find previous working deployment
5. Click "Promote to Production"

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

## 📋 **Post-deployment Checklist**

### Immediate (0-1 hour)
- [ ] Site loads correctly
- [ ] Contact form works
- [ ] No console errors
- [ ] Mobile version works
- [ ] SSL certificate active

### Short-term (1-24 hours)
- [ ] Monitor error rates
- [ ] Check email delivery
- [ ] Verify analytics tracking
- [ ] Monitor performance metrics
- [ ] Test from different locations

### Long-term (1-7 days)
- [ ] Review error logs
- [ ] Analyze performance data
- [ ] Check SEO indexing
- [ ] Monitor uptime
- [ ] Review user feedback

## 🆘 **Troubleshooting**

### Common Issues

**Build Fails**
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Email Not Sending**
- Check SMTP credentials
- Verify firewall settings
- Test with different SMTP provider
- Check spam folders

**Performance Issues**
- Enable compression
- Optimize images
- Check bundle size
- Review third-party scripts

**404 Errors**
- Check routing configuration
- Verify file paths
- Review .htaccess or server config

### Support Contacts
- **Hosting Issues**: Contact your hosting provider
- **Code Issues**: Check GitHub issues or contact development team
- **Email Issues**: Contact your email provider

---

**Remember**: Always test in staging environment before deploying to production!