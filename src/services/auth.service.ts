import { EmailService } from './email.service';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service, Container } from 'typedi';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { includesProfanity } from '@/utils/profanityFilter';

const selectSettings = {
  select: {
    id: true,
    email: true,
    type: true,
  },
};

@Service()
export class AuthService {
  public users = new PrismaClient().user;
  public userProfile = new PrismaClient().userProfile;
  public userVerification = new PrismaClient().userVerification;
  public passwordReset = new PrismaClient().passwordReset;

  public emailService = Container.get(EmailService);

  public async signup(userData: CreateUserDto): Promise<Partial<User>> {
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const usernameTaken = await this.userProfile.findUnique({ where: { name: userData.name } });
    if (usernameTaken) throw new HttpException(409, `This username ${userData.name} already exists`);

    if (includesProfanity(userData.name)) throw new HttpException(409, `This username ${userData.name} is not allowed`);
    const username = userData.name;
    userData.name = undefined;

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Partial<User> = await this.users.create({ data: { ...userData, password: hashedPassword }, ...selectSettings });
    const createUserVerification = await this.userVerification.create({ data: { user: { connect: { id: createUserData.id } } } });

    await this.userProfile.create({
      data: {
        name: username,
        User: { connect: { id: createUserData.id } },
      },
    });

    const emailTemplate = `
      <h1>Verify your email</h1>
      <p>Click <a href="https://tradingduck.com/verify/${createUserVerification.token}">here</a> to verify your email</p>
      <p>Or copy this link: https://tradingduck.com/verify/${createUserVerification.token}</p>
    `;

    try {
      await this.emailService.sendEmail(userData.email, 'Tradingduck: Verify your email', '', emailTemplate);
    } catch (error) {
      console.log(error);
    }

    return createUserData;
  }

  public async login(userData: Partial<User>): Promise<{ cookie: string; findUser: Partial<User> }> {
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    if (findUser.isBanned) throw new HttpException(409, `This account is banned`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const displayUser = await this.users.findUnique({ where: { email: userData.email }, ...selectSettings });

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser: displayUser };
  }

  public async verifyEmail(token: string): Promise<void> {
    const findUserVerification = await this.userVerification.findUnique({ where: { token } });
    if (!findUserVerification) throw new HttpException(409, 'Invalid token');

    await this.users.update({ where: { id: findUserVerification.userId }, data: { isVerified: true } });
    await this.userVerification.delete({ where: { id: findUserVerification.id } });
  }

  public async logout(userData: User): Promise<Partial<User>> {
    const findUser: Partial<User> = await this.users.findFirst({ where: { email: userData.email, password: userData.password }, ...selectSettings });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public async handleForgotPassword(email: string): Promise<void> {
    const findUser = await this.users.findUnique({ where: { email } });
    if (!findUser) throw new HttpException(409, 'This email was not found');

    const findToken = await this.passwordReset.findFirst({ where: { userId: findUser.id, createdAt: { gt: new Date(Date.now() - 3600000) } } });
    if (findToken) {
      await this.passwordReset.deleteMany({
        where: { userId: findUser.id, createdAt: { lt: new Date(Date.now() - 3600000) } },
      });
      throw new HttpException(409, 'You already requested a password reset');
    }

    const pwToken = await this.passwordReset.create({ data: { user: { connect: { id: findUser.id } } } });

    const emailTemplate = `
        <h1>Reset your password</h1>
        <p>Click <a href="https://tradingduck.com/reset-password/${pwToken.token}">here</a> to reset your password</p>
        <p>Or copy this link: http://tradingduck.com/reset-password/${pwToken.token}</p>
      `;
    try {
      await this.emailService.sendEmail(email, 'Tradingduck: Reset your password', '', emailTemplate);
    } catch (error) {
      console.log(error);
      throw new HttpException(500, 'Something went wrong');
    }
  }

  public async resetPasswordWithToken(token: string, password: string): Promise<void> {
    // find token with max 1 hour old
    const findToken = await this.passwordReset.findFirst({ where: { token, createdAt: { gt: new Date(Date.now() - 3600000) } } });
    if (!findToken) {
      // delete all tokens older than 1 hour
      await this.passwordReset.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 3600000) } } });
      throw new HttpException(409, 'Invalid token');
    }

    const hashedPassword = await hash(password, 10);
    await this.users.update({ where: { id: findToken.userId }, data: { password: hashedPassword } });
    await this.passwordReset.delete({ where: { id: findToken.id } });
  }

  public async changePassword(user: User, oldPassword: string, newPassword: string): Promise<void> {
    const findUser = await this.users.findUnique({ where: { id: user.id } });
    if (!findUser) throw new HttpException(409, 'User not found');

    const isPasswordMatching: boolean = await compare(oldPassword, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const hashedPassword = await hash(newPassword, 10);
    await this.users.update({ where: { id: user.id }, data: { password: hashedPassword } });
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
