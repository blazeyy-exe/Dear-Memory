// ─── API Endpoints ────────────────────────────────────────────────────────────
// Typed endpoint functions. Each calls the api client and returns typed data.

import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  AlbumResponse,
  CreateAlbumRequest,
  UpdateAlbumRequest,
  PhotoResponse,
  AuthUser,
} from "./types";
import { api } from "./client";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function login(data: LoginRequest): Promise<AuthUser | null> {
  const res = await api.post<AuthResponse>("/auth/login", data);
  if (res.success && res.data) {
    const { setAuthToken } = await import("./client");
    setAuthToken(res.data.token);
    return res.data.user;
  }
  throw new Error(res.error ?? "Login failed");
}

export async function signup(data: SignupRequest): Promise<AuthUser | null> {
  const res = await api.post<AuthResponse>("/auth/signup", data);
  if (res.success && res.data) {
    const { setAuthToken } = await import("./client");
    setAuthToken(res.data.token);
    return res.data.user;
  }
  throw new Error(res.error ?? "Signup failed");
}

export async function logout(): Promise<void> {
  const { setAuthToken } = await import("./client");
  setAuthToken(null);
  await api.post("/auth/logout");
}

export async function getMe(): Promise<AuthUser | null> {
  const res = await api.get<AuthUser>("/auth/me");
  return res.success && res.data ? res.data : null;
}

export async function loginWithGoogle(): Promise<void> {
  const API_BASE = import.meta.env.VITE_API_URL ?? "";
  window.location.href = `${API_BASE}/api/auth/google`;
}

// ─── Albums ───────────────────────────────────────────────────────────────────

export async function getAlbums(): Promise<AlbumResponse[]> {
  const res = await api.get<AlbumResponse[]>("/albums");
  return res.success && res.data ? res.data : [];
}

export async function getAlbum(id: string): Promise<AlbumResponse | null> {
  const res = await api.get<AlbumResponse>(`/albums/${id}`);
  return res.success && res.data ? res.data : null;
}

export async function createAlbum(data: CreateAlbumRequest): Promise<AlbumResponse | null> {
  const res = await api.post<AlbumResponse>("/albums", data);
  if (res.success && res.data) return res.data;
  throw new Error(res.error ?? "Failed to create album");
}

export async function updateAlbum(id: string, data: UpdateAlbumRequest): Promise<AlbumResponse | null> {
  const res = await api.patch<AlbumResponse>(`/albums/${id}`, data);
  if (res.success && res.data) return res.data;
  throw new Error(res.error ?? "Failed to update album");
}

export async function deleteAlbum(id: string): Promise<void> {
  const res = await api.delete(`/albums/${id}`);
  if (!res.success) throw new Error(res.error ?? "Failed to delete album");
}

export async function toggleShareAlbum(id: string): Promise<AlbumResponse | null> {
  const res = await api.post<AlbumResponse>(`/albums/${id}/share`);
  return res.success && res.data ? res.data : null;
}

// ─── Photos ───────────────────────────────────────────────────────────────────

export async function getPhotos(albumId: string): Promise<PhotoResponse[]> {
  const res = await api.get<PhotoResponse[]>(`/albums/${albumId}/photos`);
  return res.success && res.data ? res.data : [];
}

export async function deletePhoto(photoId: string): Promise<void> {
  const res = await api.delete(`/photos/${photoId}`);
  if (!res.success) throw new Error(res.error ?? "Failed to delete photo");
}