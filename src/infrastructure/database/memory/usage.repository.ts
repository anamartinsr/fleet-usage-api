import { randomUUID } from "crypto";

export interface UsageData {
  startDate: Date;
  reason: string;
  driverId: string;
  automovelId: string;
}

export interface Usage extends UsageData {
  id: string;
  endDate: Date | null;
}

export interface UsageFilters {
  driverId?: string;
  automovelId?: string;
  active?: boolean;
}

export class UsageRepository {
  private usages: Usage[] = [];

  async create(data: UsageData): Promise<Usage> {
    const newUsage: Usage = {
      id: randomUUID(),
      endDate: null,
      ...data,
    };

    this.usages.push(newUsage);
    return newUsage;
  }

  async endUsage(id: string): Promise<Usage> {
    const index = this.usages.findIndex(u => u.id === id);
    if (index === -1) throw new Error("Usage not found");

    const updated: Usage = {
      ...this.usages[index],
      endDate: new Date(),
    };

    this.usages[index] = updated;
    return updated;
  }

  async findAll(filters?: UsageFilters): Promise<Usage[]> {
    return this.usages.filter(u => {
      if (filters?.driverId && u.driverId !== filters.driverId) return false;
      if (filters?.automovelId && u.automovelId !== filters.automovelId) return false;
      if (filters?.active === true && u.endDate !== null) return false;
      if (filters?.active === false && u.endDate === null) return false;
      return true;
    });
  }

  async findActiveByDriver(driverId: string): Promise<Usage | null> {
    return (
      this.usages.find(u => u.driverId === driverId && u.endDate === null) ??
      null
    );
  }

  async findActiveByAutomovel(automovelId: string): Promise<Usage | null> {
    return (
      this.usages.find(u => u.automovelId === automovelId && u.endDate === null) ??
      null
    );
  }
}

export const usageRepository = new UsageRepository();
