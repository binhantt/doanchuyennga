export class CreatePackageDishDTO {
    constructor(
        public dish_id: number,
        public quantity: number,
        public package_id?: number | null, // wedding_packages reference
        public general_package_id?: number | null // packages reference
    ) {}
}