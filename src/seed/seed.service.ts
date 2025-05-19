import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-product';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   *
   * @returns
   *
   * This method is used to seed the database with initial data.
   */
  async execSeed() {
    await this.truncateTables();
    const user = await this.createUsers();
    await this.createProducts(user);
    return `This run  seed`;
  }

  /**
   * Step 1: Truncate the tables
   * This method is used to truncate the tables in the database.
   */
  private async truncateTables() {
    await this.productService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().from(User).where({}).execute();
    // await this.userRepository.delete({});
  }

  /**
   * Step 2: Create users
   * This method is used to create users in the database.
   */
  private async createUsers() {
    const usersData = initialData.users;

    const users: User[] = [];

    usersData.forEach((user) => users.push(this.userRepository.create(user)));
    const dbu = await this.userRepository.save(users);
    return dbu[1];
  }

  /**
   * Step 3: Create products
   * This method is used to create products in the database.
   */
  private async createProducts(user: User) {
    await this.productService.deleteAllProducts();
    // return products;
    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) =>
      insertPromises.push(this.productService.create(product, user)),
    );
    await Promise.all(insertPromises);
    return true;
  }
}
