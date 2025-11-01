    export class Voucher {
    constructor(
        public id: number,
        public code: string,
        public discount_value: number,
        public discount_type: 'percent' | 'amount',
        public valid_from: Date | string,
        public valid_to: Date | string,
        public description?: string,
        public min_order_amount?: number,
        public max_uses?: number,
        public is_active?: boolean,
        public used_count?: number
    ) {}
    }