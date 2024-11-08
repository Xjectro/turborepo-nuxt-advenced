export interface IUser {
  user_id: string;
  username: string;
  description: string;
  firstName: string;
  lastName: string;
  avatarURL: string;
  bannerURL: string;
  createdAt: Date;
  updatedAt: Date;
  auth: {
    email: string;
    role: string;
    tfa: boolean;
  };
}

export interface IConnection {
  id: string;
  type: string;
  name: string;
  username: string;
}
