import { randomUUID } from "crypto";

export class AutomovelRepository {
  private automoveis = [];

  async create(data) {
    const newItem = {
      id: randomUUID(),
      plate: data.plate,
      color: data.color,
      brand: data.brand,
    };

    this.automoveis.push(newItem);
    return newItem;
  }

  async update(id, data) {
    const index = this.automoveis.findIndex(a => a.id === id);
    if (index === -1) throw new Error("Vehicle not found");

    this.automoveis[index] = {
      ...this.automoveis[index],
      ...data,
    };

    return this.automoveis[index];
  }

  async delete(id) {
    const index = this.automoveis.findIndex(a => a.id === id);
    if (index === -1) throw new Error("Vehicle not found");

    this.automoveis.splice(index, 1);
  }

  async findById(id) {
    return this.automoveis.find(a => a.id === id) ?? null;
  }

  async findAll(filters) {
    return this.automoveis.filter(item => {
      if (filters?.color && item.color !== filters.color) return false;
      if (filters?.brand && item.brand !== filters.brand) return false;
      return true;
    });
  }
}
