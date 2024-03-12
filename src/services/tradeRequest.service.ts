import { CreateTradeRequestDto } from './../dtos/tradeRequest.dto';
import { PrismaClient, TradeRequest, TradeRequestMessage } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser } from '@/interfaces/auth.interface';

const includeAll = {
  wantCards: {
    select: {
      id: true,
      userId: true,
      cardId: true,
      image: true,
      userImage: true,
      condition: true,
      card: true,
      language: true,
      grade: true,
    },
  },
  giveCards: {
    select: {
      id: true,
      userId: true,
      cardId: true,
      image: true,
      userImage: true,
      condition: true,
      card: true,
      language: true,
      grade: true,
    },
  },
  messages: true,
  tradeStatus: true,
  sendUser: {
    select: {
      id: true,
      email: true,
      userProfile: true,
    },
  },
  incUser: {
    select: {
      id: true,
      email: true,
      userProfile: true,
    },
  },
};

@Service()
export class TradeRequestService {
  public tradeRequest = new PrismaClient().tradeRequest;
  public tradeStatus = new PrismaClient().tradeStatus;
  public message = new PrismaClient().tradeRequestMessage;
  public userCards = new PrismaClient().userCard;
  public user = new PrismaClient().user;
  public card = new PrismaClient().card;

  public async findAllSendTradeRequestsByUser(userId: number): Promise<TradeRequest[]> {
    try {
      const allTradeRequests: TradeRequest[] = await this.tradeRequest.findMany({
        where: { sendUserId: userId },
        include: includeAll,
      });
      return allTradeRequests;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findAllIncTradeRequestsByUser(userId: number): Promise<TradeRequest[]> {
    try {
      const allTradeRequests: TradeRequest[] = await this.tradeRequest.findMany({
        where: { incUserId: userId },
        include: includeAll,
      });
      return allTradeRequests;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findTradeRequestById(tradeRequestId: number, req: RequestWithUser): Promise<TradeRequest> {
    try {
      const findTradeRequest: TradeRequest = await this.tradeRequest.findUnique({
        where: { id: tradeRequestId },
        include: includeAll,
      });
      if (!findTradeRequest) throw new HttpException(409, "TradeRequest doesn't exist");

      if (findTradeRequest.sendUserId !== req.user.id && findTradeRequest.incUserId !== req.user.id)
        throw new HttpException(409, "You don't have access to this tradeRequest");
      return findTradeRequest;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async createTradeRequest(tradeRequestData: CreateTradeRequestDto, req: RequestWithUser): Promise<TradeRequest> {
    try {
      const doesToUserExist = await this.user.findUnique({ where: { id: tradeRequestData.toUserId } });
      if (!doesToUserExist) throw new HttpException(409, "User doesn't exist");

      const completeTradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'completed' } });
      const cancelledTradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'cancelled' } });
      const rejectedTradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'rejected' } });

      const nrOfTradeRequests = await this.tradeRequest.count({
        where: {
          sendUserId: req.user.id,
          tradeStatusId: {
            not: {
              in: [completeTradeStatus.id, cancelledTradeStatus.id, rejectedTradeStatus.id],
            },
          },
        },
      });
      if (nrOfTradeRequests >= 5) throw new HttpException(409, 'You can only have 5 tradeRequests ');

      const dedupedWantCards = [...new Set(tradeRequestData.wantCards)];
      const dedupedGiveCards = [...new Set(tradeRequestData.giveCards)];

      const areAllGiveCardsValid = await this.userCards.findMany({ where: { id: { in: dedupedGiveCards }, userId: req.user.id } });
      const areAllWantCardsValid = await this.userCards.findMany({ where: { id: { in: dedupedWantCards }, userId: tradeRequestData.toUserId } });
      if (areAllGiveCardsValid.length !== dedupedGiveCards.length) throw new HttpException(409, 'Not all giveCards are valid');
      if (areAllWantCardsValid.length !== dedupedWantCards.length) throw new HttpException(409, 'Not all wantCards are valid');

      const tradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'pending' } });
      if (!tradeStatus) throw new HttpException(409, 'TradeStatus not found');

      if (tradeRequestData.toUserId === req.user.id) throw new HttpException(409, 'You cannot trade with yourself');

      if (dedupedGiveCards.length === 0) throw new HttpException(409, 'You need to give at least one card');
      if (dedupedWantCards.length === 0) throw new HttpException(409, 'You need to want at least one card');

      if (tradeRequestData.message) {
        const createTradeRequestData: TradeRequest = await this.tradeRequest.create({
          data: {
            sendUser: {
              connect: {
                id: req.user.id,
              },
            },
            incUser: {
              connect: {
                id: tradeRequestData.toUserId,
              },
            },
            wantCards: {
              connect: dedupedWantCards.map(id => ({ id })),
            },
            giveCards: {
              connect: dedupedGiveCards.map(id => ({ id })),
            },
            tradeStatus: {
              connect: {
                id: tradeStatus.id,
              },
            },
            messages: {
              create: {
                message: tradeRequestData.message,
                user: {
                  connect: {
                    id: req.user.id,
                  },
                },
              },
            },
          },
        });
        return createTradeRequestData;
      }
      const createTradeRequestData: TradeRequest = await this.tradeRequest.create({
        data: {
          sendUser: {
            connect: {
              id: req.user.id,
            },
          },
          incUser: {
            connect: {
              id: tradeRequestData.toUserId,
            },
          },
          wantCards: {
            connect: dedupedWantCards.map(id => ({ id })),
          },
          giveCards: {
            connect: dedupedGiveCards.map(id => ({ id })),
          },
          tradeStatus: {
            connect: {
              id: tradeStatus.id,
            },
          },
        },
      });
      return createTradeRequestData;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async addMessageToTradeRequest(tradeRequestId: number, message: string, req: RequestWithUser): Promise<TradeRequest> {
    try {
      const tradeRequest = await this.tradeRequest.findUnique({ where: { id: tradeRequestId } });
      if (!tradeRequest) throw new HttpException(409, "TradeRequest doesn't exist");

      if (tradeRequest.sendUserId !== req.user.id && tradeRequest.incUserId !== req.user.id)
        throw new HttpException(409, 'You cannot see this tradeRequest');

      const createMessage = await this.tradeRequest.update({
        where: { id: tradeRequestId },
        data: {
          messages: {
            create: {
              message,
              user: {
                connect: {
                  id: req.user.id,
                },
              },
            },
          },
        },
      });
      return createMessage;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async getMessagesFromTradeRequest(tradeRequestId: number, req: RequestWithUser): Promise<TradeRequestMessage[]> {
    try {
      const tradeRequest = await this.tradeRequest.findUnique({ where: { id: tradeRequestId } });
      if (!tradeRequest) throw new HttpException(409, "TradeRequest doesn't exist");

      if (tradeRequest.sendUserId !== req.user.id && tradeRequest.incUserId !== req.user.id)
        throw new HttpException(409, 'You cannot see this tradeRequest');

      const messages = await this.message.findMany({
        where: { tradeRequestId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
      return messages;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async acceptTradeRequest(tradeRequestId: number, req: RequestWithUser): Promise<TradeRequest> {
    try {
      const tradeRequest = await this.tradeRequest.findUnique({ where: { id: tradeRequestId } });
      if (!tradeRequest) throw new HttpException(409, "TradeRequest doesn't exist");

      if (tradeRequest.incUserId !== req.user.id) throw new HttpException(409, 'You cannot accept this tradeRequest');

      const tradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'accepted' } });
      if (!tradeStatus) throw new HttpException(409, 'TradeStatus not found');

      const updateTradeRequest = await this.tradeRequest.update({
        where: { id: tradeRequestId },
        data: {
          tradeStatus: {
            connect: {
              id: tradeStatus.id,
            },
          },
        },
      });
      return updateTradeRequest;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async completeTradeRequest(tradeRequestId: number, req: RequestWithUser): Promise<TradeRequest> {
    try {
      const tradeRequest = await this.tradeRequest.findUnique({
        where: { id: tradeRequestId },
        include: {
          tradeStatus: true,
        },
      });
      if (!tradeRequest) throw new HttpException(409, "TradeRequest doesn't exist");

      if (tradeRequest.sendUserId !== req.user.id && tradeRequest.incUserId !== req.user.id)
        throw new HttpException(409, 'You cannot complete this tradeRequest');

      const isMyTradeRequest = tradeRequest.sendUserId === req.user.id;

      const curTradeStatus = tradeRequest.tradeStatus.identifier;
      let tradeStatus;

      const complettableStatuses = ['accepted', 'completed-reviecer', 'completed-sender'];

      if (complettableStatuses.includes(curTradeStatus)) {
        if (curTradeStatus === 'completed-reviecer' && isMyTradeRequest) {
          tradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'completed' } });
        }

        if (curTradeStatus === 'completed-sender' && !isMyTradeRequest) {
          tradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'completed' } });
        }

        if (curTradeStatus === 'completed-sender' && isMyTradeRequest) {
          throw new HttpException(409, 'You already completed this tradeRequest');
        }

        if (curTradeStatus === 'accepted' && !isMyTradeRequest) {
          tradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'completed-reviecer' } });
        }

        if (curTradeStatus === 'accepted' && isMyTradeRequest) {
          tradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'completed-sender' } });
        }
      } else {
        throw new HttpException(409, 'You cannot complete this tradeRequest');
      }

      const updateTradeRequest = await this.tradeRequest.update({
        where: { id: tradeRequestId },
        data: {
          tradeStatus: {
            connect: {
              id: tradeStatus.id,
            },
          },
        },
      });
      return updateTradeRequest;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async declineTradeRequest(tradeRequestId: number, req: RequestWithUser): Promise<TradeRequest> {
    try {
      const tradeRequest = await this.tradeRequest.findUnique({ where: { id: tradeRequestId } });
      if (!tradeRequest) throw new HttpException(409, "TradeRequest doesn't exist");

      if (tradeRequest.incUserId !== req.user.id) throw new HttpException(409, 'You cannot decline this tradeRequest');

      const tradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'rejected' } });
      if (!tradeStatus) throw new HttpException(409, 'TradeStatus not found');

      const updateTradeRequest = await this.tradeRequest.update({
        where: { id: tradeRequestId },
        data: {
          tradeStatus: {
            connect: {
              id: tradeStatus.id,
            },
          },
        },
      });
      return updateTradeRequest;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async cancelTradeRequest(tradeRequestId: number, req: RequestWithUser): Promise<TradeRequest> {
    try {
      const tradeRequest = await this.tradeRequest.findUnique({ where: { id: tradeRequestId } });
      if (!tradeRequest) throw new HttpException(409, "TradeRequest doesn't exist");

      if (tradeRequest.sendUserId !== req.user.id) throw new HttpException(409, 'You cannot cancel this tradeRequest');

      const tradeStatus = await this.tradeStatus.findUnique({ where: { identifier: 'cancelled' } });
      if (!tradeStatus) throw new HttpException(409, 'TradeStatus not found');

      const updateTradeRequest = await this.tradeRequest.update({
        where: { id: tradeRequestId },
        data: {
          tradeStatus: {
            connect: {
              id: tradeStatus.id,
            },
          },
        },
      });
      return updateTradeRequest;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async deleteTradeRequest(tradeRequestId: number, req: RequestWithUser): Promise<TradeRequest> {
    try {
      const tradeRequest = await this.tradeRequest.findUnique({ where: { id: tradeRequestId } });
      if (!tradeRequest) throw new HttpException(409, "TradeRequest doesn't exist");

      if (tradeRequest.sendUserId !== req.user.id) throw new HttpException(409, 'You cannot delete this tradeRequest');

      const deleteTradeRequest = await this.tradeRequest.delete({ where: { id: tradeRequestId } });
      return deleteTradeRequest;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
