import { Configuration } from "openai";
export const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPENAI_SECRET,
    organization: process.env.ORGANIZATION_SECRET,
  });

  return config;
};
