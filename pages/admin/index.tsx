import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";

export default function Admin() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authResult = await requireAuth(context);

  if ("redirect" in authResult) {
    return authResult;
  }

  return {
    redirect: {
      destination: "/admin/overview",
      permanent: false,
    },
  };
};
