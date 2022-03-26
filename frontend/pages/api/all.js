import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Deta } from "deta";

const deta = Deta(process.env.DETA_KEY);

const db = deta.Base(process.env.DETA_ANS);
const db2 = deta.Base(process.env.DETA_REQ);

const handleCreateAnswer = async (req, res) => {
  let request = await db.fetch();

  request = request.items.map(async (item) => {
    const comments = await db2.fetch({ request: item.key });
    return {
      ...item,
      comments: comments.items,
    };
  });

  res.status(200).json(request);
};

export default withApiAuthRequired(handleCreateAnswer);
