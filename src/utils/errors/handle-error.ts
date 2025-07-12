// src/utils/http/handle-error.ts

import { Response } from "express";
import { FieldAlreadyExistsError } from "../errors/field-exists.error";
import { NotFoundError } from "../errors/not-found.error";
import { HttpResponse } from "../http/response.helper";

export function handleControllerError(error: any, res: Response) {
    if (error instanceof FieldAlreadyExistsError) {
        return res.status(400).json(HttpResponse.badRequest(error.message));
    }

    if (error instanceof NotFoundError) {
        return res.status(404).json(HttpResponse.notFound(error.message));
    }

    return res.status(500).json(
        HttpResponse.error("Internal server error", 500, error.message)
    );
}
