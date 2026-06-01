# ─── Stage 1: Dependencies ────────────────────────────────────────────────────
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# ─── Stage 2: Builder ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_ADMIN_PIN
ARG NEXT_PUBLIC_MODULES_ENDPOINT
ARG NEXT_PUBLIC_GOOGLE_FORM_URL

ENV NEXT_PUBLIC_ADMIN_PIN=$NEXT_PUBLIC_ADMIN_PIN
ENV NEXT_PUBLIC_MODULES_ENDPOINT=$NEXT_PUBLIC_MODULES_ENDPOINT
ENV NEXT_PUBLIC_GOOGLE_FORM_URL=$NEXT_PUBLIC_GOOGLE_FORM_URL
ENV NEXT_TELEMETRY_DISABLED=1

# Ensure a public/ folder always exists so the runner COPY never fails
RUN mkdir -p public

RUN npm run build

# ─── Stage 3: Runner ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# public/ is now guaranteed to exist in the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
