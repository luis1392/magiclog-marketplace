import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
    unique: true,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text')
  sku: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  generateSlug() {
    if (!this.slug) {
      this.slug = this.name;
    }
    this.slug = this.slug
      .toLowerCase() // conver to lowercase
      .trim() // delete spaces
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // delete accents
      .replace(/[^a-z0-9\s-]/g, '') // delete special characters
      .replace(/\s+/g, '-') // replace spaces with -
      .replace(/-+/g, '-') // replace multiple - with single -
      .slice(0, 50); // limit to 50 characters
  }

  @BeforeUpdate()
  generateSlugOnUpdate() {
    this.slug = this.slug
      .toLowerCase() // conver to lowercase
      .trim() // delete spaces
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // delete accents
      .replace(/[^a-z0-9\s-]/g, '') // delete special characters
      .replace(/\s+/g, '-') // replace spaces with -
      .replace(/-+/g, '-') // replace multiple - with single -
      .slice(0, 50); // limit to 50 characters
  }
}
