import { model, Schema, Document, Model } from "mongoose";
import crypto from "crypto";
import { TSubject, TUser } from "../types";

interface IUser {
  username: string;
  password: {
    hash: string;
    salt: string;
  };
  userType: TUser;
  skillPoints?: Record<TSubject, number>;
  homeroomId?: string;
}

interface INewUser {
  username: string;
  password: string;
  userType: TUser;
  homeroomId?: string;
}

interface IUserModel extends Model<IUserDoc> {
  _new(newUser: INewUser): Promise<IUserDoc>;
}

interface IUserDoc extends IUser, Document {
  _id: any;
  validatePassword(password: string): boolean;
  addSkillPoints({
    subject,
    skillPoints,
  }: {
    subject: string;
    skillPoints: number;
  }): void;
}

const UserSchemaFields: Record<keyof IUser, any> = {
  username: String,
  password: {
    hash: String,
    salt: String,
  },
  userType: String,
  homeroomId: String,
  skillPoints: Object,
};

const UserSchema = new Schema(UserSchemaFields, { timestamps: true });

UserSchema.statics._new = function ({
  username,
  userType,
  password,
  homeroomId,
}: INewUser) {
  const user = new User();
  user.username = username;
  user.userType = userType;

  if (user.userType === "student") {
    user.homeroomId = homeroomId;
  }

  user.password.salt = crypto.randomBytes(16).toString("hex");

  user.password.hash = crypto
    .pbkdf2Sync(password, user.password.salt, 1000, 64, "sha512")
    .toString("hex");

  user.skillPoints = {
    math: 0,
    english: 0,
    science: 0,
  };

  return user;
};

UserSchema.methods.validatePassword = function (password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.password.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.password.hash === hash;
};

UserSchema.methods.addSkillPoints = function ({
  subject,
  skillPoints,
}: {
  subject: string;
  skillPoints: number;
}) {
  this.skillPoints[subject] = this.skillPoints[subject] || 0;
  this.skillPoints[subject] += skillPoints;
  this.markModified("skillPoints");
};

// UserSchema.pre("save", async function (next) {
//   next();
// });

// UserSchema.post<Query<any, any>>("findOne", function (doc, next) {
//   doc.password = undefined;
//   next();
// });

const User = model<IUserDoc, IUserModel>("User", UserSchema);

export { User, IUser };
