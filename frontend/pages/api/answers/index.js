import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Deta } from "deta";

const db = Deta(process.env.DETA_KEY).Base(process.env.DETA_ANS);

const handleCreateAnswer = async (req, res) => {
  const { body } = req;

  const request = await db.put({
    message: body.message,
    request: body.request,
  });

  res.status(200).json(request);
};

export default withApiAuthRequired(handleCreateAnswer);
