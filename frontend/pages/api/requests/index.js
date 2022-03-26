import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { Deta } from "deta";

const db = Deta(process.env.DETA_KEY).Base(process.env.DETA_REQ);

const handleCreateRequest = async (req, res) => {
  const {
    user: { email },
  } = getSession(req, res);
  const { message } = req.body;

  const request = await db.put({
    message: message,
    email: email,
  });

  res.status(200).json(request);
};

export default withApiAuthRequired(handleCreateRequest);
