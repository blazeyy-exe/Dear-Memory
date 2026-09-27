// ─── Shared API types ─────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: "user" | "business";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: "user" | "business";
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

// ─── Albums ───────────────────────────────────────────────────────────────────

export interface AlbumResponse {
  id: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  mood: string | null;
  isShared: boolean;
  shareToken: string | null;
  photoCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAlbumRequest {
  title: string;
  description?: string;
  coverUrl?: string;
  mood?: string;
}

export interface UpdateAlbumRequest {
  title?: string;
  description?: string;
  coverUrl?: string;
  mood?: string;
  isShared?: boolean;
}

// ─── Photos ───────────────────────────────────────────────────────────────────

export interface PhotoResponse {
  id: string;
  albumId: string;
  url: string;
  thumbnailUrl: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  createdAt: string;
}

export interface UploadPhotoResponse {
  id: string;
  url: string;
  thumbnailUrl: string | null;
}