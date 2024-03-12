import { PrismaClient, User, UserProfile, UserType } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserProfileDto } from '@/dtos/userProfile.dto';

@Service()
export class UserProfileService {
  public userProfile = new PrismaClient().userProfile;
  public country = new PrismaClient().country;
  public user = new PrismaClient().user;

  public async findUserProfileById(
    userId: number,
  ): Promise<UserProfile & { type?: UserType; isVerified: boolean; isPremium: boolean; isBanned: boolean }> {
    try {
      const findUserProfile: UserProfile = await this.userProfile.findUnique({ where: { userId: userId }, include: { location: true } });
      const findUser: User = await this.user.findUnique({ where: { id: userId } });

      if (!findUserProfile) throw new HttpException(409, "UserProfile doesn't exist");
      return { ...findUserProfile, type: findUser.type, isVerified: findUser.isVerified, isPremium: findUser.isPremium, isBanned: findUser.isBanned };
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async createUserProfile(userProfileData: UserProfileDto, req: RequestWithUser): Promise<UserProfile> {
    try {
      const createProfile: UserProfile = await this.userProfile.create({
        data: {
          name: userProfileData.name,
          User: { connect: { id: req.user.id } },
        },
        include: { location: true },
      });

      if (!createProfile) throw new HttpException(409, "UserProfile doesn't exist");
      return await this.updateUserProfile(userProfileData, req);
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async updateUserProfile(userProfileData: UserProfileDto, req: RequestWithUser): Promise<UserProfile> {
    try {
      const createProfile: UserProfile = await this.userProfile.findUnique({ where: { userId: req.user.id } });
      if (!createProfile) throw new HttpException(409, "UserProfile doesn't exist");

      if (userProfileData.location) {
        const country = await this.country.findUnique({ where: { code: userProfileData.location } });
        if (!country) throw new HttpException(409, "Country doesn't exist");
        await this.userProfile.update({
          where: { userId: req.user.id },
          data: { location: { connect: { code: userProfileData.location } } },
        });
      }

      if (typeof userProfileData.description !== 'undefined') {
        await this.userProfile.update({
          where: { userId: req.user.id },
          data: { description: userProfileData.description },
        });
      }

      if (typeof userProfileData.facebook !== 'undefined') {
        await this.userProfile.update({
          where: { userId: req.user.id },
          data: { facebook: userProfileData.facebook },
        });
      }

      if (typeof userProfileData.twitter !== 'undefined') {
        await this.userProfile.update({
          where: { userId: req.user.id },
          data: { twitter: userProfileData.twitter },
        });
      }

      if (typeof userProfileData.instagram !== 'undefined') {
        await this.userProfile.update({
          where: { userId: req.user.id },
          data: { instagram: userProfileData.instagram },
        });
      }

      if (typeof userProfileData.youtube !== 'undefined') {
        await this.userProfile.update({
          where: { userId: req.user.id },
          data: { youtube: userProfileData.youtube },
        });
      }

      if (typeof userProfileData.twitch !== 'undefined') {
        await this.userProfile.update({
          where: { userId: req.user.id },
          data: { twitch: userProfileData.twitch },
        });
      }

      if (typeof userProfileData.image !== 'undefined') {
        await this.userProfile.update({
          where: { userId: req.user.id },
          data: { image: userProfileData.image },
        });
      }

      if (typeof userProfileData.banner !== 'undefined') {
        await this.userProfile.update({
          where: { userId: req.user.id },
          data: { banner: userProfileData.banner },
        });
      }

      if (typeof userProfileData.fullName !== 'undefined') {
        await this.userProfile.update({
          where: { userId: req.user.id },
          data: { fullName: userProfileData.fullName },
        });
      }

      return await this.userProfile.findUnique({ where: { userId: req.user.id }, include: { location: true } });
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
