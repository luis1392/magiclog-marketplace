import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchPaginationDto } from 'src/common/dto/search-pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { GetUser } from 'src/auth/decorators/get-user.decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth()
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  findAll(@Query() searchPaginationDto: SearchPaginationDto) {
    return this.productsService.findAll(searchPaginationDto);
  }
  @Get('/search')
  search(@Query() searchPaginationDto: SearchPaginationDto) {
    return this.productsService.search(searchPaginationDto);
  }

  @Get('/my-products')
  @Auth()
  myProducts(@GetUser() user: User) {
    return this.productsService.myProducts(user);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    console.log(term);
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
