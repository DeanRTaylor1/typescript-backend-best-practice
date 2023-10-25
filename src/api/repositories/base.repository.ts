import { Service } from "typedi";
import { ModelCtor, Model } from "sequelize-typescript";
import { WhereOptions } from "sequelize";
import { ICreateAttributes } from "api/models/entities/types/entity.types";
import { Pagination } from "@decorators/pagination.decorator";

@Service()
export abstract class BaseRepository<M extends Model> {
  protected model: ModelCtor<M>;

  constructor(model: ModelCtor<M>) {
    this.model = model;
  }

  async findById(id: number): Promise<M> {
    return this.model.findByPk(id);
  }

  async getAll({ skip, limit }: Pagination): Promise<Array<M>> {
    return this.model.findAll({ offset: skip, limit });
  }

  async destroyById(id: number): Promise<number> {
    const where: WhereOptions = { id };
    return this.model.destroy({ where });
  }

  abstract create(data: ICreateAttributes<M["_attributes"]>): Promise<M>;
}
