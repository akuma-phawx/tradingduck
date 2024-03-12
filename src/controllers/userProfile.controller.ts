import { UserProfileService } from './../services/userProfile.service';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class UserProfileController {
  public userProfile = Container.get(UserProfileService);

  public getUserProfile = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const findUserProfileData = await this.userProfile.findUserProfileById(userId);

      res.status(200).json({ data: findUserProfileData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getUserProfileById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findUserProfileData = await this.userProfile.findUserProfileById(userId);

      res.status(200).json({ data: findUserProfileData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateUserProfile = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userProfileData = req.body;
      const userId = Number(req.user.id);
      const findProfile = await this.userProfile.findUserProfileById(userId);
      if (findProfile.userId !== userId) throw new Error('Unauthorized');
      const updateProfileData = await this.userProfile.updateUserProfile(userProfileData, req);

      res.status(200).json({ data: updateProfileData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
