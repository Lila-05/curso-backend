# Cambios realizados en el proyecto

## 1. Mejora de .gitignore
- Se mejoró el archivo `.gitignore` para incluir buenas prácticas y evitar archivos innecesarios en el control de versiones.

## 2. Scripts de desarrollo y producción
- Se configuró el script `dev` para usar `nodemon` con TypeScript.
- Se agregó el script `prod` para compilar y ejecutar el proyecto en producción.

## 3. Estructura de controladores y middlewares
- Se corrigieron todos los controladores (`users`, `roles`, `posts`, `auth`) para:
  - No retornar el resultado de `res.json()` ni `res.status().json()`.
  - Usar `res.status(...).json(...); return;` o `res.json(...); return;` para cortar la ejecución.
  - Incluir el parámetro `next: NextFunction` en la firma.
  - Asegurar el tipo de retorno `Promise<void>`.
- Se corrigieron los middlewares (`auth`, `roles`) para:
  - No retornar el resultado de `res.status().send()` ni `res.status().json()`.
  - Usar `res.status(...).send(...); return;` para cortar la ejecución.

## 4. Organización de rutas
- Se mantuvo la centralización de rutas en `routes.ts` y el uso de `app.use('/api/v1', routes())` en `server.ts`.
- Se recomienda que la ruta `/health` esté directamente en `server.ts` para monitoreo global.

## 5. Migración de imports absolutos a relativos
- Se reemplazaron todos los imports con alias (`@controllers`, `@services`, `@models`, etc.) por imports relativos (`../controllers/...`, `../models/...`, etc.) en todo el proyecto.
- Se corrigieron los imports en modelos, controladores, middlewares, rutas y server para asegurar compatibilidad en desarrollo y producción.
- Se solucionaron errores de "Cannot find module" en producción y desarrollo.

## 6. Otros ajustes
- Se eliminaron retornos innecesarios en middlewares y controladores para evitar errores de tipo en TypeScript.
- Se revisaron y ajustaron los imports y la estructura de los archivos para mantener buenas prácticas.
- Se corrigió el import de `app` en `src/app.ts` para que sea relativo y funcione en desarrollo.

---