import Link from "next/link";
import { Button, Text } from "theme-ui";

const Home = () => {
  return (
    <section className="flex flex-col">
      <Text variant="title">
        <h1 className="text-center mt-12">
          We help you find{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-500">
            help in seconds
          </span>
          .
        </h1>
      </Text>
      <Text variant="subtitle">
        <p className="text-center -mt-8">
          We connect you with doctors so you can receive professional help from
          your home anonymously.
        </p>
      </Text>
      <img
        src="/landing.svg"
        alt="Landing image"
        height={500}
        className="m-auto"
      />
      <br />
      <article className="flex items-center justify-center">
        <span className="m-2">
          <Button variant="ctaLg">
            <Link href="/app">
              <a>Start now</a>
            </Link>
          </Button>
        </span>
        <span className="m-2">
          <Button variant="outlineLg">
            <a
              href="https://devpost.com/software/powerline"
              target="_BLANK"
              rel="noreferrer"
            >
              Learn more
            </a>
          </Button>
        </span>
      </article>
    </section>
  );
};

export default Home;
