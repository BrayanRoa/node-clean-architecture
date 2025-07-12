export class HttpResponse {
    static ok<T>(data: T, message = "Operación exitosa") {
        return {
            statusCode: 200,
            success: true,
            message,
            data,
        };
    }

    static created<T>(data: T, message = "Recurso creado correctamente") {
        return {
            statusCode: 201,
            success: true,
            message,
            data,
        };
    }

    static error(message = "Error interno del servidor", code = 500, error?: string) {
        return {
            statusCode: code,
            success: false,
            message,
            error,
        };
    }

    static notFound(message = "Recurso no encontrado") {
        return this.error(message, 404, "NotFound");
    }

    static badRequest(message = "Petición inválida") {
        return this.error(message, 400, "BadRequest");
    }

    static unauthorized(message = "No autorizado") {
        return this.error(message, 401, "Unauthorized");
    }
}
