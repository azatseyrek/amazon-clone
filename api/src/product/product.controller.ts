import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';

//localhost:3000/product
@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {}
  @Post()
  createProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ) {
    return this.ProductService.create(name, price, description);
  }
}
