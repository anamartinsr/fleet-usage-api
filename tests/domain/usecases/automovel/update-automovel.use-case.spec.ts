import { UpdateAutomovelUseCase } from "../../../../src/domain/usecases/automovel/update-automovel.use-case";
import { AutomovelRepository } from "../../../../src/infrastructure/database/memory/automovel.repository";

describe("UpdateAutomovelUseCase", () => {
  it("should update a vehicle", async () => {
    const repo = new AutomovelRepository();

    const created = await repo.create({
      plate: "AAA-1111",
      color: "Red",
      brand: "Fiat",
    });

    const useCase = new UpdateAutomovelUseCase(repo);

    const updated = await useCase.execute({
      id: created.id,
      plate: "AAA-1111",
      color: "Blue",
      brand: "Fiat",
    });

    expect(updated.color).toBe("Blue");
  });

  it("should throw if vehicle does not exist", async () => {
    const repo = new AutomovelRepository();
    const useCase = new UpdateAutomovelUseCase(repo);

    await expect(
      useCase.execute({
        id: "invalid",
        plate: "111",
        color: "Black",
        brand: "BMW",
      })
    ).rejects.toThrow("Vehicle not found");
  });
});
