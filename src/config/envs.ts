import { z } from "zod";

// Cargar .env antes de cualquier validación
const envFile = process.env.NODE_ENV === "development"
    ? ".env"
    : ".env.production"

process.loadEnvFile(envFile)

// Validación con Zod
const envSchema = z.object({
    PORT: z.string().default("3000").transform(Number),
    BASE_URL: z.string().default("/api/v1"),
    PUBLIC_PATH: z.string().default("public"),
    JWT_SEED: z.string().min(1, "JWT_SEED is required"),
});

// // Validamos process.env
const parsed = envSchema.safeParse(process.env);

// // Si hay errores, los mostramos y salimos
if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
}

// Exportamos las variables ya tipadas
export const envs = parsed.data;
