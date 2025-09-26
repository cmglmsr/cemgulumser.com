# GitHub Pages Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages with the custom domain `cemgulumser.com`.

## 🚀 What's Already Configured

✅ **Vite Configuration**: Updated to use correct base path for GitHub Pages  
✅ **GitHub Actions**: Automated deployment workflow  
✅ **Custom Domain**: CNAME file created for cemgulumser.com  
✅ **Build Scripts**: Added deploy script to package.json  

## 📋 Next Steps

### 1. Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository: `https://github.com/cmglmsr/cemgulumser.com`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 2. Configure Custom Domain

1. In the same **Pages** settings:
2. Under **Custom domain**, enter: `cemgulumser.com`
3. Check **Enforce HTTPS** (recommended)
4. Click **Save**

### 3. DNS Configuration

You need to configure your domain's DNS settings:

#### Option A: Using Apex Domain (cemgulumser.com)
Add these A records to your DNS:
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A  
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### Option B: Using CNAME (www.cemgulumser.com)
Add this CNAME record:
```
Type: CNAME
Name: www
Value: cmglmsr.github.io
TTL: 3600
```

### 4. Verify Deployment

1. **Check GitHub Actions**: Go to Actions tab in your repository
2. **Wait for deployment**: The workflow should run automatically after pushing
3. **Test the site**: Visit `https://cemgulumser.com` (may take 10-15 minutes for DNS propagation)

## 🔧 Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🐛 Troubleshooting

### Common Issues:

1. **404 Error**: Check that GitHub Pages is enabled and using GitHub Actions
2. **Domain not working**: Verify DNS settings and wait for propagation (up to 24 hours)
3. **Build fails**: Check GitHub Actions logs for specific errors
4. **Images not loading**: Ensure images are in the `public/images/` directory

### Check Deployment Status:

- **GitHub Actions**: `https://github.com/cmglmsr/cemgulumser.com/actions`
- **Pages Settings**: `https://github.com/cmglmsr/cemgulumser.com/settings/pages`

## 📁 File Structure

```
cemgulumser.com/
├── .github/workflows/deploy.yml  # GitHub Actions workflow
├── public/
│   ├── CNAME                     # Custom domain configuration
│   └── images/                   # Your portfolio images
├── src/
│   └── components/               # React components
├── vite.config.ts               # Vite configuration
└── package.json                 # Build scripts
```

## 🔄 Automatic Updates

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your React app
2. Deploy it to GitHub Pages
3. Update your live website

## 📞 Support

If you encounter any issues:
1. Check the GitHub Actions logs
2. Verify DNS settings with your domain provider
3. Ensure all files are committed and pushed to GitHub

Your portfolio should be live at `https://cemgulumser.com` once everything is configured!
