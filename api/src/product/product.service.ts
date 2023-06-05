import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductDocument } from "./product.schema";
import { Model } from "mongoose";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("Product")
    private readonly productModel: Model<ProductDocument>
  ) {}

  async create(
    name: string,
    price: number,
    description?: string
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel({ name, price, description });
    const result = await newProduct.save();
    return result;
  }

  async findAll(): Promise<ProductDocument[]> {
    const result = await this.productModel.find().exec();
    return result;
  }

  async findOne(id: string): Promise<ProductDocument> {
    const result = await this.productModel.findById(id).exec();
    return result;
  }

  async update(
    id: string,
    name: string,
    price: number,
    description?: string
  ): Promise<ProductDocument> {
    const result = await this.productModel
      .findByIdAndUpdate(id, { id, name, price, description })
      .exec();
    return result;
  }

  async delete(id: string): Promise<string> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    return "Deleted";
  }
}
