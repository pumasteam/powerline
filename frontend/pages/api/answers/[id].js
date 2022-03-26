import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Deta } from "deta";

const db = Deta(process.env.DETA_KEY).Base(process.env.DETA_ANS);

const handleAnswerById = async (req, res) => {
  const { id } = req.params;

  const answers = await db.fetch({ request: id });

  res.status(200).json(answers);
};

export default withApiAuthRequired(handleAnswerById);
