import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Deta } from "deta";

const deta = Deta(process.env.DETA_KEY);

const db = deta.Base(process.env.DETA_REQ);
const db2 = deta.Base(process.env.DETA_ANS);

const handleCreateAnswer = async (req, res) => {
  const request = await db.fetch();

  const requests = [];

  for (let i = 0; i < request.count; i++) {
    const comments = await db2.fetch({ request: request.items[i].key });
    requests.push({
      key: request.items[i].key,
      message: request.items[i].message,
      email: request.items[i].email,
      comments: comments.items,
    });
  }

  res.status(200).json(requests);
};

export default withApiAuthRequired(handleCreateAnswer);
