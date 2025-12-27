import jwt from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";

export const requireAuth = async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const token = req.cookies.dclm_admin_token;

    if (!token) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            email: string;
        };

        return {
            props: {
                user: decoded,
            },
        };
    } catch (error: unknown) {
        console.error("Auth verification error:", error);
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }
};