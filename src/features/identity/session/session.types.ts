interface ISession {
  sessionId: string;
  userId: string;
  isBlocked: boolean;
  createdAt: Date;
  expiredAt: Date;
  isExpired: boolean;
}

interface IGetSessionDto {
  sessionId: string;
  userId: string;
  isBlocked: boolean;
  createdAt: string;
  expiredAt: string;
}
