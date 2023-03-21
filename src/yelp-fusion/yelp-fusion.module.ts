import { Module } from "@nestjs/common";
import { YelpFusionApiClientService } from "./yelp-fusion.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

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
