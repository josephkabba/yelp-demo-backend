import { YelpFusionModule } from "./../yelp-fusion/yelp-fusion.module";
import { CacheModule, Module } from "@nestjs/common";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  imports: [YelpFusionModule, CacheModule.register({ isGlobal: true })],
})
export class RestaurantsModule {}
