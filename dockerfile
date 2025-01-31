# Usando a imagem oficial do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json e package-lock.json para o container
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todos os arquivos do projeto para o container
COPY . .

# Expor a porta que o servidor do frontend irá rodar (padrão do Next.js é 3000)
EXPOSE 3000

# Comando para rodar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
