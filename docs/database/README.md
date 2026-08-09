# LeadPilot AI - Database & Vector Search Documentation

## Storage Architecture
LeadPilot AI combines relational data persistence with vector search:

- **PostgreSQL**: Primary relational database.
- **`pgvector`**: PostgreSQL extension for vector similarity search over embeddings.
- **Redis**: In-memory data store for state cache, rate limiting, and background queue.

## Enabing pgvector Extension
The `pgvector` extension is enabled automatically in `infrastructure/postgres/init.sql`:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## Schema Highlights
- `users` / `organizations`: Multi-tenant user management and OAuth credentials.
- `leads` / `companies` / `contacts`: Sales prospecting targets and lead qualification scores.
- `proposals`: Proposal drafts with human approval status (`draft`, `pending_approval`, `approved`, `rejected`).
- `embeddings`: Stores vector representation of company descriptions, services, and past proposal templates for RAG matching.
