export class ServiceDish {
  constructor(
    public id: number,
    public service_id: number,
    public dish_id: number,
    public quantity: number = 1,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}