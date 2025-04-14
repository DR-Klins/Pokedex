# Pokédex App

A feature-rich and production-ready Pokédex built with **React Native**, designed with performance, modularity, and visual polish in mind.  
Fetches live data from the [PokéAPI](https://pokeapi.co/) and presents Pokémon cards with types, images, and stat visualizations.

It is made to look and feel like the retro Pokédex used by **Ash Ketchum** in the original Pokémon series.

---

## Screenshots



---

##  Features

-  Data fetching from PokéAPI
-  Modular architecture (separated components like `StatRow`, `PokemonImage`, `TypeList`)
-  ErrorBoundary for global crash handling
-  Fallback image support
-  Pokédex-inspired UI with Retro Design
-  High-performance scrolling with FlashList
-  Responsive layout for iOS and Android
-  Seamless navigation with React Navigation

---

## 🔧 Tech Stack

| Tool/Library            | Purpose                                  |
|------------------------|------------------------------------------|
| React Native            | Mobile app framework                     |
| React Navigation        | Navigation (stack)                       |
| TypeScript              | Type safety                              |
| Axios                   | HTTP client for PokéAPI                  |
| FlashList (Shopify)     | Smooth, performant list rendering        |
| FastImage               | Optimized image loading                  |
| React Native BootSplash | Splash screen integration                |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- React Native CLI
- Android Studio (for Android testing)
- Xcode (for iOS testing)
- CocoaPods (for iOS dependencies)
- Git

---

### Installation

```bash
git clone https://github.com/DR-Klins/Pokedex.git
cd pokedex
npm install
```

---

### Running the App

####  Android

```bash
npx react-native run-android
```

#### iOS

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

> Make sure Xcode is set up correctly and your simulator or iPhone is connected.

---


## Folder Structure

```
src/
  ├── api/               # Axios calls to PokéAPI
  ├── components/        # Modular UI components (e.g. PokemonImage, StatRow)
  ├── navigation/        # AppNavigator and routing config
  ├── screens/           # Home and Details screens
  ├── types/             # Shared TypeScript interfaces
  └── assets/            # Local images (Pokeball, Cloud bg, fallback.png)
```

---


## 📄 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Created by

**Klinsmann** – Mobile Developer  
React Native project powered by open-source APIs and built with production best practices.

