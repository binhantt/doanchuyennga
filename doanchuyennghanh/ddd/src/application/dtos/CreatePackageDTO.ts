export class CreatePackageDTO {
    constructor(
        public name: string,
        public description: string,
        public price: number,
        public max_guests: number,
        public package_type: string, // 'wedding', 'birthday', 'corporate', etc.
        public image_url: string,
        public is_available: boolean = true
    ) {}
}