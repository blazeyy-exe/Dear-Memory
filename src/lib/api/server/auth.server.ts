// ─── Auth Server Functions ───────────────────────────────────────────────────
// These run on the server only. They handle password hashing, JWT signing,
// database queries, and cookie management.

import { createServerFn } from "@tanstack/react-start";
import { getCookies, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { z } from "zod";
import { db, schema } from "@/lib/db";
import { hashPassword, verifyPassword, signToken, verifyToken, AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/auth/utils";
import { eq } from "drizzle-orm";

// ─── Signup ───────────────────────────────────────────────────────────────────

export const signup = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      role: z.enum(["user", "business"]),
    }),
  )
  .handler(async ({ data }) => {
    // Check if user already exists
    const existing = await db.select().from(schema.users).where(eq(schema.users.email, data.email)).limit(1);
    if (existing.length > 0) {
      return { success: false, error: "An account with this email already exists" };
    }

    const passwordHash = await hashPassword(data.password);

    const [user] = await db
      .insert(schema.users)
      .values({
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role,
      })
      .returning();

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    // Set HTTP-only cookie
    setCookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          role: user.role,
        },
        token,
      },
    };
  });

// ─── Login ────────────────────────────────────────────────────────────────────

export const login = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(1, "Password is required"),
    }),
  )
  .handler(async ({ data }) => {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.email, data.email)).limit(1);
    if (!user || !user.passwordHash) {
      return { success: false, error: "Invalid email or password" };
    }

    const valid = await verifyPassword(data.password, user.passwordHash);
    if (!valid) {
      return { success: false, error: "Invalid email or password" };
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    // Set HTTP-only cookie
    setCookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          role: user.role,
        },
        token,
      },
    };
  });

// ─── Logout ───────────────────────────────────────────────────────────────────

export const logout = createServerFn({ method: "POST" })
  .handler(async () => {
    deleteCookie(AUTH_COOKIE_NAME);
    return { success: true };
  });

// ─── Get current user ─────────────────────────────────────────────────────────

export const getMe = createServerFn({ method: "GET" })
  .handler(async () => {
    const cookies = getCookies();
    const token = cookies[AUTH_COOKIE_NAME];

    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    const payload = verifyToken(token);
    if (!payload) {
      return { success: false, error: "Invalid token" };
    }

    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, payload.userId)).limit(1);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    return {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    };
  });