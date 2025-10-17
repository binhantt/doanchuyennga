export class Service {
  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public price: number | null,
    public category: string | null,
    public image_url: string | null,
    public is_available: boolean = true,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
