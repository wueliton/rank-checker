import Head from "next/head";
import { Dashboard } from "../components/Dashboard";
export default function Home() {
  return (
    <>
      <Head>
        <title>RankChecker</title>
      </Head>
      <Dashboard />
    </>
  );
}
