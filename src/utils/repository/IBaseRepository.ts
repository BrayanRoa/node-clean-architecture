export interface IBaseRepository<T, CreateDto> {
    add(data: CreateDto): Promise<T | null>
    getAll(): Promise<T[]>
    getOneById(id: string): Promise<T | null>
}