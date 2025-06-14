import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // Defaults to same-origin; override with NEXT_PUBLIC_API_BASE_URL when needed
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? undefined,
})