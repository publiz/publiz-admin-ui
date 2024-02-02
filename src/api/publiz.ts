import ky from "ky";
import { firebaseAuth } from "./firebase";

// type Option = {
//   token?: string;
// };
export type BaseResponse<T> = {
  data: T;
};
export type User = {
  id: number;
  authId: string;
  displayName: string;
  avatarUrl?: string;
  coverUrl?: string;
};

export type Organization = {
  id: number;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  coverUrl?: string;
  verified: boolean;
  ownerId: number;
};

export type TagType = "SYSTEM" | "DEFAULT";
export type Tag = {
  id: number;
  name: string;
  slug: string;
  type: TagType;
  organizationId?: number;
  userId: number;
};
export const publizClient = ky.extend({
  prefixUrl: import.meta.env.VITE_BASE_PUBLIZ_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await firebaseAuth.currentUser?.getIdToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export const getMyProfile = () =>
  publizClient.get("api/v1/users/my_profile").json<BaseResponse<User>>();

export const getOrganizations = () =>
  publizClient.get("api/v1/organizations").json<BaseResponse<Organization[]>>();
  
export const getTags = () =>
  publizClient.get("api/v1/tags").json<BaseResponse<Tag[]>>();
export type CreateOrganizationInput = {
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  coverUrl?: string;
  verified: boolean;
  ownerId: number;
};

export const createOrganization = (input: CreateOrganizationInput) => {
  return publizClient
    .post("admin/api/v1/organizations", { json: input })
    .json<BaseResponse<Organization>>();
};

export type CreateTagInput = {
  name: string;
  slug: string;
  type: TagType;
  organizationId?: number;
  userId: number;
};
export const createTag = (input: CreateTagInput) => {
  return publizClient
    .post("admin/api/v1/tags", { json: input })
    .json<BaseResponse<Tag>>();
};