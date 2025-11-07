export class CreateServiceDishDTO {
    constructor(
        public service_id: number,
        public dish_id: number,
        public quantity: number = 1
    ) {}
}