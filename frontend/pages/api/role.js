import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

const updateRole = async (req, res) => {
  const { isMedic } = JSON.parse(req.body);
  const { user } = getSession(req, res);

  const roleId = isMedic ? "rol_KSb5rXDcYVX53cBE" : "rol_IGtViUej5jfi3ts1";

  const request = await fetch(
    `https://powerlinehelp.us.auth0.com/api/v2/users/${user.sub}/roles`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.AUTH0_MNGT_KEY}`,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      body: JSON.stringify({
        roles: [roleId],
      }),
    }
  );

  if (request.status == 204) {
    res.status(200).json({
      message: "Role updated successfully",
    });
  } else {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default withApiAuthRequired(updateRole);
