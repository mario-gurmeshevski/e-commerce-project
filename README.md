# Makmela - Natural Honey & Bee Products E-commerce Platform

A modern, fully-featured e-commerce application specializing in natural honey and bee products, built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Product Catalog**: Browse various honey types, pollen, honeycomb, royal jelly, and propolis products
- **Product Filtering & Sorting**: Filter by category and sort by name or price
- **Shopping Cart**: Full-featured cart with state management
- **Checkout Process**: Secure checkout with order management
- **Blog Section**: Articles about bee products and health benefits
- **Health Information**: Detailed health and wellness content
- **Responsive Design**: Mobile-first responsive interface
- **Local Data Fallback**: Works with or without backend API
- **Multi-language Support**: Content in Macedonian and English

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v7
- **UI Components**: Headless UI, Heroicons
- **API**: Axios with fallback to local JSON data
- **State Management**: React Context API
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4.1

## 📦 Project Structure

```
src/
├── common/          # Shared components and routes
├── components/      # UI components organized by feature
│   ├── blog/        # Blog-related components
│   ├── cart/        # Shopping cart functionality
│   ├── common/      # Reusable UI components
│   ├── health/      # Health content components
│   ├── home/        # Homepage components
│   ├── policy/      # Policy pages
│   ├── shop/        # Shop and product components
│   └── small_pages/ # Additional pages (contact, about, etc.)
├── data/            # Local JSON data files
├── interfaces/      # TypeScript interfaces and enums
├── utils/           # Utility functions and constants
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd makmela-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

### Development Scripts

- `npm run dev` - Start development server
- `npm run host` - Start development server with host access
- `npm run build` - Build for production
- `npm run lint` - Lint code
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run generate-sitemap` - Generate sitemap.xml

## 🏪 API Configuration

The application can work with or without a backend API. Configuration is controlled in `src/utils/apiConfig.ts`:

```typescript
export const API_CONFIG = {
	useApi: false, // Toggle to enable/disable API usage
	baseUrl: 'http://localhost:3000',
	endpoints: {
		honey: '/api/honey',
		blog: '/api/blog',
		health: '/api/health',
		order: '/api/order',
		mail: '/api/mail',
		createOrder: '/api/order/create',
	},
	timeout: 5000,
}
```

When `useApi` is `false`, the application uses local JSON files in the `src/data/` directory as fallback data.

## 📊 Data Structure

The application manages several types of data:

- **Honey Products**: Name, price, stock, weight, category, flowers, aroma, consumption instructions
- **Blog Posts**: Articles about bee products and health
- **Health Information**: Wellness content
- **Orders**: Customer order management

## 🎨 UI Components

The application uses a variety of UI components:

- **Navigation & Footer**: Consistent layout across all pages
- **Product Cards**: Display product information with images
- **Filtering System**: Category tabs and sorting dropdowns
- **Shopping Cart**: Slide-in cart with item management
- **Image Zoom**: Medium-style image zoom for product details
- **Contact Forms**: With email validation and submission

## 📱 Supported Pages

- **Home**: Landing page with slideshow
- **Shop**: Product catalog with filtering and sorting
- **Product Details**: Detailed view for individual products
- **Blog**: Articles about bee products
- **Health**: Wellness and health information
- **Cart**: Shopping cart management
- **Checkout**: Secure checkout process
- **Order Confirmation**: Order details and confirmation
- **About Us**: Company information
- **Contact**: Contact form and information
- **Terms & Privacy**: Legal pages
- **Bee Pollen & Propolis**: Specialized product pages

## 🏗️ Architecture

- **State Management**: Custom React context for cart functionality
- **API Layer**: Axios-based client with fallback to local JSON data
- **Component Architecture**: Organized by features with reusable components
- **Data Fetching**: Caching for improved performance
- **Error Handling**: Graceful error handling with fallbacks
- **Accessibility**: Built with accessibility in mind using Headless UI

## 📁 Data Folders

- `/src/data/` - Contains JSON files for products, blog posts, health articles, and orders
- `/src/data/images/` - Product images and other assets
- `/public/` - Static assets like SVG icons

## 🔧 Customization

To customize the application:

1. **Update product data**: Modify files in `/src/data/`
2. **Change styling**: Update Tailwind configuration in `tailwind.config.js`
3. **Add routes**: Modify `src/common/routes.tsx`
4. **Change API endpoints**: Update `src/utils/apiConfig.ts`

## 🚀 Deployment

For deployment, run:

```bash
npm run build
```

The production-ready files will be in the `/dist/` folder. The application is configured for deployment on Vercel via `vercel.json`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues

If you encounter any issues, please open an issue in the GitHub repository with detailed information about the problem, including steps to reproduce.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Components from [Headless UI](https://headlessui.com/)
- UI notifications with [React Hot Toast](https://react-hot-toast.com/)
