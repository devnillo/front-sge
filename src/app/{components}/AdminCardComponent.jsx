// components/AdminCard.tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";


export const AdminCard = ({ href, title }) => (
  <Link href={href} className="col-span-6 md:col-span-3 group">
    <Card className="flex flex-col items-center w-full bg-white group-hover:bg-shape border-0 py-5">
      <CardContent>
        <span className="font-medium text-xl">{title}</span>
      </CardContent>
    </Card>
  </Link>
);
