# Gun.js Playground

This is a playground project for experimenting with [Gun.js](https://gun.eco/), a decentralized graph database. The project consists of:

- A **server** built with Express and Gun.js
- A **client** built with Vue 3 and Vite

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [pnpm](https://pnpm.io/) package manager
- [jj](https://github.com/jujumilk3/jj) (optional, for project management)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:toplocs/gun-playground.git
   cd gun-playground
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Development

### Server

Start the server in development mode:

```bash
pnpm --filter server dev
```

The server will run on http://localhost:3000 by default.

### Client

Start the client in development mode:

```bash
pnpm --filter client dev
```

The client development server will run on http://localhost:5173 by default.

## Building

Build both client and server:

```bash
pnpm build
```

Or build them individually:

```bash
pnpm --filter server build
pnpm --filter client build
```

## Running in Production

```bash
pnpm start
```

This will start the server in production mode, serving the built client files.

## Project Structure

- `/client` - Vue 3 frontend application
- `/server` - Express and Gun.js backend server

## License

MIT
