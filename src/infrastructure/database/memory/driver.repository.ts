import { randomUUID } from "crypto";

export interface DriverData {
  name: string;
}

export interface Driver extends DriverData {
  id: string;
}

export interface DriverFilters {
  name?: string;
}

export class DriverRepository {
  private drivers: Driver[] = [];

  async create(data: DriverData): Promise<Driver> {
    const newDriver: Driver = { id: randomUUID(), ...data };
    this.drivers.push(newDriver);
    return newDriver;
  }

  async update(id: string, data: DriverData): Promise<Driver> {
    const index = this.drivers.findIndex(d => d.id === id);
    if (index === -1) throw new Error("Driver not found");

    const updated: Driver = { ...this.drivers[index], ...data };
    this.drivers[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<void> {
    const index = this.drivers.findIndex(d => d.id === id);
    if (index === -1) throw new Error("Driver not found");

    this.drivers.splice(index, 1);
  }

  async findById(id: string): Promise<Driver | null> {
    return this.drivers.find(d => d.id === id) ?? null;
  }

  async findAll(filters?: DriverFilters): Promise<Driver[]> {
    return this.drivers.filter(d => {
      if (filters?.name && !d.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
      return true;
    });
  }
}

export const driverRepository = new DriverRepository();
