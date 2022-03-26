import Link from "next/link";
import { Button } from "theme-ui";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <header className="flex justify-around items-center">
      <h1>
        <Link href="/">
          <a>PowerLine</a>
        </Link>
      </h1>
      <Button
        variant="cta"
        onClick={() =>
          router.push(user ? "/api/auth/logout" : "/api/auth/login")
        }
      >
        {user ? "Logout" : "Login"}
      </Button>
    </header>
  );
};

export default Header;
