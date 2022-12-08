namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    LINE_ID: string;
    LINE_SECRET: string;
    DATABASE_URL: string;
    SECRET: string;
  }
}
