export class OrderDish {
  constructor(
    public id: number,
    public order_id: number,
    public dish_id: number,
    public quantity: number,
    public price: number
  ) {}
}
