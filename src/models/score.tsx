import { model, Schema, Document, Types, Model, Query } from "mongoose";

interface IScore {
  userId: string;
  value: number;
  subject: string;
  gameId: string;
}

interface IScoreModel extends Model<IScoreDoc> {
  _new(newUser: IScore): Promise<IScoreDoc>;
}

interface IScoreDoc extends IScore, Document {
  validatePassword(password: string): boolean;
}

const ScoreSchemaFields: Record<keyof IScore, any> = {
  userId: String,
  value: Number,
  subject: String,
  gameId: String,
};

const ScoreSchema = new Schema(ScoreSchemaFields, { timestamps: true });

ScoreSchema.statics._new = function ({
  userId,
  value,
  subject,
  gameId,
}: IScore) {
  const score = new Score();
  score.userId = userId;
  score.value = value;
  score.subject = subject;
  score.gameId = gameId;

  return score;
};

const Score = model<IScoreDoc, IScoreModel>("Score", ScoreSchema);

export { Score, IScore };
