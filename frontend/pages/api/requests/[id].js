import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Deta } from "deta";

const db = Deta(process.env.DETA_KEY).Base(process.env.DETA_REQ);

const handleRequestById = async (req, res) => {
  const { id } = req.params;

  const request = await db.fetch({ id: id });

  res.status(200).json(request);
};

export default withApiAuthRequired(handleRequestById);
