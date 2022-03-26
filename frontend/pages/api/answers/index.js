import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Deta } from "deta";
import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_KEY,
});

const deta = Deta(process.env.DETA_KEY);

const db = deta.Base(process.env.DETA_ANS);
const db2 = deta.Base(process.env.DETA_REQ);

const handleCreateAnswer = async (req, res) => {
  const { user } = getSession(req, res);
  const { body } = req;

  const petition = await db2.fetch({ key: body.request });

  if (!petition) {
    return res.status(404).json({
      message: "Petition not found",
    });
  }

  const email = await client.messages.create("n.scidroid.co", {
    from: "PowerLine Help <powerline@scidroid.co>",
    to: petition.items[0].email,
    subject: "A professional has answered your petition",
    html: `Hi,<br />A professional has answered your petition.<br /><b>${user.name}</b> says:<br />${body.message}`,
  });

  const request = await db.put({
    message: body.message,
    request: body.request,
  });

  res.status(200).json(request);
};

export default withApiAuthRequired(handleCreateAnswer);
