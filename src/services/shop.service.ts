import { PrismaClient, Shop } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { CreateShopDto } from '@/dtos/shop.dto';

@Service()
export class ShopService {
  public shop = new PrismaClient().shop;
  public user = new PrismaClient().user;

  public async findAllShop(): Promise<Shop[]> {
    try {
      const allShop: Shop[] = await this.shop.findMany({
        include: {
          location: true,
        },
      });
      return allShop;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findShopById(shopId: number): Promise<Shop | null> {
    try {
      const shop: Shop | null = await this.shop.findUnique({
        where: { id: Number(shopId) },
      });
      return shop;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async createShop(shopData: CreateShopDto): Promise<Shop> {
    try {
      const shop: Shop = await this.shop.create({
        data: { ...shopData },
      });
      return shop;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async updateShop(shopId: number, shopData: CreateShopDto): Promise<Shop> {
    try {
      const shop: Shop = await this.shop.update({
        where: { id: Number(shopId) },
        data: { ...shopData },
      });
      return shop;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async deleteShop(shopId: number): Promise<Shop> {
    try {
      const deletedShop: Shop = await this.shop.delete({
        where: { id: Number(shopId) },
      });
      return deletedShop;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async addShopToNearBy(shopId: number, userId: number): Promise<Shop> {
    try {
      const shop: Shop = await this.shop.update({
        where: { id: Number(shopId) },
        data: {
          usersNearBy: {
            connect: {
              id: Number(userId),
            },
          },
        },
      });
      return shop;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async removeShopFromNearBy(shopId: number, userId: number): Promise<Shop> {
    try {
      const shop: Shop = await this.shop.update({
        where: { id: Number(shopId) },
        data: {
          usersNearBy: {
            disconnect: {
              id: Number(userId),
            },
          },
        },
      });
      return shop;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findShopsNearBy(userId: number): Promise<Shop[]> {
    try {
      const shops: Shop[] = await this.shop.findMany({
        where: {
          usersNearBy: {
            some: {
              id: Number(userId),
            },
          },
        },
      });
      return shops;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
