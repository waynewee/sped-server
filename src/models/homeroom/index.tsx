import { model, Schema, Document, Types, Model, Query } from "mongoose";
import { generateReadableId } from "./utils";

interface IHomeroom {
  code: string;
  name: string;
  description: string;
  userId: string;
  readableId?: string;
}

interface IHomeroomModel extends Model<IHomeroomDoc> {
  _new(newUser: IHomeroom): Promise<IHomeroomDoc>;
}

interface IHomeroomDoc extends IHomeroom, Document {
  validatePassword(password: string): boolean;
}

const HomeroomSchemaFields: Record<keyof IHomeroom, any> = {
  code: String,
  name: String,
  description: String,
  userId: String,
  readableId: String,
};

const HomeroomSchema = new Schema(HomeroomSchemaFields, { timestamps: true });

HomeroomSchema.statics._new = function ({ code, name, description, userId }) {
  console.log("HELLO");
  const homeroom = new Homeroom();
  homeroom.code = code;
  homeroom.name = name;
  homeroom.description = description;
  homeroom.userId = userId;
  homeroom.readableId = generateReadableId();

  console.log(homeroom);

  return homeroom;
};

const Homeroom = model<IHomeroomDoc, IHomeroomModel>(
  "Homeroom",
  HomeroomSchema
);

export { Homeroom, IHomeroom };
