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
    public updated_at?: Date,
    public wedding_package_id?: number | null,
    public service_id?: number | null,
    public notes?: string | null,
    public order_type?: 'dishes_only' | 'with_wedding_package' | 'with_service' | 'mixed',
    public event_address?: string | null
  ) {}
}