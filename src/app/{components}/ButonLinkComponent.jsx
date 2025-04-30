import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ButtonLinkComponent ({ href, children, variant, className }){
    return(
        <Button variant={variant} className='max-sm:px-2 ml-2' asChild>
            <Link href={href}>{children}</Link>
        </Button>
    )
}
