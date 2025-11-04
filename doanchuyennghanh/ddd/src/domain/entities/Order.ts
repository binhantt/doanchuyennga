export class Order {
  constructor(
    public id: number,
    public user_id: number,
    public event_date: string,
    public guest_count: number,
    public total_amount: number,
    public discount_amount: number,
    public final_amount: number,
    public status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}