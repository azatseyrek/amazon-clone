import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDocument } from './product.schema';

//localhost:3000/product
@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {}

  @Get()
  finAllProducts() {
    return this.ProductService.findAll();
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.ProductService.findOne(id);
  }

  @Post()
  createProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ) {
    return this.ProductService.create(name, price, description);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.ProductService.update(id, name, price, description);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.ProductService.delete(id);
  }
}
