export class CreateVoucherDTO {
  constructor(
    public code: string,
    public description?: string,
    public discount_type: 'percent' | 'amount',
    public discount_value: number,
    public min_order_amount?: number,
    public max_uses?: number,
    public valid_from?: Date | string,
    public valid_to?: Date | string,
    public used_count?: number,
    public is_active?: boolean
  ) {}
}