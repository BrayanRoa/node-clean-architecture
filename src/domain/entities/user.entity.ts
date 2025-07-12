export class UserEntity {
    constructor(
        public readonly id: number,
        public name: string,
        public email: string,
        public createdAt: Date
    ) { }
}