export class Dishes {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public image_url: string,
    public is_available: boolean = true
  ) {} 
}