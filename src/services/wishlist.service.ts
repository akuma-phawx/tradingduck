import { PrismaClient, WishList } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser } from '@/interfaces/auth.interface';

@Service()
export class WishlistService {
  public wishlist = new PrismaClient().wishList;
  public card = new PrismaClient().card;

  public async findWishlistsByUser(userId: number): Promise<WishList> {
    try {
      const wishlist = await this.wishlist.findFirst({
        where: { userId },
        include: {
          cards: {
            include: {
              set: { select: { name: true, identifier: true, image: true } },
            },
          },
        },
      });
      if (!wishlist) throw new HttpException(409, "User doesn't have a wishlist yet");
      return wishlist;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async getWishlist(req: RequestWithUser): Promise<WishList> {
    try {
      let wishlist: WishList | undefined = await this.wishlist.findFirst({
        where: { userId: req.user.id },
        include: {
          cards: {
            include: {
              set: { select: { name: true, identifier: true, image: true } },
            },
          },
        },
      });
      if (!wishlist) {
        wishlist = await this.createWishlist(req.user.id);
      }
      return wishlist;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findWishlistById(wishlistId: number): Promise<WishList> {
    try {
      const findWishlist: WishList = await this.wishlist.findUnique({
        where: { id: wishlistId },
        include: {
          cards: {
            include: {
              set: { select: { name: true, identifier: true, image: true } },
            },
          },
        },
      });
      if (!findWishlist) throw new HttpException(409, "Wishlist doesn't exist");

      return findWishlist;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async addCardToWishlist(card: string, req: RequestWithUser): Promise<WishList> {
    try {
      const cardExists = await this.card.findUnique({ where: { identifier: card } });
      if (!cardExists) throw new HttpException(409, "Card doesn't exist");

      let wishlist = await this.wishlist.findFirst({ where: { userId: req.user.id } });
      if (!wishlist) {
        wishlist = await this.createWishlist(req.user.id);
      }

      const addCardToWishlist: WishList = await this.wishlist.update({
        where: { id: wishlist.id },
        data: { cards: { connect: { identifier: card } } },
      });

      return addCardToWishlist;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async createWishlist(userId: number): Promise<WishList> {
    try {
      const wishlist: WishList = await this.wishlist.create({ data: { userId } });
      return wishlist;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async removeCardFromWishlist(card: string, req: RequestWithUser): Promise<WishList> {
    try {
      const doesWishlistExist = await this.wishlist.findFirst({ where: { userId: req.user.id } });
      if (!doesWishlistExist) throw new HttpException(409, "Wishlist doesn't exist");

      const cardExists = await this.card.findFirst({ where: { identifier: card } });
      if (!cardExists) throw new HttpException(409, "Card doesn't exist");

      const removeCardFromWishlist: WishList = await this.wishlist.update({
        where: { id: doesWishlistExist.id },
        data: { cards: { disconnect: { identifier: card } } },
      });
      return removeCardFromWishlist;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
