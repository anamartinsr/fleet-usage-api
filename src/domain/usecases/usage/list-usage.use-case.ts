export interface IUsageRepository {
  findAll(filters?: {
    driverId?: string;
    automovelId?: string;
    active?: boolean;
  }): Promise<any[]>;
}

export class ListUsagesUseCase {
  constructor(private readonly repo: IUsageRepository) {}

  async execute(filters?: {
    driverId?: string;
    automovelId?: string;
    active?: boolean;
  }) {
    return this.repo.findAll(filters);
  }
}
