"use client"
import { AlertCircleIcon } from "lucide-react";
import Image from "next/image";

interface Props {
    title: string;
    description: string;
    image?: string
}

export const EmptyState = ({ title, description, image = "/empty.svg" }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center">



            <Image src={image} width={240} height={240} alt="Logo" />

            <div className="flex flex-col gap-y-2 max-x-md mx-auto text-center ">

                <h6 className="text-lg font-medium" >{title}</h6>
                <p className="text-sm text-muted-foreground">{description}</p>

            </div>
        </div>
    );
}

