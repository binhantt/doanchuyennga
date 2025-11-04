export class CreateOrderDTO {
    constructor( 
        public user_id: number,
        public event_date: string,
        public guest_count: number,
        public total_amount: number,
        public discount_amount: number = 0,
        public final_amount: number,
        public status: 'pending' | 'confirmed' | 'cancelled' | 'completed' = 'pending'
    ) {}
}