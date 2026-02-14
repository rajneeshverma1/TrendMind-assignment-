# LinkedIn Content Intelligence Platform

A high-performance, enterprise-grade web application designed for strategic LinkedIn content generation. Leveraging the Groq Llama 3.3 70B model, this platform provides near-instantaneous, high-fidelity content tailored for executive leadership and industry professionals.

**🔗 Live Demo**: [trend-mind-assignment-uxmg.vercel.app](https://trend-mind-assignment-uxmg.vercel.app/)

## Technical Architecture

### Core Stack
- **Framework**: Next.js 15 (App Router)
- **Runtime**: Node.js
- **Language**: TypeScript (Strict Type Safety)
- **Styling**: Tailwind CSS with a professional slate-based color palette
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Inference Engine**: Groq SDK (Llama-3.3-70b-versatile)

### Key Architectural Decisions
- **Prompt Engineering**: Dynamic prompt construction via a dedicated utility (`lib/buildPrompt.ts`) that enforces professional brand voices and eliminates common AI-generated markers.
- **Stateless Backend**: API routes handle LLM orchestration without the complexity of a persistent database, ensuring maximum portability and speed.
- **Advanced UI/UX**:
    - Responsive grid system optimized for executive workflows.
    - Glassmorphism effects for a modern, high-contrast interface.
    - Real-time character count and copy-to-clipboard functionality.
    - Integrated skeleton loaders and robust error boundary handling.

## Deployment & Production Readiness

The application is optimized for production deployment on **Vercel**. Key production features include:
- **Serverless API Routes**: Scalable processing of inference requests.
- **Optimized Build**: Minified assets and tree-shaken dependencies.
- **Edge-Ready Architecture**: Designed to stay responsive across global regions.

## Getting Started

### Prerequisites
- Node.js version 18.0 or higher.
- A valid Groq API Key.

### Installation
```bash
npm install
```

### Configuration
Create a `.env.local` file in the project root:
```env
GROQ_API_KEY=your_production_api_key
```

### Development Execution
```bash
npm run dev
```

## Project Structure
- `app/api/generate/`: Main inference gateway.
- `components/`: Modular UI system following atomic design principles.
- `lib/`: Domain-specific logic, voice configurations, and prompt builders.

---
Developed for high-stakes professional environments and technical assessments.
**Developed by Rajneesh Verma**
