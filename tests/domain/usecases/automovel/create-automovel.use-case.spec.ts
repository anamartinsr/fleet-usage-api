import { CreateAutomovelUseCase } from "../../../../src/domain/usecases/automovel/create-automovel.use-case";
import { AutomovelRepository } from "../../../../src/infrastructure/database/memory/automovel.repository";

describe("CreateAutomovelUseCase", () => {
  it("should create a new vehicle", async () => {
    const repo = new AutomovelRepository();
    const useCase = new CreateAutomovelUseCase(repo);

    const result = await useCase.execute({
      plate: "ABC-1234",
      color: "White",
      brand: "Toyota",
    });

    expect(result).toHaveProperty("id");
    expect(result.plate).toBe("ABC-1234");

    const all = await repo.findAll();
    expect(all.length).toBe(1);
  });
});
