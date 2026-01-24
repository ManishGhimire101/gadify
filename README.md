# यात्रा साथी - Nepal Public Transportation Locator System

A modern, offline-first public transportation tracking system designed specifically for Nepal's real-world connectivity conditions.

## 🚌 Features

- **Destination-First Search** - Search by where you want to go, not by vehicle numbers
- **Multi-Source Tracking** - GPS, crowdsourcing, BLE mesh, and landmark-based positioning
- **Confidence Indicators** - Visual transparency about data reliability
- **Offline-First Design** - Works with low/no connectivity
- **Nepal-Specific Vehicles** - Bus, Micro, Tempo, Magic, Jeep support
- **8-Page Landing Experience** - Black & white scroll-driven concept presentation

## 🎯 What Makes This Different

- Built for Nepal's real-world infrastructure
- Fits today's technology reality
- Low-data requirements
- Dual apps: Public & Driver versions
- Transportation intelligence, not just an app

## 🛠️ Tech Stack

- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **CSS3** - Custom responsive design

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Project Structure

```
gadify/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx          # 8-page intro experience
│   │   ├── SearchView.jsx           # Destination search
│   │   ├── NepalVehicleCard.jsx     # Vehicle cards
│   │   ├── NepalVehicleDetail.jsx   # Detailed view
│   │   └── VehiclesListView.jsx     # Scroll list
│   ├── data/
│   │   └── transportData.js         # Nepal vehicle data
│   ├── App.jsx                      # Main app
│   └── main.jsx                     # Entry point
├── public/                          # Static assets
└── package.json                     # Dependencies
```

## 🌐 Deployment

This app can be easily deployed to:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

## 👨‍💻 Developer

**Manish Ghimire**
- Website: [manishghimire.info.np](https://manishghimire.info.np)

## 📄 License

MIT License - feel free to use this project for learning and development.

---

**Note**: This is a prototype system demonstrating the concept of a Nepal-focused public transportation locator with real-world constraints in mind.
