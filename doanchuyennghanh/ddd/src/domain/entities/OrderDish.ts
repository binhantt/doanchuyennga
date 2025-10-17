export class OrderDish {
  constructor(
    public id: number,
    public orderId: number,
    public dishId: number,
    public quantity: number,
    public price: number
  ) {}
}
