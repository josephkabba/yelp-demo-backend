export interface SearchBusinessesParams {
  term: string;
  location: string;
}
export interface YelpFusionApiClient {
  searchBusinesses(params: SearchBusinessesParams): Promise<any>;
  getBusinessDetails(id: string): Promise<any>;
}
