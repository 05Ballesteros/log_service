# Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Etapa final
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/*.json .                                  
EXPOSE 4800
CMD ["node", "dist/main"]
 
 