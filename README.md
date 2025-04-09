# Conatus - AI Second Brain

Conatus is a next-generation AI platform that serves as your personal second brain, connecting to your favorite apps, aggregating content, and providing intelligent assistance with emotional awareness and persistent memory.

## Features

- **Conversational AI** with emotional intelligence and persistent memory
- **Tool Integrations** to automate tasks across 250+ apps (Gmail, Slack, Notion, etc.)
- **Social Feed** that aggregates content from Twitter, Reddit, News, and Twitch
- **Adaptive OWN Layer** that captures user tone/energy/intent for personalized interactions
- **Freemium/Pro Structure** with tiered access to advanced features

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS, deployed on Vercel
- **Backend**: AWS Lambda (Node.js), API Gateway
- **Database**: Supabase (PostgreSQL + pgvector)
- **Memory**: Mem0 for semantic memory and context
- **Rate Limiting**: Redis (Upstash)
- **Integrations**: Composio for third-party app connections
- **Payments**: Stripe for subscription management
- **Mobile**: Capacitor for iOS/Android app wrapping
- **Infrastructure**: AWS CDK (TypeScript)

## Project Structure

```
conatus/
├── infra/                  # AWS CDK infrastructure code
├── backend/                # Lambda functions
│   ├── chat-handler/       # Main chat processing Lambda
│   ├── aggregator/         # Social feed aggregation Lambda
│   └── stripe-webhook/     # Subscription management Lambda
└── conatus-web/            # Next.js frontend
    ├── app/                # Pages and routes
    ├── components/         # Reusable UI components
    └── lib/                # Utility functions and clients
```

## Prerequisites

Before you begin, ensure you have the following accounts and resources:

1. **AWS Account** with CLI configured
2. **Supabase Account** with a project created
3. **Composio Account** with API keys
4. **Mem0 Account** with API access
5. **Upstash Redis** instance
6. **Stripe Account** with products configured
7. **Vercel Account** for frontend deployment
8. **Node.js** v18 or higher installed locally

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/conatusassistant/conatus-ai.git
cd conatus-ai
```

### 2. Set Up Environment Variables

Create a `.env` file in each directory:

#### Frontend (.env.local in conatus-web/)

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_ENDPOINT=your-api-gateway-url
```

#### Backend (.env in backend/)

```
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
REDIS_URL=your-upstash-redis-url
MEM0_API_KEY=your-mem0-api-key
COMPOSIO_API_KEY=your-composio-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

#### Infrastructure (.env in infra/)

```
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
REDIS_URL=your-upstash-redis-url
MEM0_API_KEY=your-mem0-api-key
COMPOSIO_API_KEY=your-composio-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
```

### 3. Set Up Supabase

Execute the SQL script in the Supabase SQL Editor as found in the `database-setup.sql` file.

### 4. Deploy Backend Infrastructure

```bash
cd infra
npm install
npm run build
cdk deploy
```

Take note of the API Gateway URL from the output.

### 5. Start the Frontend

```bash
cd conatus-web
npm install
npm run dev
```

### 6. Deploy to Production

#### Frontend (Vercel)

Connect your GitHub repository to Vercel and configure the environment variables.

#### Backend (AWS)

The CDK deployment will handle this automatically.

## LLM Models and Routing

Conatus uses a multi-tiered approach to route user requests to the appropriate LLM model:

1. **Prompt Healing**: Gemini 1.5 Flash - analyzes user intent, emotion, and complexity
2. **Standard Queries**: GPT-4o mini - handles most day-to-day user requests
3. **Complex Tasks**: Gemini 2.5 Pro - for deep reasoning, complex analysis, and extensive context

This intelligent routing ensures cost efficiency while providing the right level of capability for each user request.

## Mobile App Deployment

To build the mobile app using Capacitor:

```bash
cd conatus-web
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init
# Configure capacitor.config.ts to point to your Next.js build output
npm run build
npx cap add ios
npx cap add android
npx cap sync
npx cap open ios  # To open in Xcode
npx cap open android  # To open in Android Studio
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with AWS CDK for infrastructure as code
- Uses Supabase for database and authentication
- Integrates with Composio for third-party app connections
- Uses Mem0 for advanced memory capabilities
- Leverages multiple LLM models for cost-efficient intelligence
