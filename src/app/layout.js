import { Geist, Poppins } from "next/font/google";
import "./globals.css";
import dotenv from "dotenv";

import ReactQuery from "./ReactQuery";

dotenv.config();
const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "SEGEM",
    description: "Gerenciamento escolar municipal",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br">

        <body suppressHydrationWarning
            className={`${poppins.className} antialiased`}
        >
        <ReactQuery>
            {children}
        </ReactQuery>
        </body>
        </html>
    );
}
