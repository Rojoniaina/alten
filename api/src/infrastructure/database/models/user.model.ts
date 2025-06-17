import { model, Schema, Document } from "mongoose";
import { User } from "../../../domain/models/user";
import { hashText } from "../../../utils/helpers";

interface IUser extends User, Document {
  id: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  // pour ajouter `id`
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await hashText(user.password);
  next();
});

export const UserModel = model<IUser>("User", UserSchema);
