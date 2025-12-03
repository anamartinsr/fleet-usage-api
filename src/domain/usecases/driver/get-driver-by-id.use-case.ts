export interface IDriverRepository {
  findById(id: string): Promise<any>;
}

export class GetDriverByIdUseCase {
  constructor(private readonly repo: IDriverRepository) {}

  async execute(id: string) {
    return this.repo.findById(id);
  }
}
