import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {

  }

  async create(createProductDto: CreateProductDto) {
    try {
      const category = await this.prismaService.category.findUnique({
        where: {
          id: createProductDto.categoryId
        }
      })

      if (!category) {
        return {
          error: "Category ID not found"
        };
      }

      const product = await this.prismaService.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          brand: createProductDto.brand,
          price: createProductDto.price,
          size: createProductDto.size,
          weight: createProductDto.weight,
          color: createProductDto.color,
          imageUrl: createProductDto.imageUrl,
          categoryId: createProductDto.categoryId,
        },
      })
      return {
        message: `Create Product successfully!`,
        data: product
      };
    } catch (error) {
      return {
        error
      }
    }
  }

  async findAll() {
    const products = await this.prismaService.product.findMany({
      orderBy: {
        id: "desc"
      }
    })
    return {
      data: products
    };
  }

  async findOne(id: string) {
    try {
      const product = await this.prismaService.product.findUnique({
        where: {
          id,
        },
      })
      return {
        data: product
      };
    } catch (error) {
      return { error };
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      if (updateProductDto.categoryId) {
        const category = await this.prismaService.category.findUnique({
          where: {
            id: updateProductDto.categoryId
          }
        })

        if (!category) {
          return {
            error: "Category ID not found"
          };
        }
      }
      const productExist = await this.prismaService.product.findUnique({
        where: {
          id
        }
      });

      if (!productExist) {
        return {
          error: "Cannot find product to update"
        };
      }

      const product = await this.prismaService.product.update({
        where: {
          id
        },
        data: {
          name: updateProductDto.name,
          description: updateProductDto.description,
          brand: updateProductDto.brand,
          size: updateProductDto.size,
          price: updateProductDto.price,
          color: updateProductDto.color,
          imageUrl: updateProductDto.imageUrl,
          categoryId: updateProductDto.categoryId,
        },
      })
      return {
        message: `Updates Product #${id} successfully`,
        data: product,
      };
    } catch (error) {
      return {
        error
      };
    }
  }

  async remove(id: string) {
    const deleteProduct = await this.prismaService.product.delete({
      where: {
        id,
      },
    })
    if (deleteProduct) {
      return `Delete a product #${id} successfully`;
    }
    return {
      error: "Delete failed!"
    }
  }
}
