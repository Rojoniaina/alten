# Étape 1 : Build de l'application Vite
FROM node:22-alpine AS builder

WORKDIR /app
ARG API_VITE_URL

# Copie des dépendances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

# Build de l'application
RUN npm run build

# Étape 2 : Image de production avec Nginx
FROM nginx:1.27-alpine

# Copie ta config nginx (personnalisée)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie le build dans le dossier servi par Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
