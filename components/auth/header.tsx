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
      <Image alt="logo donilab" src={"https://dive.paris/wp-content/uploads/2024/10/DIVE_2025_SHAPE_ALONE.webp"} width={100} height={100}/>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};