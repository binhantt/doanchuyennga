export class Package {
    constructor(
        public id: number,
        public name: string,
        public description: string | null,
        public price: number,
        public max_guests: number,
        public package_type: string, // 'wedding', 'birthday', 'corporate', etc.
        public image_url: string | null,
        public is_available: boolean = true,
        public created_at?: Date,
        public updated_at?: Date
    ) {}
}