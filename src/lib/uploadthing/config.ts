// ─── UploadThing Config ──────────────────────────────────────────────────────
// Cloud-based file storage for photo uploads.
// Uses UploadThing (uploadthing.com) — set env vars in production.

import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

// Auth middleware — get the user from the request
const auth = (req: Request) => ({ id: req.headers.get("x-user-id") ?? "anonymous" });

export const uploadRouter = {
  // Album cover images (max 4MB)
  albumCover: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(({ req }) => auth(req))
    .onUploadComplete(({ metadata, file }) => {
      console.log("Cover uploaded by", metadata.id, " — ", file.url);
      return { uploadedBy: metadata.id };
    }),

  // Album photos (max 16MB each, up to 50 at a time)
  albumPhoto: f({ image: { maxFileSize: "16MB", maxFileCount: 50 } })
    .middleware(({ req }) => auth(req))
    .onUploadComplete(({ metadata, file }) => {
      console.log("Photo uploaded by", metadata.id, " — ", file.url);
      return { uploadedBy: metadata.id };
    }),

  // Avatar images (max 2MB)
  avatar: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(({ req }) => auth(req))
    .onUploadComplete(({ metadata, file }) => {
      console.log("Avatar uploaded by", metadata.id, " — ", file.url);
      return { uploadedBy: metadata.id };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;