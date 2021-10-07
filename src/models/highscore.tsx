import { model, Schema, Document, Types, Model, Query } from "mongoose";

interface IHighScore {
  userId: string;
  value: number;
  subject: string;
  gameId: string;
}

interface IHighScoreModel extends Model<IHighScoreDoc> {
  _new(newUser: IHighScore): Promise<IHighScoreDoc>;
}

interface IHighScoreDoc extends IHighScore, Document {
  validatePassword(password: string): boolean;
}

const HighScoreSchemaFields: Record<keyof IHighScore, any> = {
  userId: String,
  value: Number,
  subject: String,
  gameId: String,
};

const HighScoreSchema = new Schema(HighScoreSchemaFields, { timestamps: true });

HighScoreSchema.statics._new = async function ({
  userId,
  value,
  subject,
  gameId,
}: IHighScore) {
  const highScoresForGame = await HighScore.find({ gameId })
    .sort({ value: -1 })
    .limit(10);

  if (highScoresForGame.length === 10) {
    const lowestHighScore = highScoresForGame[9];

    if (value < lowestHighScore.value) {
      return;
    }
  }

  const highScore = new HighScore();
  highScore.userId = userId;
  highScore.value = value;
  highScore.subject = subject;
  highScore.gameId = gameId;

  return highScore;
};

const HighScore = model<IHighScoreDoc, IHighScoreModel>(
  "HighScore",
  HighScoreSchema
);

export { HighScore, IHighScore };
