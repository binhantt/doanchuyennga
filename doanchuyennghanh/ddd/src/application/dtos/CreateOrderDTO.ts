
export class CreateOrderDTO {
    constructor( 
        public user_id: number,
        public event_date: string,
        public guest_count: number,
        public total_amount: number,
        public discount_amount: number = 0,
        public final_amount: number,
        public status: 'pending' | 'confirmed' | 'cancelled' | 'completed' = 'pending',
        public wedding_package_id?: number | null,
        public service_id?: number | null,
        public notes?: string | null,
        public order_type: 'dishes_only' | 'with_wedding_package' | 'with_service' | 'mixed' = 'dishes_only',
        public event_address?: string | null,
        public customer_name?: string | null,
        public customer_email?: string | null,
        public customer_phone?: string | null,
        public customer_address?: string | null,
        public order_number?: string | null,
        public cart_items?: CartItem[] | null
    ) {}
}