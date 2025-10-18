export class CreateDishesDTO {
    constructor(
        public name: string,
        public description: string,
        public price: number,
        public category_id: number,    
        public image_url: string,
        public is_available: boolean = true
    ) {}
}