import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Database connection — reads DATABASE_URL from environment
// Falls back to a local connection string for development
const connectionString = process.env.DATABASE_URL ?? "postgres://localhost:5432/dearmemory";

// Global singleton to prevent multiple connections in dev (hot reload)
const globalForDb = globalThis as unknown as { db: ReturnType<typeof drizzle> | undefined };
const client = postgres(connectionString, { prepare: false });

export const db = globalForDb.db ?? drizzle(client, { schema });
globalForDb.db = db;

export { schema };
export type { User, Album, Photo, Session, NewUser, NewAlbum, NewPhoto } from "./schema";