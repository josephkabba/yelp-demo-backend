import { Controller, Get, Param, Query } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";

@Controller("api/restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async getRestaurants(
    @Query("location") location: string,
    @Query("term") term: string,
  ) {
    return await this.restaurantsService.searchRestaurants(term, location);
  }

  @Get(":id")
  async getRestaurant(@Param("id") id: string) {
    return await this.restaurantsService.getRestaurantDetails(id);
  }
}
