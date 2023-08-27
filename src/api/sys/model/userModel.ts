/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  otp: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  data: {
    userId: string | number;
    token: string;
    role: RoleInfo;
  };
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  info?: any;
}

export interface GetUserInfo {
  address?: string;
  affiliatedCode?: string;
  birthDate?: string;
  chain?: string;
  city?: string;
  country?: string;
  createdAt?: number;
  email?: string;
  firstName?: string;
  id?: number;
  isActive?: boolean;
  isActive2Fa?: true;
  isTest?: true;
  jurisdiction?: any;
  lastName?: string;
  password?: string;
  phone?: string;
  rank?: string;
  referrallCode?: any;
  secret?: string;
  type?: number;
  updatedAt?: number;
  username?: string;
  verifyAt?: string;
  roles?: Array<any>;
}
