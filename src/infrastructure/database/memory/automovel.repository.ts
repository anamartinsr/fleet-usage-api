import { randomUUID } from "crypto";

export interface AutomovelData {
  plate: string;
  color: string;
  brand: string;
}

export interface Automovel extends AutomovelData {
  id: string;
}

export interface AutomovelFilters {
  color?: string;
  brand?: string;
}

export class AutomovelRepository {
  private automoveis: Automovel[] = [];

  async create(data: AutomovelData): Promise<Automovel> {
    const newItem: Automovel = {
      id: randomUUID(),
      plate: data.plate,
      color: data.color,
      brand: data.brand,
    };

    this.automoveis.push(newItem);
    return newItem;
  }

  async update(id: string, data: AutomovelData): Promise<Automovel> {
    const index = this.automoveis.findIndex(a => a.id === id);
    if (index === -1) throw new Error("Vehicle not found");

    const updated: Automovel = {
      ...this.automoveis[index],
      ...data,
    };

    this.automoveis[index] = updated;

    return updated;
  }

  async delete(id: string): Promise<void> {
    const index = this.automoveis.findIndex(a => a.id === id);
    if (index === -1) throw new Error("Vehicle not found");

    this.automoveis.splice(index, 1);
  }

  async findById(id: string): Promise<Automovel | null> {
    return this.automoveis.find(a => a.id === id) ?? null;
  }

  async findAll(filters?: AutomovelFilters): Promise<Automovel[]> {
    return this.automoveis.filter(item => {
      if (filters?.color && item.color !== filters.color) return false;
      if (filters?.brand && item.brand !== filters.brand) return false;
      return true;
    });
  }
}
