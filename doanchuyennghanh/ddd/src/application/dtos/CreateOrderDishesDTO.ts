 export class CreateOrderDishesDTO {
    constructor(
        public orderId: number,
        public dishId: number,
        public quantity: number,
        public price: number
    ) {}
}