import { YelpFusionModule } from "./../yelp-fusion/yelp-fusion.module";
import { Restaurant } from "./restaurants.dto";
import { RestaurantsService } from "./restaurants.service";
import { Test, TestingModule } from "@nestjs/testing";
import { RestaurantsController } from "./restaurants.controller";
import { CacheModule } from "@nestjs/common";

describe("RestaurantsController", () => {
  let controller: RestaurantsController;
  let service: RestaurantsService;

  const term = "coffee";
  const location = "london";

  //SETUP
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YelpFusionModule, CacheModule.register()],
      controllers: [RestaurantsController],
      providers: [RestaurantsService],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService);
  });

  describe("GET /restaurants", () => {
    it("should return an array of restaurants", async () => {
      const result: Restaurant[] = [];

      // Mock the service method
      jest
        .spyOn(service, "searchRestaurants")
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.searchRestaurants(location, term)).toBe(result);
    });

    it("should return a single restaurant", async () => {
      const result: Restaurant = {
        id: "1",
        name: "",
        location: {
          address1: "",
          city: "",
          state: "",
          zip: "",
        },
        image_url: "",
        review_count: 0,
        rating: 0,
        phone: "",
        categories: [],
      };
      jest
        .spyOn(service, "getRestaurantDetails")
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.getRestaurant("1")).toBe(result);
    });
  });
});
