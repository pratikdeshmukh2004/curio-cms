import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import {
  GoogleOAuthProvider,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between lg:p-24 p-10 ${inter.className}`}
    >
      <Head>
        <style>
          {`

  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }


body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
`}
        </style>
        <title>CurIO</title>
      </Head>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p></p>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-end bg-gradient-to-t dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none ml-auto justify-end flex place-items-end gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <h4 className="text-white font-extrabold text-3xl">dVerse</h4>
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full  before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic  after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700/10 after:from-sky-900 after:via-[#0141ff]/40 before:lg:h-[360px]">
        <h1 className="text-5xl font-extrabold animate-pulse jersey-15-regular">
          CurIO CMS
        </h1>
      </div>

      <div className="mb-52 flex lg:flex-row flex-col justify-center gap-5 text-center w-full lg:max-w-xl lg:w-full lg:mb-0  lg:text-left">
        {user ? (
          <Link
            href={"/diagrams"}
            className="border-2 border-gray-500 text-gray-300 p-5 rounded-xl font-bold hover:border-sky-700 hover:text-sky-700 cursor-pointer"
          >
            View Diagrams
            <FontAwesomeIcon className="ml-2 text-xs" icon={faDiagramProject} />
          </Link>
        ) : (
          <GoogleOAuthProvider clientId="165709508753-3fmsce8o2knrfccucibes57h9c72vr8g.apps.googleusercontent.com">
            <GoogleLogin />
          </GoogleOAuthProvider>
        )}

        {/* <Link
          href={"/pointers"}
          className="border-2 border-gray-500 text-gray-300 p-5 rounded-xl font-bold hover:border-sky-700 hover:text-sky-700 cursor-pointer"
        >
          View Pointers
          <FontAwesomeIcon className="ml-2" icon={faHandPointer} />
        </Link> */}
        {/* <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a> */}
      </div>
    </main>
  );
}

const GoogleLogin = () => {
  const handleSuccess = async (response) => {
    const { data } = await axios.post(
      "https://dev-api.fikalearn.com/api/auth/google",
      {},
      {
        headers: { Authorization: `Bearer ${response.access_token}` },
      }
    );
    const user = data.data;
    localStorage.setItem("token", user.token);
    localStorage.setItem("user_id", user.user._id);
    window.location.href = "/diagrams"; // Redirect to diagrams page
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
  });

  useGoogleOneTapLogin({
    onSuccess: handleSuccess,
    onError: () => {
      console.log("Login Failed");
    },
  });
  return (
    <button
      className="border flex items-center gap-2 border-gray-500 text-gray-300 p-2 px-5 rounded-full font-bold hover:border-sky-700 hover:text-sky-700 cursor-pointer"
      onClick={login}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="35"
        height="35"
        viewBox="0 0 48 48"
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        ></path>
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        ></path>
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        ></path>
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        ></path>
      </svg>
      Google Login
    </button>
  );
};
