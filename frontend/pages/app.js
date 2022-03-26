import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useState } from "react";
import { Text, Label, Textarea, Button } from "theme-ui";

const App = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  if (!localStorage.getItem("role")) {
    router.push("/select");
  }

  const isMedic = localStorage.getItem("role") === "medic" ? true : false;

  const handleSubmit = () => {
    fetch("/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
      }),
    });
  };

  return (
    <section>
      <span className="text-center">
        <Text variant="title">
          <h1>{isMedic ? "Reply to request" : "Publish your request"}</h1>
        </Text>
      </span>
      {!isMedic && (
        <section className="bg-gray-300 p-4 rounded-lg flex flex-col items-center justify-center">
          <Label>
            <span className="mb-2">Your request:</span>
            <Textarea
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a few sentences."
            />
          </Label>
          <span className="m-4">
            <Button onClick={() => handleSubmit()} variant="lg">
              Submit
            </Button>
          </span>
        </section>
      )}
    </section>
  );
};

export default withPageAuthRequired(App);
