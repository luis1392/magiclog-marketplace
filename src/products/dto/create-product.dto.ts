import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsPositive()
  @IsInt()
  stock: number;

  @IsString()
  sku: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  images?: string[];
}
