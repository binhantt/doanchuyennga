export class WeddingPackage {
    constructor(
        public id: number,
        public name: string,
        public description: string | null,
        public price: number,
        public guest_count: number,
        public venue_type: 'indoor' | 'outdoor' | 'themed',
        public image_url: string | null
    ) {}
}