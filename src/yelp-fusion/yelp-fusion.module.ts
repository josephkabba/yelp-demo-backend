import { Module } from "@nestjs/common";
import { YelpFusionApiClientService } from "./yelp-fusion.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

// This module is responsible for injecting the API key into the service
// and exporting the service so that it can be injected into other modules
// that need to use it.
//
// The module is imported into the AppModule, which is the root module
// of the application.
//
// The module is also imported into the RestaurantsModule, which is a
// feature module that needs to use the YelpFusionApiClientService.
@Module({
  providers: [
    {
      provide: YelpFusionApiClientService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>("YELP_API_KEY");
        return new YelpFusionApiClientService(apiKey);
      },
    },
  ],
  exports: [YelpFusionApiClientService],
  imports: [ConfigModule],
})
export class YelpFusionModule {}
