export interface RestaurantDto {
  id: string;
  name: string;
  location: Location;
  image_url: string;
  review_count: number;
  rating: number;
  phone: string;
  categories: Category[];
}

interface Category {
  alias: string;
  title: string;
}

interface Location {
  address1: string;
  city: string;
  state: string;
  zip: string;
}
