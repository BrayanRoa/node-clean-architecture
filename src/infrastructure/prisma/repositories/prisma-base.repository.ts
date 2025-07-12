// src/infrastructure/prisma/repositories/PrismaBaseRepository.ts

import { PrismaClient } from "@prisma/client";

export abstract class PrismaBaseRepository<TModel, TEntity, CreateDTO> {

    protected prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    protected abstract get model(): any;
    protected abstract toEntity(model: TModel): TEntity;

    async add(data: CreateDTO): Promise<TEntity> {
        const created = await this.model.create({ data });
        return this.toEntity(created);
    }

    async getAll(): Promise<TEntity[]> {
        const all = await this.model.findMany();
        return all.map(this.toEntity);
    }

    async getOneById(id: string): Promise<TEntity | null> {
        const found = await this.model.findUnique({ where: { id: Number(id) } });
        return found ? this.toEntity(found) : null
    }
}
