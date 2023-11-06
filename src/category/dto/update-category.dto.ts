import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from '../dto';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string
}
