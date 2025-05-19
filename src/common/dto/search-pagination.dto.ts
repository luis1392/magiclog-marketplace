import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class SearchPaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset?: number;

  @IsOptional()
  name: string;

  @IsOptional()
  sku: string;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  initial_price: string;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  final_price: string;
}
