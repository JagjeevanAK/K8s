# Stage 1: build
FROM node:23-alpine AS builder
WORKDIR /app

# install dependencies
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

# copy Prisma schema and application source
COPY prisma ./prisma
COPY src ./src

# generate Prisma client and compile TypeScript
RUN npx prisma generate
RUN npx tsc -b

# Stage 2: production
FROM node:23-alpine AS production
WORKDIR /app

# install only production dependencies
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --omit=dev

# copy Prisma schema and generate client in production
COPY prisma ./prisma
RUN npx prisma generate

# copy built code
COPY --from=builder /app/dist ./dist

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/server.js"]