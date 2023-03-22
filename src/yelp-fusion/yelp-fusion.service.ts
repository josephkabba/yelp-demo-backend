import { Business } from "./../yelp-fusion/yelp-business.schema";
import { Injectable } from "@nestjs/common";
import {
  SearchBusinessesParams,
  YelpFusionApiClient,
} from "./yelp-fusion-client";
import * as yelp from "yelp-fusion";

@Injectable()
export class YelpFusionApiClientService implements YelpFusionApiClient {
  private client: yelp.Client;

  constructor(apiKey: string) {
    this.client = yelp.client(apiKey);
  }

  async searchBusinesses({
    term,
    location,
  }: SearchBusinessesParams): Promise<Business[]> {
    const searchRequest = {
      term,
      location,
    };
    try {
      const searchResponse = await this.client.search(searchRequest);
      return searchResponse.jsonBody.businesses;
    } catch (error) {
      throw new Error(`Error searching businesses: ${error.message}`);
    }
  }

  async getBusinessDetails(businessId: string): Promise<Business> {
    try {
      const businessResponse = await this.client.business(businessId);
      return businessResponse.jsonBody;
    } catch (error) {
      throw new Error(`Error getting business details: ${error.message}`);
    }
  }
}
