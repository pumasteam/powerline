import { NextResponse } from "next/server";

const middleware = async (req) => {
  const { nextUrl: url, geo } = req;

  const country = geo.country || "US";

  url.searchParams.set("country", country);

  return NextResponse.rewrite(url);
};

export default middleware;
