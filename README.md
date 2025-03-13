# Spotify Clone

A personal project to recreate the Spotify experience with modern web technologies.

## 🎵 Features

- User authentication and profile management
- Music playback with controls (play, pause, skip, volume)
- Browse and search functionality
- Playlist creation and management
- Responsive design for desktop and mobile
- Real-time updates using WebSockets

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Node.js
- **Database**: Redis (using DragonflyDB)
- **Containerization**: Docker
- **Deployment**: Docker Compose

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or later)
- Docker and Docker Compose
- pnpm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/haouarihk/spotify.git
   cd spotify-clone
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Copy the environment file and configure it

   ```bash
   cp .env.example .env.local
   ```

4. Start the development server
   ```bash
   pnpm dev
   ```

### Docker Deployment

To run the application using Docker:
