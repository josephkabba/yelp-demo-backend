import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { validationObject } from "./config/validation";
import { ThrottlerModule } from "@nestjs/throttler";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { YelpFusionModule } from "./yelp-fusion/yelp-fusion.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationObject,
      validationOptions: { allowUnKnown: false },
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get("THROTTLE_TTL"),
        limit: config.get("THROTTLE_LIMIT"),
      }),
    }),

    RestaurantsModule,

    YelpFusionModule,
  ],
})
export class AppModule {}
