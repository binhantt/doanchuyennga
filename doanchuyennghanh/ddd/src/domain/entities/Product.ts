export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public price: number,
    public stock_quantity: number,
    public image_url: string | null,
    public category_id: number | null,
    public is_available: boolean,
    public sku: string | null,
    public weight: number | null,
    public specifications: any | null,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}