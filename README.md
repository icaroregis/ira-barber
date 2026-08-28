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

## Arquitetura do projeto

Uma decisao de arquitetura deste projeto foi manter as **rotas do App Router o mais enxutas possivel**. Em vez de concentrar regra de negocio, busca de dados e composicao de interface dentro de `page.tsx`, cada rota funciona como um ponto de entrada simples que apenas delega a responsabilidade para um modulo da pasta `src/features`.

Na pratica, a ideia e:

- a pasta `src/app` cuida das rotas;
- a pasta `src/features` concentra a implementacao de cada modulo de tela;
- cada feature pode ter seu proprio `index.tsx`, versoes `mobile` e `desktop` e componentes internos;
- componentes compartilhados ficam em `src/components`.

### Exemplo do padrao

A rota de detalhes da barbearia fica bem pequena e apenas encaminha o `id` para a feature:

```tsx
import BarbershopDetails from "@/features/BarbershopDetails";

interface BarbershopDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BarbershopDetail({
  params,
}: BarbershopDetailPageProps) {
  const { id } = await params;
  return <BarbershopDetails id={id} />;
}
```

O mesmo acontece com a rota de agendamentos:

```tsx
import Bookings from "@/features/Bookings";

export default function BookingsPage() {
  return <Bookings />;
}
```

Enquanto isso, a feature e quem realmente orquestra a tela, busca dados no servidor e decide o que renderizar em cada breakpoint.

### Estrutura resumida

```text
src/
  app/
    page.tsx
    bookings/page.tsx
    barbershopDetails/[id]/page.tsx
    searchForBarbershops/page.tsx
  features/
    Home/
      index.tsx
      home-mobile.tsx
      home-desktop.tsx
      components/
    Bookings/
      index.tsx
      bookings-mobile.tsx
      bookings-desktop.tsx
      components/
    BarbershopDetails/
      index.tsx
      barbershop-details-mobile.tsx
      barbershop-details-desktop.tsx
      components/
```

### Beneficios dessa abordagem

- deixa as rotas mais limpas e faceis de ler;
- facilita a manutencao e a evolucao de cada tela;
- melhora a separacao de responsabilidades;
- ajuda a reutilizar componentes internos por contexto de feature;
- reduz o acoplamento entre estrutura de rota e implementacao da interface.

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

<p align="center">
  <img src="public/mobile-1.jpeg" alt="Tela inicial mobile" width="24%" />
  <img src="public/mobile-2.jpeg" alt="Tela de agendamentos mobile" width="24%" />
  <img src="public/desktop-1.jpeg" alt="Tela inicial desktop" width="48%" />
</p>
<p align="center">
  <img src="public/desktop-2.jpeg" alt="Detalhes do agendamento no desktop" width="98%" />
</p>

## Link para o deploy

A aplicação está disponível em: [https://ira-barber.vercel.app](https://ira-barber.vercel.app)

## Desafios enfrentados e como foram resolvidos

### 1. Responsividade entre mobile e desktop

O projeto precisou entregar uma experiencia consistente em telas bem diferentes. Isso foi resolvido separando as versoes mobile e desktop das principais features, enquanto um layout responsivo decide qual interface renderizar.

### 2. Autenticacao com persistencia de usuario

Foi necessario integrar login social sem complicar a experiencia do usuario. A combinacao de **NextAuth.js** com **Prisma Adapter** resolveu a autenticacao com Google e a persistencia das sessoes no banco.

### 3. Regras de negocio para agendamentos

Um ponto importante era evitar conflitos de horario e impedir acoes invalidas. Para isso, a aplicacao valida horarios ja reservados antes de criar um agendamento e permite cancelar apenas reservas futuras.

### 4. Organizacao dos dados no servidor

A listagem de agendamentos confirmados e finalizados precisava ser confiavel e performatica. A solucao foi buscar os dados no servidor, ordenar por data e separar os registros entre futuros e passados antes da renderizacao.
