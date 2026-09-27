// ─── Albums Server Functions ─────────────────────────────────────────────────
// Server-side handlers for album CRUD operations.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db, schema } from "@/lib/db";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/auth/utils";
import { eq, desc, sql, and } from "drizzle-orm";
import { parseCookies } from "vinxi/http";

// ─── Auth helper ──────────────────────────────────────────────────────────────

function getUserId(): string | null {
  const cookies = parseCookies();
  const token = cookies[AUTH_COOKIE_NAME];
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId ?? null;
}

// ─── List albums ──────────────────────────────────────────────────────────────

export const getAlbums = createServerFn({ method: "GET" })
  .handler(async () => {
    const userId = getUserId();
    if (!userId) return { success: false, error: "Not authenticated", data: [] };

    const albums = await db
      .select({
        id: schema.albums.id,
        title: schema.albums.title,
        description: schema.albums.description,
        coverUrl: schema.albums.coverUrl,
        mood: schema.albums.mood,
        isShared: schema.albums.isShared,
        shareToken: schema.albums.shareToken,
        createdAt: schema.albums.createdAt,
        updatedAt: schema.albums.updatedAt,
        photoCount: sql<number>`count(${schema.photos.id})::int`,
      })
      .from(schema.albums)
      .leftJoin(schema.photos, eq(schema.photos.albumId, schema.albums.id))
      .where(eq(schema.albums.userId, userId))
      .groupBy(schema.albums.id)
      .orderBy(desc(schema.albums.createdAt));

    return { success: true, data: albums };
  });

// ─── Get single album ─────────────────────────────────────────────────────────

export const getAlbum = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const userId = getUserId();
    if (!userId) return { success: false, error: "Not authenticated" };

    const [album] = await db
      .select({
        id: schema.albums.id,
        title: schema.albums.title,
        description: schema.albums.description,
        coverUrl: schema.albums.coverUrl,
        mood: schema.albums.mood,
        isShared: schema.albums.isShared,
        shareToken: schema.albums.shareToken,
        createdAt: schema.albums.createdAt,
        updatedAt: schema.albums.updatedAt,
        photoCount: sql<number>`count(${schema.photos.id})::int`,
      })
      .from(schema.albums)
      .leftJoin(schema.photos, eq(schema.photos.albumId, schema.albums.id))
      .where(and(eq(schema.albums.id, data.id), eq(schema.albums.userId, userId)))
      .groupBy(schema.albums.id)
      .limit(1);

    if (!album) return { success: false, error: "Album not found" };
    return { success: true, data: album };
  });

// ─── Create album ─────────────────────────────────────────────────────────────

export const createAlbum = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().optional(),
      coverUrl: z.string().optional(),
      mood: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const userId = getUserId();
    if (!userId) return { success: false, error: "Not authenticated" };

    const [album] = await db
      .insert(schema.albums)
      .values({
        userId,
        title: data.title,
        description: data.description ?? null,
        coverUrl: data.coverUrl ?? null,
        mood: (data.mood as any) ?? null,
      })
      .returning();

    return {
      success: true,
      data: {
        ...album,
        photoCount: 0,
        likeCount: 0,
      },
    };
  });

// ─── Update album ─────────────────────────────────────────────────────────────

export const updateAlbum = createServerFn({ method: "PATCH" })
  .inputValidator(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional().nullable(),
      coverUrl: z.string().optional().nullable(),
      mood: z.string().optional().nullable(),
      isShared: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const userId = getUserId();
    if (!userId) return { success: false, error: "Not authenticated" };

    const [album] = await db
      .update(schema.albums)
      .set({
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.coverUrl !== undefined && { coverUrl: data.coverUrl }),
        ...(data.mood !== undefined && { mood: data.mood as any }),
        ...(data.isShared !== undefined && { isShared: data.isShared }),
        updatedAt: new Date(),
      })
      .where(and(eq(schema.albums.id, data.id), eq(schema.albums.userId, userId)))
      .returning();

    if (!album) return { success: false, error: "Album not found" };
    return { success: true, data: album };
  });

// ─── Delete album ─────────────────────────────────────────────────────────────

export const deleteAlbum = createServerFn({ method: "DELETE" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const userId = getUserId();
    if (!userId) return { success: false, error: "Not authenticated" };

    await db
      .delete(schema.albums)
      .where(and(eq(schema.albums.id, data.id), eq(schema.albums.userId, userId)));

    return { success: true };
  });

// ─── Toggle share ─────────────────────────────────────────────────────────────

export const toggleShare = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const userId = getUserId();
    if (!userId) return { success: false, error: "Not authenticated" };

    const [album] = await db
      .select()
      .from(schema.albums)
      .where(and(eq(schema.albums.id, data.id), eq(schema.albums.userId, userId)))
      .limit(1);

    if (!album) return { success: false, error: "Album not found" };

    const [updated] = await db
      .update(schema.albums)
      .set({
        isShared: !album.isShared,
        shareToken: !album.isShared ? crypto.randomUUID() : null,
        updatedAt: new Date(),
      })
      .where(eq(schema.albums.id, data.id))
      .returning();

    return { success: true, data: updated };
  });