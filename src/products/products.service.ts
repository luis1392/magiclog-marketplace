import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { SearchPaginationDto } from 'src/common/dto/search-pagination.dto';

import { validate as isUUID } from 'uuid';
import { ProductImage } from './entities/product-image.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  // Inject the repository for Product entity
  constructor(
    // You can also inject other services if needed
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const { images = [], ...rest } = createProductDto;
      // Create a new product instance
      const product = this.productRepository.create({
        ...rest,
        images: images.map((image) => {
          return this.productImageRepository.create({ url: image });
        }),
        user,
      });

      // Save the product to the database
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(searchPaginationDto: SearchPaginationDto) {
    const { limit = 10, offset = 0 } = searchPaginationDto;
    try {
      // Find all products in the database
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
        //realtion: {
        //   images: true,
        //  }
      });
      return products;
    } catch (error) {
      this.handleError(error);
    }
  }
  async myProducts(user: User) {
    try {
      // Find products created by the user

      const queryBuilder = this.productRepository.createQueryBuilder('product');
      const products = await queryBuilder
        .where('product.userId = :userId', { userId: user.id })
        .leftJoinAndSelect('product.images', 'images')
        .getMany();
      return products;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(term: string) {
    try {
      // Find a product by ID or slug
      let product: Product;
      if (isUUID(term)) {
        product = await this.productRepository.findOneBy({ id: term });
      } else {
        const queryBuilder =
          this.productRepository.createQueryBuilder('product');
        product = await queryBuilder
          .where('product.slug ILIKE :slug', { slug: term })
          .orWhere('product.sku ILIKE :sku', { sku: term })
          .leftJoinAndSelect('product.images', 'images')
          .getOne();
      }
      if (!product) {
        throw new NotFoundException(`Product with ID ${term} not found`);
      }
      return product;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    // Update a product by ID
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      const { images, ...toupdate } = updateProductDto;
      const product = await this.productRepository.preload({
        id,
        ...toupdate,
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      await queryRunner.connect();
      await queryRunner.startTransaction();
      // Update images if provided
      if (images) {
        // Delete existing images
        await queryRunner.manager.delete(ProductImage, { product: { id } });
        product.images = images.map((image) => {
          return this.productImageRepository.create({ url: image });
        });
      } else {
        product.images = await this.productImageRepository.findBy({
          product: { id },
        });
      }

      // Save the updated product to the databas
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return product;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleError(error);
    }
  }

  async remove(id: string) {
    // Delete a product by ID
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      await this.productRepository.remove(product);
    } catch (error) {
      this.handleError(error);
    }
  }

  async search(searchPaginationDto: SearchPaginationDto) {
    try {
      const {
        limit = 10,
        offset = 0,
        name,
        sku,
        initial_price = 0,
        final_price,
      } = searchPaginationDto;

      // Search for products based on the provided criteria
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      if (name) {
        await queryBuilder.andWhere('product.name ILIKE :name', {
          name: `%${name}%`,
        });
      }
      if (sku) {
        await queryBuilder.andWhere('product.sku ILIKE :sku', {
          sku: `%${sku}%`,
        });
      }
      if (final_price) {
        await queryBuilder.andWhere(
          'product.price BETWEEN :initial_price AND :final_price',
          {
            initial_price,
            final_price,
          },
        );
      }
      const [products, total] = await queryBuilder
        .take(limit)
        .skip(offset)
        .leftJoinAndSelect('product.images', 'images')
        .getManyAndCount();

      return {
        total,
        products,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   *
   * @param error
   * @description Handle errors and throw appropriate exceptions
   * @private
   * @throws BadRequestException if the error code is 23505 (unique constraint violation)
   */
  private handleError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'An error occurred while processing your request',
      error.detail,
    );
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      await query.delete().where({}).execute();
      return true;
    } catch (error) {
      this.handleError(error);
    }
  }
}
