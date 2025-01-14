"use client"

import { Button } from 'src/components/ui/button';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList
} from "src/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "src/components/ui/popover";
import { cn } from "src/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from "react";

const languages = [
    {
        value: "tr",
        label: "Türkçe",
    },
    {
        value: "en",
        label: "English",
    },
]

export function LocaleSelector() {


    const router = useRouter();
    const locale = useLocale();

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(locale)


    const setPreferredLanguage = (lang: string) => {
        document.cookie = `preferred-lang=${lang}; path=/; max-age=31536000`; // Expires in 1 year
        router.refresh(); // Refresh to apply the new locale
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[75px] justify-between"
                >
                    <Image src={locale === "tr" ? '/flag-tr.svg' : '/flag-en.svg'} height={48 / 1.2} width={32 / 1.2} alt="locale-flag" />

                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[100px] p-0 ">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {languages.map((lang) => (
                                <CommandItem
                                    key={lang.value}
                                    value={lang.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        setPreferredLanguage(currentValue)
                                    }}
                                >
                                    {lang.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === lang.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
