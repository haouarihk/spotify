# --------------- TO BUILD THE PROJECT --------------------
FROM node:20-alpine AS builder
ARG DEBIAN_FRONTEND=noninteractive

# Install build dependencies for canvas
RUN apk add --no-cache \
  build-base \
  g++ \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev \
  python3 \
  pixman-dev \
  pkgconfig \
  libc6-compat

WORKDIR /app
COPY pnpm-lock.yaml package.json ./

ENV BUILD_ENV=building
ENV NEXT_TELEMETRY_DISABLED=1

RUN npx pnpm fetch

RUN npx pnpm install
RUN cd node_modules/canvas && npx pnpm rebuild

COPY . .
COPY public/fonts ./public/fonts


# Rebuild canvas for Alpine


# RUN npx prisma generate --no-engine

# build the project
RUN npm run build

# -------------------- TO RUN THE PROJECT ---------------
FROM oven/bun:alpine AS runner
RUN apk add --update nodejs iputils \
  cairo \
  jpeg \
  pango \
  giflib \
  pixman \
  libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/canvas/build/Release/canvas.node ./node_modules/canvas/build/Release/

RUN chmod -R 777 .next

CMD ["node", "server.js"]
