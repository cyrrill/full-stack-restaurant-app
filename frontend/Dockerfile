# Adapted from: https://nextjs.org/docs/deployment
#
# Install dependencies only when needed
FROM node:14 AS deps
WORKDIR /app
COPY package.json ./
RUN npm i --prefer-offline --no-audit

# Rebuild the source code only when needed
FROM node:14 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# From CloudBuild substitution variables
ARG _NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${_NEXT_PUBLIC_BACKEND_URL}
ARG _NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ARG _NEXT_PUBLIC_STRIPE_REDIRECT
ENV NEXT_PUBLIC_STRIPE_REDIRECT=${_NEXT_PUBLIC_STRIPE_REDIRECT}

# Build runtime optimized distribution
RUN npm run build

# Production image, copy all the files and run next
FROM node:14 AS runner
WORKDIR /app

ENV NODE_ENV production

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]