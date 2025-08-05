FROM node:22-alpine AS build

# Set workdir in docker container
WORKDIR /app

COPY package*.json .

# Install dependencies
RUN npm i

# Copy source code
COPY . .

ENV VITE_SUPABASE_URL="MY_APP_SUPABASE_URL"
ENV VITE_SUPABASE_ANON_KEY="MY_APP_SUPABASE_ANON_KEY"
ENV VITE_DB_PASS="MY_APP_DB_PASS"
ENV VITE_BASE_URL="MY_APP_BASE_URL"
ENV VITE_ENVIRONMENT="MY_APP_ENVIRONMENT"

RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the build output to the Nginx web server directory
COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80

# Adding healthcheck to container
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:80/ || exit 1

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]