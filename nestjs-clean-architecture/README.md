# nestjs-clean-architecture

Entrega: estrutura base de um projeto NestJS seguindo Clean Architecture + modularização. Projeto minimalista com um exemplo "Hello World".

## O que foi feito
- Reestruturado o projeto para respeitar as camadas/ módulos principais da Clean Architecture:
  - `interface` — define rotas e qual caso de uso executar.
  - `use-case` — orquestra o fluxo e executa regras de negócio (caso de uso).
  - `domain` — contém a lógica de domínio (a execução em si; aqui retorna "hello world!").
  - `infra` — responsável por detalhes de infraestrutura (ex.: BD). Neste deliverable não há integração real com infra.
- Criada a pasta externa `@libs/common` (vazia por enquanto) para futuras bibliotecas compartilhadas.
- Implementado um endpoint simples que retorna `"hello world!"` seguindo a separação das camadas acima.

## Estrutura principal
- src/
  - interface/
    - controllers/ (rotas e controllers)
    - dto/
    - http/ (módulo HTTP)
  - use-case/
    - services/ (orquestração do caso de uso)
    - dto/
  - domain/
    - entities/
    - value-objects/
    - repositories/
  - infra/
    - db/ (módulo de banco — placeholder)
    - repositories/
- @libs/
  - common/ (vazio)

## Como executar (local)
1. Instalar dependências:
   - npm install
2. Rodar em modo de desenvolvimento:
   - npm run start:dev
3. Acessar:
   - GET http://localhost:3000/  → resposta: "hello world!"

  ## Como executar com Docker

  1. Certifique-se que o Docker está rodando na sua máquina.
  2. Navegue para a pasta do projeto:
    - cd nestjs-clean-architecture
  3. Para iniciar os serviços (UFBank API + Pagamentos) em modo desenvolvimento:
    - docker compose up --build
  4. Acesse a API em:
    - UFBank API: http://localhost:3000
    - Pagamentos (TCP): porta 3001 (comunicação via TCP entre containers)
  5. Para parar os serviços:
    - docker compose down

## Observações
- Projeto pensado como base para evoluir: novos casos de uso, entidades e integrações de infra devem seguir a divisão modular apresentada.
- Não foram adicionadas integrações com banco de dados ou serviços externos — pasta `infra` serve como local para esses ajustes futuros.
