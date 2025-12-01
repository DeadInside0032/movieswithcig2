# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## TMDB Setup

This project uses the TMDB API for movie and genre data. There are two ways to authenticate: an API key (v3 style) or a v4 read access token (Bearer header). Set one or both in your environment.

- To use API key (fallback): create `.env` in the `react-app` folder with:

```env
VITE_TMDB_API_KEY=<your_tmdb_v3_api_key>
```

- To use the Bearer token (recommended for v4 requests): create `.env` in the `react-app` folder with:

```env
VITE_TMDB_READ_ACCESS_TOKEN=<your_tmdb_v4_read_access_token>
```

The app prefers `VITE_TMDB_READ_ACCESS_TOKEN` (Bearer header). If not provided, it will use `VITE_TMDB_API_KEY` as `api_key` query parameter.

You can also expose the credentials via a small serverless function (`/.netlify/functions/tmdb-metadata`) that returns the credentials to the client. This function is used if no `VITE_` env variables are found on the client side.

### Run the app locally

Install dependencies and run the dev server (PowerShell):

```powershell
cd react-app
npm install
npm run dev
```

If you need to run `npm` with an execution policy issue on Windows PowerShell, either run PowerShell as Administrator and run:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

or run in a CMD terminal (which doesn't block scripts). The app will use the env variables defined above.

