export type Token = {
  token: string;
  payload?: TokenPayload;
};

export type TokenPayload = {
  userId: string;
  iat: number;
  exp: number;
};
