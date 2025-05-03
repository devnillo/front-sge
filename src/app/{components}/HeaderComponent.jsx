'use client'
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
export default function HeaderComponent({ menuItems = [], homeUri }) {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    if(!isOpen) {
      document.body.classList.add('overflow-hidden'); 
    }
    else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen])
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
return (
    <header className={`z-10 bg-shape min-h-screen min-w-60 p-4 flex-col items-center text-gray`}>
        <h2 className="text-2xl">SEGEM</h2>
        <nav className="w-full mt-10">
            <Accordion type="single" collapsible className="w-full">
                <Link href={homeUri? homeUri : '/'} className={'text-left font-medium py-2 hover:text-primary-blue text-xl'}>Home</Link>
                {menuItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium py-2 hover:text-primary-blue text-xl">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col pl-4">
                            <ul className="space-y-1">
                                {item.links.map((link, i) => (
                                    <li key={i}>
                                        <Link href={link.href} className="text-lg text-gray hover:text-primary-blue">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </nav>
  </header>
)
}