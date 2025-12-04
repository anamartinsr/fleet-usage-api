import { CreateDriverUseCase } from "../../../../src/domain/usecases/driver/create-driver.use-case";
import { DriverRepository } from "../../../../src/infrastructure/database/memory/driver.repository";

describe("CreateDriverUseCase", () => {
  it("should create a new driver", async () => {
    const repo = new DriverRepository();
    const useCase = new CreateDriverUseCase(repo);

    const result = await useCase.execute({ name: "John Doe" });

    expect(result).toHaveProperty("id");
    expect(result.name).toBe("John Doe");

    const all = await repo.findAll();
    expect(all.length).toBe(1);
  });
});
