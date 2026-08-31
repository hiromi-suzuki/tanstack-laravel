# TanStack Start + Laravel TODO

TanStack StartのフロントエンドとLaravel APIでTODOを管理するサンプルアプリです。TODOはLaravelのSQLiteデータベースに保存されます。

## Frontend structure

TanStack Startの規約に合わせ、`src/routes`はルーティングだけを担当し、画面と通信処理は機能単位で`src/features`にまとめています。

```text
frontend/src/
├── routes/                 # TanStack Routerのファイルベースルート
├── features/todos/         # TODO機能の画面・API・型
│   ├── TodoPage.tsx
│   ├── TodoHeader.tsx / TodoForm.tsx / TodoFilters.tsx
│   ├── TodoList.tsx / TodoFooter.tsx
│   ├── api.ts
│   └── types.ts
├── router.tsx              # Router factory
└── styles.css              # アプリ共通スタイル
```

## Codespaces

GitHubの **Code** → **Create codespace on main** で起動できます。コンテナ作成時にNode.js依存関係、Composer、SQLiteデータベースが準備されます。

```bash
cd frontend
npm run dev
```

ポート3000を開くとアプリを確認できます。Laravel APIはポート8000で動作し、Viteのプロキシ経由で`/api/*`から利用します。

## ローカル実行

Docker Desktop起動後、以下を実行します。

```bash
docker compose up -d
docker compose exec frontend bash .devcontainer/post-create.sh
docker compose exec frontend bash -lc 'cd frontend && npm run dev'
```

## API

- `GET /api/todos`
- `POST /api/todos` (`title`)
- `PATCH /api/todos/{id}` (`title`, `completed`)
- `DELETE /api/todos/{id}`
