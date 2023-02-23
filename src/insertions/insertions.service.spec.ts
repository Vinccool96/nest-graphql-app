import { Test, TestingModule } from "@nestjs/testing"
import { InsertionsService } from "./insertions.service"

describe("InsertionsService", () => {
  let service: InsertionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsertionsService],
    }).compile()

    service = module.get<InsertionsService>(InsertionsService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
