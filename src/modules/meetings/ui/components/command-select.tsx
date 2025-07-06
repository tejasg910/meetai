import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { ReactNode, useState } from "react";



import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command";

interface Props {
    options: Array<{ value: string; id: string; children?: ReactNode }>;
    onSelect: (value: string) => void;
    onSearch?: (search: string) => void;
    value?: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
}



export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an option",
    isSearchable,
    className,
}: Props) => {

    const [open, setOpen] = useState(false);
    const selectedOption = options.find((option) => option.value === value);


    const handleOpenChange = (value: boolean) => {
        onSearch?.("")
        setOpen(value);

    }
    return (

        <>

            <Button onClick={() => setOpen(true)} type="button" variant="outline"
                className={cn("h-9 flex justify-between font-normal px-2",
                    !selectedOption && "text-muted-foreground",
                    className)}>
                <div className="flex items-center gap-x-2">
                    {selectedOption?.children ?? placeholder}
                    <ChevronsUpDownIcon className="size-4" />
                </div>
            </Button>

            <CommandResponsiveDialog open={open} onOpenChange={handleOpenChange} shouldFilter={!onSearch}>
                <CommandInput
                    placeholder={"Search..."}
                    onValueChange={onSearch}

                />
                <CommandList>
                    {isSearchable && <CommandEmpty><span className="text-muted-foreground">No options found</span></CommandEmpty>}


                    {options.map((option) => (
                        <CommandItem
                            key={option.id}
                            value={option.value}
                            onSelect={() => {
                                onSelect(option.value);
                                setOpen(false);
                            }}
                        >
                            {option.children}
                        </CommandItem>
                    ))}
                </CommandList>
                <Button
                    variant="outline"
                    className={cn("w-full justify-between", className)}
                    onClick={() => setOpen(!open)}
                >
                    {selectedOption ? selectedOption.value : placeholder}
                    <ChevronsUpDownIcon className="size-4" />
                </Button>
            </CommandResponsiveDialog>
        </>
    );

}