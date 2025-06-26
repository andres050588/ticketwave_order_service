# 1. Immagine base
FROM node:18

# 2. La directory di lavoro
WORKDIR /src

# 3. Copia package.json e package-lock.json
COPY package*.json ./

# 4. Installazione le dipendenze
RUN npm install

# 5. Si copia il resto del codice nell'immagine
COPY . .

# 6. Espone la porta
EXPOSE 3003

# 7. Comando di default per avviare il servizio
CMD ["npm", "start"]