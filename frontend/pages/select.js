import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { Card, Text } from "theme-ui";

const Select = () => {
  const router = useRouter();

  const handleSelect = (isMedic) => {
    fetch("/api/role", {
      method: "POST",
      body: JSON.stringify({
        isMedic,
      }),
    });

    localStorage.setItem("role", isMedic ? "medic" : "patient");

    router.push("/app");
  };

  return (
    <section className="flex flex-col items-center justify-center m-6">
      <Text variant="title">
        <span className="text-center m-2">Select your role</span>
      </Text>
      <article className="m-8 flex items-center justify-evenly">
        <span className="m-2 cursor-pointer">
          <Card variant="interactive" onClick={() => handleSelect(true)}>
            <Text variant="headline"> Medic </Text>
          </Card>
        </span>
        <span className="m-2 cursor-pointer">
          <Card variant="interactive" onClick={() => handleSelect(false)}>
            <Text variant="headline"> Patient </Text>
          </Card>
        </span>
      </article>
    </section>
  );
};

export default withPageAuthRequired(Select);
