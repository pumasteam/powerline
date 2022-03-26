import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useState } from "react";
import { Text, Label, Textarea, Button, Card, Input } from "theme-ui";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#__next");

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const App = () => {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const router = useRouter();

  if (!localStorage.getItem("role")) {
    router.push("/select");
  }

  const { data } = useSWR("/api/all", fetcher);

  const isMedic = localStorage.getItem("role") === "medic" ? true : false;

  const handleSubmit = async () => {
    toast.promise(
      fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      }),
      {
        loading: "Loading...",
        success: "Success!",
        error: "Error!",
      }
    );

    const helpline = await fetch("/api/helpline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: text,
      }),
    });

    const helplineData = await helpline.json();

    if (helplineData.helpline.tel) {
      setName(helplineData.helpline.hotline);
      setTel(helplineData.helpline.phone);

      setIsOpen(true);
    }
  };

  const handleAnswer = (key) => {
    toast.promise(
      fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text2,
          request: key,
        }),
      }),
      {
        loading: "Loading...",
        success: "Success!",
        error: "Error!",
      }
    );
  };

  if (!data) {
    return <div>Loading...</div>;
  }

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
      {isMedic && (
        <section>
          {data.map((i, k) => (
            <span className="m-2">
              <Card variant="sunken" key={k}>
                <Text variant="lead">{i.message}</Text>
                <br />
                <br />
                {i.comments.length < 1 && (
                  <>
                    <Input
                      onChange={(e) => setText2(e.target.value)}
                      placeholder="Write a few sentences."
                    />
                    <br />
                    <Button onClick={() => handleAnswer(i.key)}>Submit</Button>
                  </>
                )}
                {i.comments.length > 0 && (
                  <>
                    <Text variant="subheadline">Answer: </Text>
                    <br />
                    <Text variant="caption">{i.comments[0].message}</Text>
                    <br />
                  </>
                )}
              </Card>
            </span>
          ))}
        </section>
      )}
      <Toaster />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <section className="flex flex-col items-center justify-center">
          <Text variant="title">Please call a helpline</Text>
          <Text variant="subtitle">{name}</Text>
          <span className="m-2">
            <Button variant="lg">
              <a href={`tel:${tel}`}>Call now!</a>
            </Button>
          </span>
          <span className="m-2">
            <Button onClick={() => closeModal()}>Close</Button>
          </span>
        </section>
      </Modal>
    </section>
  );
};

export default withPageAuthRequired(App);
