import { randomBytes } from "crypto";
export const generateApiKey = async () => {
  return `cd-${randomBytes(20).toString("base64")}`;
};
