import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {/* <Image alt="logo donilab" src={"/assets/logodonilab.png"} width={150} height={150}/> */}
      <h1 className={cn("text-3xl font-semibold", font.className)}>🔐 Dive Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};