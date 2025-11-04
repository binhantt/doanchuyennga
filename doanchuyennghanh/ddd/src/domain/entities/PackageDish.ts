export class PackageDish {
    constructor(
        public id: number,
        public package_id: number | null, // wedding_packages reference
        public dish_id: number,
        public quantity: number,
        public general_package_id?: number | null // packages reference
    ) {}
}