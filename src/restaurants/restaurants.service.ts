import { RestaurantDto } from "./restaurants.dto";
import { YelpFusionApiClientService } from "./../yelp-fusion/yelp-fusion.service";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly yelpApiClient: YelpFusionApiClientService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async searchRestaurants(
    term: string,
    location: string,
  ): Promise<RestaurantDto[]> {
    const cacheKey = `search-businesses-${term}-${location}`;

    try {
      const cachedResponse = await this.cacheManager.get<RestaurantDto[]>(
        cacheKey,
      );

      if (cachedResponse) {
        return cachedResponse;
      }

      const searchResponse = await this.yelpApiClient.searchBusinesses({
        term,
        location,
      });

      await this.cacheManager.set(cacheKey, searchResponse, 360000);

      return searchResponse;
    } catch (error) {
      throw new Error(`Error searching businesses: ${error.message}`);
    }
  }

  async getRestaurantDetails(businessId: string): Promise<RestaurantDto> {
    try {
      const businessDetails = await this.yelpApiClient.getBusinessDetails(
        businessId,
      );

      return businessDetails;
    } catch (error) {
      throw new Error(`Error getting business details: ${error.message}`);
    }
  }
}
