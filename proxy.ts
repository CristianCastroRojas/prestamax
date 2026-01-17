// Importa el middleware de Clerk para autenticación
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Permite devolver respuestas personalizadas en Next.js Middleware
import { NextResponse } from "next/server";

// Librería de rate limiting de Upstash
import { Ratelimit } from "@upstash/ratelimit";

// Cliente Redis de Upstash
import { Redis } from "@upstash/redis";

/**
 * Tipo para definir duraciones válidas (ej: "10s", "5 m", "1h")
 * Se usa para la ventana del rate limit
 */
type Duration =
  | `${number} ${"ms" | "s" | "m" | "h" | "d"}`
  | `${number}${"ms" | "s" | "m" | "h" | "d"}`;

/**
 * Inicializa Redis solo si existen las variables de entorno
 * Esto evita errores en entornos donde Redis no esté configurado
 */
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

/**
 * Inicializa el rate limiter usando una ventana deslizante
 * Ejemplo: 30 requests cada 10 segundos
 */
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(
        parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "30"),
        (process.env.RATE_LIMIT_WINDOW as Duration) || "10s"
      ),
    })
  : null;

/**
 * Define qué rutas son públicas (no requieren autenticación)
 */
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

/**
 * Middleware principal
 * Se ejecuta en cada request que coincida con el matcher
 */
export default clerkMiddleware(async (auth, req) => {
  // Flags para habilitar/deshabilitar auth y rate limit desde .env
  const authEnabled = process.env.AUTH_ENABLED === "true";
  const rateLimitEnabled = process.env.RATE_LIMIT_ENABLED === "true";

  /**
   * Obtiene la IP real del usuario
   * Importante en Vercel / proxies
   */
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  /**
   * ==========================
   * LÓGICA DE RATE LIMITING
   * ==========================
   */
  if (rateLimitEnabled && ratelimit) {
    // Obtiene el userId si el usuario está autenticado
    const { userId } = await auth();

    /**
     * IPs administradoras (whitelist)
     * Estas IPs no tienen límite de requests
     */
    const adminIps = process.env.MY_ADMIN_IP?.split(",") || [];

    // Verifica si la IP actual es admin
    const isAdmin = adminIps.includes(ip);

    if (!isAdmin) {
      /**
       * Usa userId si existe, si no la IP
       * Esto evita que usuarios logueados compartan límite por IP
       */
      const identifier = userId ?? ip;

      // Aplica el rate limit
      const { success } = await ratelimit.limit(identifier);

      // Si se excede el límite, devuelve error 429
      if (!success) {
        return NextResponse.json(
          {
            error: "Rate limit exceeded",
            message: "Demasiadas peticiones.",
          },
          { status: 429 }
        );
      }
    }
  }

  /**
   * ==========================
   * LÓGICA DE AUTENTICACIÓN
   * ==========================
   */

  // Si la autenticación está desactivada, deja pasar todo
  if (!authEnabled) return NextResponse.next();

  /**
   * Protege todas las rutas que NO sean públicas
   * Si el usuario no está logueado → redirect automático
   */
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

/**
 * Define qué rutas ejecutan el middleware
 * - Excluye archivos estáticos (_next, imágenes, css, etc.)
 * - Incluye rutas API y trpc
 */
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
