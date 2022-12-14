import { type } from "os";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
      LINE_ID: string;
      LINE_SECRET: string;
      LINE_CHANNEL: string;
      DATABASE_URL: string;
      SECRET: string;
    }
  }

  type UserProfile = {
    id: string;
    name: string;
    email: string;
    image: string | "";
    account: Account;
    profile: Profile;
  };

  type Account = {
    access_token: String | null;
    providerAccountId: String;
  };

  type Profile = {
    id: string;
    userId: string;
    firstname: string | null;
    lastname: string | null;
    nickname: string | null;
    sex: string | null;
    phone: string | null;
    birthday: Date | null;
  };
}
