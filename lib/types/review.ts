export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  verified: boolean;
  likes: number;
  images?: {
    id: string;
    url: string;
    alt: string;
  }[];
}