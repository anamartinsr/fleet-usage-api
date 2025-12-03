import { AutomovelRepository } from "../../../../src/infrastructure/database/memory/automovel.repository";

describe("AutomovelRepository (in-memory)", () => {
  it("should store and return vehicles", async () => {
    const repo = new AutomovelRepository();

    const automovel = await repo.create({
      plate: "ABC-1234",
      color: "Preto",
      brand: "Honda",
    });

    const result = await repo.findAll(undefined);

    expect(result.length).toBe(1);
    expect(result[0].plate).toBe("ABC-1234");
  });

  it("should update a vehicle", async () => {
    const repo = new AutomovelRepository();

    const created = await repo.create({
      plate: "ABC-1234",
      color: "Prata",
      brand: "Toyota",
    });

    const data = {
      plate: created.plate,
      color: "Preto",
      brand: created.brand,
    }

    await repo.update(created.id, data);

    const updated = await repo.findById(created.id);

    expect(updated?.color).toBe("Preto");
  });
});
