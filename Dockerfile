FROM oven/bun:1.4.2

WORKDIR /app

# Install dependencies first so this layer is cached unless package files change
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

COPY . .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# SQLite needs a directory the non-root user can write to (it creates journal files next to the db)
RUN mkdir -p /data && chown bun:bun /data
ENV DB_PATH=/data/app.db

# Run as the non-root user that ships with the image
USER bun

CMD ["bun", "src/index.ts"]