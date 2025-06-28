# 1. Immagine base più leggera
FROM node:18.20-alpine

# 2. Imposta la working directory
WORKDIR /src

# 3. Imposta NODE_ENV
ENV NODE_ENV=production

# 4. Copia i file necessari
COPY package*.json ./

# 5. Copia tutto il resto
COPY . .

# 6. Espone la porta
EXPOSE 3003

# 7. Comando di default
CMD ["npm", "start"]