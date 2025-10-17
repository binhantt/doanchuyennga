export class Order {
  constructor(
    public id: number,
    public userId: number,
    public packageId: number | null,
    public voucherId: number | null,
    public eventDate: string,
    public guestCount: number,
    public totalAmount: number,
    public discountAmount: number,
    public finalAmount: number,
    public status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
    public createdAt: Date
  ) {}
}