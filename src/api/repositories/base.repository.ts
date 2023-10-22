import { Service } from "typedi";
import { ModelCtor, Model } from "sequelize-typescript";
import { WhereOptions } from "sequelize";

@Service()
export abstract class BaseRepository<M extends Model> {
  protected model: ModelCtor<M>;

  constructor(model: ModelCtor<M>) {
    this.model = model;
  }

  async findById(id: number): Promise<M> {
    return this.model.findByPk(id);
  }

  async getAll(): Promise<Array<M>> {
    return this.model.findAll();
  }

  async destroyById(id: number): Promise<number> {
    const where: WhereOptions = { id };
    return this.model.destroy({ where });
  }
}
