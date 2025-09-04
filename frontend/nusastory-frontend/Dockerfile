# frontend/Dockerfile (letakkan di folder yang sama dengan package.json)
ARG VITE_BACKEND_ORIGIN
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV VITE_BACKEND_ORIGIN=$VITE_BACKEND_ORIGIN
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN printf "server { \
  listen 80; \
  server_name _; \
  root /usr/share/nginx/html; \
  location / { try_files \$uri /index.html; } \
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ { try_files \$uri =404; expires 30d; access_log off; } \
}\n" > /etc/nginx/conf.d/default.conf
