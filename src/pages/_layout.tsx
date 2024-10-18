import "../styles.css";

import type { ReactNode } from "react";

import { Header } from "../components/header";
import { Footer } from "../components/footer";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <html>
      <head></head>
      <body className="bg-burrito-200">
        <div>
          <meta property="description" content={data.description} />
          <main className="">{children}</main>
        </div>
      </body>
    </html>
  );
}

const getData = async () => {
  const data = {
    description: "fill yourself with delicious burritos",
    icon: "/images/favicon.png",
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
