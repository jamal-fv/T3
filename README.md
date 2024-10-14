# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.




# Jamal's Step by Step Guide
1. Run `pnpm create t3-app@latest`
2. Run `pnpm install`
3. Run `pnpm run dev`

Env Variables:
1. Add the following to .env:
2. Update env.js
3. Add to vercel 


Supabase:
1. Create an account at supabase.com
2. Create a new project
3. Create a new database
4. Add the following to .env:
DATABASE_URL="postgresql://postgres.kccqqmtjipymwppeerep:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.kccqqmtjipymwppeerep:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"
5. Add the following to prisma/schema.prisma: directUrl = env("DIRECT_URL")
6. npx prisma migrate dev --name dev


Google Sign In:
1. Create project and create api key for OAUTH:
https://console.cloud.google.com/apis/credentials?referrer=search&authuser=1&project=t3-app-438616
2. Add the following to .env:
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
3. Edit auth.ts to add GoogleProvider copy discord provider and change the id and secret

Github Setup:
1. Use IDE vs code to auto init and push to github

Vercel:
1. Create an account at vercel.com
2. Link your project to your github repository
3. Add the following environment variables:
DATABASE_URL=""
SHADOW_DATABASE_URL=""
NEXTAUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
