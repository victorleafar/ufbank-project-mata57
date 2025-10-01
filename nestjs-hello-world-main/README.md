# Aplicação NestJS Hello World

Esta é uma aplicação simples "Hello World" construída com NestJS, Docker e Kubernetes. Este README explica como configurar e executar a aplicação.

## Pré-requisitos

Antes de começar, verifique se você tem instalado:

- Node.js (versão 14 ou superior)
- Docker
- Kubernetes (Minikube, Docker Desktop ou outro cluster)
- kubectl (ferramenta de linha de comando do Kubernetes)

## Estrutura do projeto

```
nestjs-hello-world
├── src
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   └── app.service.ts
├── k8s
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

## Instruções de configuração

### 1. Clonar o repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/victorleafar/nestjs-hello-world.git
cd nestjs-hello-world
```

### 2. Instalar dependências

Navegue até o diretório do projeto e instale as dependências necessárias:

```bash
npm install
```

### 3. Construir a imagem Docker

Construa a imagem Docker usando o Dockerfile fornecido:

```bash
docker build -t nestjs-hello-world .
```

### 4. Executar a aplicação localmente (opcional)

Você pode executar a aplicação localmente usando Docker Compose:

```bash
docker-compose up
```

A aplicação ficará acessível em: http://localhost:3000

## 5. Fazer deploy no Kubernetes
### 5.1. Iniciar o Minikube (se usar Minikube)

Se você estiver usando o Minikube, inicie-o executando o comando (substituindo o caminho se necessário):
```bash
& "C:\Program Files\Kubernetes\Minikube\minikube.exe" start
```

Caso queira evitar digitar o caminho completo do Minikube sempre, adicione-o ao PATH do Windows:
Abra Configurações → Sistema → Sobre → Configurações avançadas do sistema → Variáveis de Ambiente.
Edite a variável Path e adicione:
C:\Program Files\Kubernetes\Minikube
Reinicie o terminal.

### 5.2. Configurar Docker para o Minikube

Para usar a imagem local no Minikube sem precisar fazer push para um registro externo, execute:
```bash
& "C:\Program Files\Kubernetes\Minikube\minikube.exe" docker-env | Invoke-Expression
docker build -t nestjs-hello-world .
```
### 5.3. Aplicar as configurações do Kubernetes

Aplique as configurações do Kubernetes para implantar a aplicação:
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

Dica: Se ocorrer ImagePullBackOff, altere em k8s/deployment.yaml o imagePullPolicy para Never:

imagePullPolicy: Never

#### 5.4. Verificar status dos pods

Confira se os pods estão rodando:
```bash
kubectl get pods
```

Deve aparecer algo como:
```bash
NAME                                  READY   STATUS    RESTARTS   AGE
nestjs-hello-world-76f47f6fd7-vfb26   1/1     Running   0          10s
```
### 5.5. Acessar a aplicação

Para acessar a aplicação no Minikube:
```bash
& "C:\Program Files\Kubernetes\Minikube\minikube.exe" service nestjs-hello-world --url
```

Copie o URL retornado e cole no navegador.
