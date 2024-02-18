export interface CabinType {
  created_at?: string;
  description: string;
  discount: number;
  id?: number;
  image: string | File;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
