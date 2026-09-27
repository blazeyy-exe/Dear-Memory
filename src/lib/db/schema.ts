import { pgTable, text, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const accountRoleEnum = pgEnum("account_role", ["user", "business"]);
export const albumMoodEnum = pgEnum("album_mood", [
  "Joyful", "Serene", "Adventure", "Cozy", "Energetic", "Romantic", "Nostalgic", "Celebratory",
]);

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  avatarUrl: text("avatar_url"),
  role: accountRoleEnum("role").notNull().default("user"),
  googleId: text("google_id").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── Sessions ─────────────────────────────────────────────────────────────────

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Albums ───────────────────────────────────────────────────────────────────

export const albums = pgTable("albums", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
  mood: albumMoodEnum("mood"),
  isShared: boolean("is_shared").notNull().default(false),
  shareToken: text("share_token").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── Photos ───────────────────────────────────────────────────────────────────

export const photos = pgTable("photos", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  albumId: text("album_id")
    .notNull()
    .references(() => albums.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  caption: text("caption"),
  width: integer("width"),
  height: integer("height"),
  fileSize: integer("file_size"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Album Likes ──────────────────────────────────────────────────────────────

export const albumLikes = pgTable("album_likes", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  albumId: text("album_id")
    .notNull()
    .references(() => albums.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type Album = typeof albums.$inferSelect;
export type NewAlbum = typeof albums.$inferInsert;
export type Photo = typeof photos.$inferSelect;
export type NewPhoto = typeof photos.$inferInsert;