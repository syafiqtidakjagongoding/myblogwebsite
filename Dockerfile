# Build stage
FROM node:22 AS build
WORKDIR /app

# Install Python 3.11 for building better-sqlite3
RUN apt-get update && apt-get install -y python3.11 python3.11-venv python3-pip make g++ && \
    ln -sf /usr/bin/python3.11 /usr/bin/python && \
    rm -rf /var/lib/apt/lists/*

COPY package.json ./

# Install deps
RUN npm install

# Rebuild better-sqlite3 with correct Python
RUN npm rebuild better-sqlite3

# Copy the entire project
COPY . .

RUN npm run build

# Production stage
FROM node:22 AS production
WORKDIR /app

# Copy blog.db if exists (use shell to handle missing file)
RUN test -f /app/blog.db && cp /app/blog.db /app/blog.db || echo "No blog.db found"

# Copy .output
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./

# Copy node_modules (including rebuilt better-sqlite3)
COPY --from=build /app/node_modules ./node_modules

# run the app
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
