export interface Hotel {
  _id?: number; 
  hotelName: string;
  location: string;
  amount: number;
  currency: string;
  rating: number;
  reviewCount: number;
  imageUrls: string[];
  roomDescription: string;
  bhk2: boolean;
  bhk3: boolean;
   ac?: boolean;     
  nonAc?: boolean;   
 
}
