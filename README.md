# 🚀 Turborepo Nuxt Advanced

Turborepo Nuxt Advanced is a full-stack project using Turbo, TailwindCSS, TypeScript, and Bun as the package manager. This repository is configured with a monorepo setup using workspaces.

## 🏗️ Project Structure

- **📂 apps/**: Contains application-specific code.
- **📦 packages/**: Contains reusable package libraries.
- **🛠️ layers/**: Contains shared layers across the applications.

## ✅ Prerequisites

- 🟢 **Node.js** >= 18
- ⚡ **Bun** >= 1.1.29

## 📜 Scripts

- **`build`**: 🏗️ Build all apps and packages using Turbo.
- **`dev`**: 🔧 Start the development environment with Turbo and dotenv.
- **`start`**: 🚀 Run the project in production mode.
- **`lint`**: 🧹 Lint all files across the project.
- **`format`**: ✨ Format code with Prettier for `.ts`, `.tsx`, `.md`, `.vue`, and `.json` files.

## 🛠️ Technologies Used

- **⚡ Turbo**: For task and build orchestration in the monorepo.
- **🎨 TailwindCSS**: For utility-first CSS styling.
- **🔒 TypeScript**: For static typing in the project.
- **🚀 Bun**: A fast JavaScript runtime that manages the packages.
- **🌍 dotenv-cli**: To load environment variables from `.env` files.
- **🍃 MongoDB**: A NoSQL database for storing application data.
- **📦 Express**: A minimal Node.js framework for building APIs.
- **📝 Morgan**: HTTP request logger middleware for Node.js.
- **🔓 CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **✨ shadcn**: A customizable component library built with Tailwind CSS and Radix UI.
- **🧹 ESLint**: A pluggable linter tool to maintain code quality.
- **🌐 i18n**: For internationalization and localization support.
- **🖼️ lucide-icon**: An icon library for Nuxt.js applications.
- **🗝️ vaul-vue**: Vault component for Vue.js, managing privacy and security.
- **🗃️ Pinia**: A state management library for Vue.js.
- **🔌 vueuse**: A collection of Vue composition utilities.
- **⚡ SWC**: A super fast compiler for JavaScript and TypeScript.
- **🔑 uuid**: A library to generate unique IDs.
- **📦 Multer**: Middleware for handling `multipart/form-data` in file uploads.
- **🎥 BunnyCDN**: A powerful CDN for delivering video content.
- **🔐 jsonwebtoken**: A library to handle JWT authentication.
- **📁 shx**: A portable Shell script commands tool.
- **✅ Zod**: TypeScript-first schema validation for APIs.
- **🌍 Axios**: A promise-based HTTP client for making requests.

## 🧹 Env

```bash
PROJECT_TITLE=""
MONGODB_URI=""
SESSION_SECRET=""
SERVER_URI=""
CLIENT_URI=""
DISCORD_REDIRECT_URI="http://localhost:3000/callback/discord"
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
DISCORD_CLIENT_TOKEN=""
TWITCH_REDIRECT_URI="http://localhost:3000/callback/twitch"
TWITCH_CLIENT_ID=""
TWITCH_CLIENT_SECRET=""
GITHUB_REDIRECT_URI="http://localhost:3000/callback/github"
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
NODEMAILER_USER=""
NODEMAILER_PASS=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="eu-north-1"
AWS_BUCKET_NAME="bucket" 
MAX_FILE_SIZE=15728640
```

## 🖼️ Image

![image](https://github.com/user-attachments/assets/466b1a25-448b-4891-ac14-09c073b1c559)