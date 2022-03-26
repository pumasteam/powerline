import requestIp from "request-ip";
import geoip from "geoip-lite";

const getHelpline = async (req, res) => {
  const { query } = req.body;

  const clientIp =
    requestIp.getClientIp(req).replace("::1", "").replace("127.0.0.1", "") ||
    "200.75.87.107";

  const geo = geoip.lookup(clientIp).country;

  const request = await fetch(
    `http://170.187.136.98:8000/?message=${query}&country_code=${geo}`
  );

  const helpline = await request.json();

  res.status(200).json(helpline);
};

export default getHelpline;
