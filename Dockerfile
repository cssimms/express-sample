FROM oven/bun:1.4.2

WORKDIR /app

# Install dependencies first so this layer is cached unless package files change
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

COPY . .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Run as the non-root user that ships with the image
USER bun

CMD ["bun", "index.ts"]