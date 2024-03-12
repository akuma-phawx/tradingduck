import { CreateUserInterface } from './../interfaces/users.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { UserService } from '@/services/users.service';
import { ADMIN_KEY } from '@/config';
import { UserType } from '@prisma/client';
import { logger } from '@/utils/logger';

export class AuthController {
  public auth = Container.get(AuthService);
  public user = Container.get(UserService);

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserInterface = req.body;
      if (userData.password !== userData.confirmPassword) throw new Error('Password is not matching');
      userData.confirmPassword = undefined;
      if (ADMIN_KEY) {
        if (userData.adminKey === ADMIN_KEY) {
          userData.type = UserType.ADMIN;
        } else {
          userData.type = UserType.USER;
        }
      } else {
        userData.type = UserType.USER;
      }
      userData.adminKey = undefined;
      const signUpUserData: Partial<User> = await this.auth.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const { cookie, findUser } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: Partial<User> = await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.params;
      await this.auth.verifyEmail(token);

      res.redirect('/app/');
    } catch (error) {
      res.redirect('/app/');
    }
  };

  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      await this.auth.handleForgotPassword(email);

      res.status(200).json({ data: '', message: 'forgotPassword' });
    } catch (error) {
      // log error internaly but not send 500 response to user
      logger.error(error);
      console.log(error);
      res.status(200).json({ data: '', message: 'forgotPassword' });
    }
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { password, confirmPassword, token } = req.body;
      if (password !== confirmPassword) throw new Error('Password is not matching');
      const resetPasswordUserData = await this.auth.resetPasswordWithToken(token, password);

      res.status(200).json({ data: resetPasswordUserData, message: 'resetPassword' });
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { oldPassword, password, confirmPassword } = req.body;
      if (password !== confirmPassword) throw new Error('Password is not matching');
      const changePasswordUserData = await this.auth.changePassword(req.user, oldPassword, password);

      res.status(200).json({ data: changePasswordUserData, message: 'changePassword' });
    } catch (error) {
      next(error);
    }
  };

  public amILoggedIn = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: '', message: 'loggedIn' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMe = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.user;
      const deleteUserData = await this.user.deleteUser(id);

      res.status(200).json({ data: deleteUserData, message: 'deleteMe' });
    } catch (error) {
      next(error);
    }
  };
}
