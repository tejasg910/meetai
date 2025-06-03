import { createAvatar } from "@dicebear/core"

import { botttsNeutral, initials } from "@dicebear/collection"

import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface GenerateAvatarProps {
    className?: string
    seed: string
    variant?: "initials" | "botttsNeutral"
}


export const GenerateAvatar = ({
    className,
    seed,
    variant = "initials"
}: GenerateAvatarProps) => {

    let avatar

    if (variant === "initials") {
        avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });
    } else {
        avatar = createAvatar(botttsNeutral, { seed });
    }

    return (
        <Avatar className={cn( className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Generated Avatar" />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
};
