import bcrypt from "bcrypt";

export const hashText = async (text: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(text, salt);
};
