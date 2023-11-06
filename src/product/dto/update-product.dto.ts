import { IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    price?: string

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
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    shortDescription?: string

    @IsString()
    @IsOptional()
    other?: string

    @IsString()
    @IsOptional()
    categoryId?: string
}
