export class CreateWeddingPackageDTO {
    constructor(
        public name: string,
        public description: string,
        public price: number,
        public guest_count: number,
        public venue_type: 'indoor' | 'outdoor' | 'themed',
        public image_url: string
    ) {}
}