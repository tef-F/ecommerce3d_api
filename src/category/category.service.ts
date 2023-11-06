import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {

  }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prismaService.category.create({
        data: {
          name: createCategoryDto.name,
          description: createCategoryDto.description
        }
      })
      return {
        message: `Create category successfully!`,
        data: category
      };
    } catch (error) {
      return {
        error
      }
    }
  }

  async findAll() {
    const categorys = await this.prismaService.category.findMany({
      orderBy: {
        id: "desc"
      }
    })
    return {
      data: categorys
    };
  }

  async findOne(id: string) {
    try {
      const category = await this.prismaService.category.findUnique({
        where: {
          id,
        },
      })
      return {
        data: category
      };
    } catch (error) {
      return { error };
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.prismaService.category.update({
        where: {
          id
        },
        data: {
          name: updateCategoryDto.name,
          description: updateCategoryDto.description,
        },
      })
      return {
        message: `Updates category #${id} successfully`,
        data: category,
      };
    } catch (error) {
      return {
        error
      };
    }
  }

  async remove(id: string) {
    const deleteUser = await this.prismaService.category.delete({
      where: {
        id,
      },
    })
    if (deleteUser) {
      return `Delete a category #${id} successfully`;
    }
    return {
      error: "Delete failed!"
    }
  }
}
