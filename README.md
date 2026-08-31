# TanStack Start + Laravel TODO

TanStack StartのフロントエンドとLaravel APIでTODOを管理するサンプルアプリです。TODOはLaravelのSQLiteデータベースに保存されます。

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
