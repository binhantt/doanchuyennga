export class CreateOrderDishDTO {
    constructor(
        public order_id: number,
        public dish_id: number,
        public quantity: number,
        public price: number
    ) {}
}