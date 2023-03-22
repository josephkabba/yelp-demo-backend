import { AppModule } from "./../src/app.module";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

describe("RestaurantController (e2e)", () => {
  let app: INestApplication;
  const term = "coffee";
  const location = "london";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it("GET: /api/restaurants", async () => {
    return await request(app.getHttpServer())
      .get("/api/restaurants")
      .query({ term, location })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("GET: /api/restaurants/:id", async () => {
    return await request(app.getHttpServer())
      .get("/api/restaurants/ED7A7vDdg8yLNKJTSVHHmg")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
