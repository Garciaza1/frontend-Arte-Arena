Frontend - Desafio Arte Arena
Descrição do Projeto
Este projeto é a interface frontend da aplicação Desafio Arte Arena, desenvolvida com Next.js. Ele visa fornecer uma plataforma interativa onde os usuários podem visualizar e interagir com o conteúdo disponibilizado no sistema.

Arquitetura:

Frontend: Desenvolvido com Next.js, proporcionando renderização do lado do servidor (SSR) e renderização estática (SSG).
API Backend: O frontend se comunica com a API backend, que fornece os dados necessários para renderizar as páginas.
Instruções de Instalação, Configuração e Execução
1. Clonando o Repositório
Primeiro, clone o repositório:

bash
Copiar
git clone https://github.com/seuusuario/desafio-arte-arena-frontend.git
cd desafio-arte-arena-frontend
2. Instalando Dependências
Instale as dependências do projeto com o comando:

bash
Copiar
npm install
Ou, se você estiver usando Yarn:

bash
Copiar
yarn install
3. Executando o Projeto Localmente
Para rodar o projeto localmente, execute o seguinte comando:

bash
Copiar
npm run dev
Ou, caso esteja usando Yarn:

bash
Copiar
yarn dev
Isso irá iniciar o servidor de desenvolvimento, e o frontend estará disponível em http://localhost:3000.

4. Configurações de Ambiente
Verifique o arquivo .env.local para configurar variáveis de ambiente como a URL do backend, entre outras. Exemplo:

env
Copiar
NEXT_PUBLIC_API_URL=http://localhost:8000/api
Este arquivo deve conter informações sensíveis como a URL da API, tokens de autenticação, etc. Certifique-se de que as variáveis de ambiente estejam configuradas corretamente antes de rodar o projeto.

CI/CD e Deploy no Kubernetes
1. Configurando Pipelines de CI/CD
Para configurar pipelines de CI/CD, podemos usar GitHub Actions, GitLab CI/CD, CircleCI, ou outras ferramentas, dependendo da sua escolha.

Aqui estão as etapas básicas para um pipeline simples de CI/CD:

Exemplo com GitHub Actions
Crie um arquivo .github/workflows/ci-cd.yml no repositório com a seguinte configuração:

yaml
Copiar
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: npm install

    - name: Build the project
      run: npm run build

    - name: Deploy to Kubernetes
      run: kubectl apply -f kubernetes/deployment.yaml
      env:
        KUBE_CONFIG: ${{ secrets.KUBE_CONFIG }}
Neste exemplo, estamos:

Fazendo checkout do código.
Instalando as dependências.
Rodando o comando de build do Next.js (npm run build).
Aplicando o deploy no Kubernetes com o arquivo deployment.yaml.
2. Deploy no Kubernetes
Para fazer o deploy no Kubernetes, siga os passos abaixo:

1. Criando o Deployment do Kubernetes
Crie o arquivo frontend-deployment.yaml:

yaml
Copiar
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: localhost/arte-arena-frontend:latest  # Nome da imagem Docker
          ports:
            - containerPort: 3000  # Porta que o Next.js está rodando
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80  # Porta pública
      targetPort: 3000  # Porta do container
  type: LoadBalancer  # Expõe o serviço externamente
Este arquivo cria:

Um Deployment com a imagem do seu frontend.
Um Service para expor a aplicação no Kubernetes.
2. Aplicando o Deployment no Kubernetes
Use o comando a seguir para aplicar o arquivo YAML:

bash
Copiar
kubectl apply -f kubernetes/frontend-deployment.yaml
Esse comando cria o deployment do frontend no Kubernetes e expõe a aplicação na porta 80 do serviço.

