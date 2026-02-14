# LinkedIn Content Intelligence Platform

A high-performance, enterprise-grade web application designed for strategic LinkedIn content generation. Leveraging the Groq Llama 3.3 70B model, this platform provides near-instantaneous, high-fidelity content tailored for executive leadership and industry professionals.

## Technical Architecture

### Core Stack
- **Framework**: Next.js 15 (App Router)
- **Runtime**: Node.js
- **Language**: TypeScript (Strict Type Safety)
- **Styling**: Tailwind CSS with custom slate-based professional color palette
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Inference Engine**: Groq SDK (Llama-3.3-70b-versatile)

### Key Architectural Decisions
- **Prompt Engineering**: Dynamic prompt construction via a dedicated utility (`lib/buildPrompt.ts`) that enforces professional brand voices and eliminates common AI-generated markers.
- **Stateless Backend**: API routes handle LLM orchestration without the complexity of a persistent database, ensuring maximum portablity and speed.
- **Advanced UI/UX**:
    - Responsive grid system optimized for executive workflows.
    - Glassmorphism effects for a modern, high-contrast interface.
    - Real-time character count and copy-to-clipboard functionality.
    - Integrated skeleton loaders and robust error boundary handling.

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
The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Infrastructure Overview
- `app/api/generate/`: Main inference gateway.
- `components/`: Modular UI system following atomic design principles.
- `lib/`: Domain-specific logic and prompt configuration.

---
Developed for high-stakes professional environments and technical assessments.
**Developed by Rajneesh Verma**
