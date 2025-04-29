'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import { X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export default function HeaderComponent({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    // console.log(links);
    
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
    <>
      <header className={`fixed z-10 top-0 ${isOpen? 'right-[100%]' : 'left-0'} bg-primary h-screen min-w-72 p-4 flex-col items-center text-white`}>
        <div className="flex justify-between items-center">
          <Button variant={'blue'} onClick={toggleMenu} className={`absolute ${isOpen? 'left-[102%]' : 'left-0 hidden'}`}>
            <FaChevronRight size={20}/>
          </Button>
          <h2 className="text-2xl text-white">SEGEM</h2>
          <Button onClick={toggleMenu} className={` bg-primary border-2`}>
            <X />
          </Button>
        </div>
        <nav className="w-full">
          <ul className='w-full flex flex-col gap-4'>
            {children}
          </ul>
        </nav>
      </header>
    </>
  )
}