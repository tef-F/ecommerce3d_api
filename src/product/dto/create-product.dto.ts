import { IsNotEmpty, IsInt, IsOptional, IsString, IsNumber } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    price: string

    @IsString()
    @IsOptional()
    brand?: string

    @IsString()
    @IsOptional()
    weight?: string

    @IsString()
    @IsOptional()
    size?: string

    @IsString()
    @IsOptional()
    imageUrl?: string

    @IsString()
    @IsOptional()
    color?: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsOptional()
    shortDescription?: string

    @IsString()
    @IsOptional()
    other?: string

    @IsString()
    @IsNotEmpty()
    categoryId: string
}