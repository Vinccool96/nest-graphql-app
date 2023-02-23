import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Insertion, InsertionDocument } from "../schemas/insertion.schema"
import { Model } from "mongoose"

@Injectable()
export class InsertionsService {
  constructor(@InjectModel(Insertion.name) private readonly insertionModel: Model<InsertionDocument>) {}

  async insertion(id: string) {
    const insertions = await this.insertionModel.find().exec()
    if (insertions.length === 0) {
      await this.insertionModel.create({ lastInsert: id })
    } else {
      await this.insertionModel.findByIdAndUpdate(insertions[0]._id, { $set: { lastInsert: id } })
    }
  }

  async lastInsertionId(): Promise<string | null> {
    const insertions = await this.insertionModel.find().exec()
    return insertions[0]?.id || null
  }
}
