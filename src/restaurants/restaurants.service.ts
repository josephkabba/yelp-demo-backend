import { Business } from "./../yelp-fusion/yelp-business.schema";
import { Restaurant } from "./restaurants.dto";
import { YelpFusionApiClientService } from "./../yelp-fusion/yelp-fusion.service";
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Cache } from "cache-manager";

const CACHE_TTL = 360000;

@Injectable()
export class RestaurantsService {
  // The constructor is injected with the YelpFusionApiClientService and the
  // cache manager. The cache manager is injected by the CacheModule, which
  // is imported into the RestaurantsModule.
  constructor(
    private readonly yelpApiClient: YelpFusionApiClientService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async searchRestaurants(
    term: string,
    location: string,
  ): Promise<Restaurant[]> {
    const cacheKey = `search-restaurants-${term}-${location}`;

    try {
      // The cache manager is used to check if the search results are already
      const cachedResponse = await this.cacheManager.get<Restaurant[]>(
        cacheKey,
      );

      if (cachedResponse) {
        return cachedResponse;
      }

      // If the search results are not in the cache, the YelpFusionApiClientService
      // is used to search for restaurants.
      const searchResponse = await this.yelpApiClient.searchBusinesses({
        term,
        location,
      });

      // The search results are mapped to the Restaurant type and stored in the
      // cache.
      const restaurants = searchResponse.map(
        (value): Restaurant => mapBusinessToRestaurant(value),
      );

      // The search results are stored in the cache for 10 minutes.
      await this.cacheManager.set(cacheKey, restaurants, CACHE_TTL);

      return restaurants;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getRestaurantDetails(businessId: string): Promise<Restaurant> {
    try {
      const result = await this.yelpApiClient.getBusinessDetails(businessId);

      return mapBusinessToRestaurant(result);
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}

// This function maps the Business type to the Restaurant type.
// The Restaurant type is a subset of the Business type.
const mapBusinessToRestaurant = (business: Business): Restaurant => {
  return {
    id: business.id,
    name: business.name,
    location: {
      address1: business.location.address1,
      city: business.location.city,
      state: business.location.state,
      zip: business.location.state,
    },
    image_url: business.image_url,
    review_count: business.review_count,
    rating: business.rating,
    phone: business.phone,
    categories: business.categories.map((category) => ({
      alias: category.alias,
      title: category.title,
    })),
  };
};
