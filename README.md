# IRA Barber

Aplicação web para agendamento de serviços em barbearias, com foco em uma experiencia responsiva para desktop e mobile. O projeto permite autenticação com Google, visualização de barbearias recomendadas, busca por estabelecimentos, reserva de horarios e gerenciamento dos agendamentos do usuario.

## O que o projeto faz

O **IRA Barber** foi desenvolvido para simular o fluxo de agendamento em uma barbearia moderna. Entre as principais funcionalidades, estao:

- login com conta Google;
- listagem de barbearias recomendadas e populares;
- busca de barbearias por nome;
- visualizacao de detalhes da barbearia e dos servicos disponiveis;
- criacao de agendamentos;
- listagem de agendamentos confirmados e finalizados;
- cancelamento de reservas futuras;
- interface adaptada para mobile e desktop.

## Tecnologias utilizadas

- **Next.js 16** com App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Prisma ORM**
- **PostgreSQL**
- **NextAuth.js** para autenticacao
- **React Hook Form + Zod** para formularios e validacao
- **date-fns** para manipulacao de datas
- **Radix UI / shadcn/ui** para componentes de interface
- **Docker Compose** para subir o banco localmente

## Como instalar e rodar localmente

### 1. Clone o repositorio

```bash
git clone git@github.com:icaroregis/ira-barber.git
cd ira-barber
```

### 2. Instale as dependencias

```bash
pnpm install
```

### 3. Configure as variaveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variaveis abaixo:

```env
DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/ira-barber?schema=public"
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"
NEXTAUTH_SECRET="seu_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Suba o banco de dados com Docker

```bash
docker compose up -d
```

### 5. Aplique as migrations

```bash
pnpm dlx prisma migrate dev
```

### 6. Popule o banco com dados iniciais

```bash
pnpm ts-node prisma/seed.ts
```

### 7. Rode a aplicacao

```bash
pnpm dev
```

Depois disso, acesse:

```text
http://localhost:3000
```

## Scripts disponiveis

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Screenshots do projeto

> Observacao: os screenshots anexados na conversa nao foram gravados automaticamente no workspace. O README ja ficou preparado para exibi-los assim que eles forem salvos em `docs/screenshots/` com os nomes abaixo.

### Sugestao de nomes para os arquivos

- `docs/screenshots/home-mobile.png`
- `docs/screenshots/bookings-mobile.png`
- `docs/screenshots/home-desktop.png`
- `docs/screenshots/bookings-details-desktop.png`

### Galeria

<p align="center">
  <img src="docs/screenshots/home-mobile.png" alt="Tela inicial mobile" width="24%" />
  <img src="docs/screenshots/bookings-mobile.png" alt="Tela de agendamentos mobile" width="24%" />
  <img src="docs/screenshots/home-desktop.png" alt="Tela inicial desktop" width="24%" />
  <img src="docs/screenshots/bookings-details-desktop.png" alt="Detalhes do agendamento no desktop" width="24%" />
</p>

## Link para o deploy

Nao encontrei um link de deploy configurado no repositorio ate o momento. Se voce publicar o projeto, vale adicionar aqui a URL final.

## Desafios enfrentados e como foram resolvidos

### 1. Responsividade entre mobile e desktop

O projeto precisou entregar uma experiencia consistente em telas bem diferentes. Isso foi resolvido separando as versoes mobile e desktop das principais features, enquanto um layout responsivo decide qual interface renderizar.

### 2. Autenticacao com persistencia de usuario

Foi necessario integrar login social sem complicar a experiencia do usuario. A combinacao de **NextAuth.js** com **Prisma Adapter** resolveu a autenticacao com Google e a persistencia das sessoes no banco.

### 3. Regras de negocio para agendamentos

Um ponto importante era evitar conflitos de horario e impedir acoes invalidas. Para isso, a aplicacao valida horarios ja reservados antes de criar um agendamento e permite cancelar apenas reservas futuras.

### 4. Organizacao dos dados no servidor

A listagem de agendamentos confirmados e finalizados precisava ser confiavel e performatica. A solucao foi buscar os dados no servidor, ordenar por data e separar os registros entre futuros e passados antes da renderizacao.
