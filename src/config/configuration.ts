export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  environment: process.env.NODE_ENV,
  url: process.env.URL,
  throttle_ttl: process.env.THROTTLE_TTL,
  throttle_limit: process.env.THROTTLE_LIMIT,
  yelp_api_key: process.env.YELP_API_KEY,
  validation_message: process.env.VALIDATION_MESSAGE,
});
