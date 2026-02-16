import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

let prisma: PrismaClient;

// Creamos el Pool de conexiones (Compatible con Windows y Linux/Vercel)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// El adaptador es lo que Vercel te exigió para desplegar
const adapter = new PrismaPg(pool);

if (process.env.NODE_ENV === "production") {
  // En PRODUCCIÓN: Se usa el adaptador tal cual lo pide Vercel
  prisma = new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });
} else {
  // En LOCAL (Windows): Se usa el adaptador pero con logs detallados
  // y mantenemos la instancia global para evitar saturar conexiones
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      adapter, // <--- OBLIGATORIO: Ya que tu esquema lo exige ahora
      log: ["query", "error", "warn", "info"],
    });
  }
  prisma = globalForPrisma.prisma;
}

export default prisma;
