import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";
import Overview from "@/components/dashboard/Overview";

export default function Admin() {
  return <Overview />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await requireAuth(context);
};
