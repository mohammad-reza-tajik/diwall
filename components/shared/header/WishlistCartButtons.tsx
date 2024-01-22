import Link from "next/link";
import {HeartOutlined, ShoppingBag} from "@/components/shared/Icons";
import {Button} from "@/components/ui/button";
import {type User} from "@/types/user";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface Props {
    user ?: User
}

function WishlistCartButtons({user}:Props) {
    return (
        <div className={"flex items-center gap-2"}>
            <TooltipProvider delayDuration={400}>
                <Tooltip>
                    <TooltipTrigger>
                        <Button size={"icon"} variant={"outline"} asChild className={"relative size-12 border-primary"}>
                            <Link href={user ? `/accounts/${user._id}?tab=1` : "/auth"}
                                  aria-label={"لیست علاقمندی ها"}>
                                <HeartOutlined className={"fill-primary size-7"}/>
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent data-side={"top"} className={"bg-gray-800 text-primary-foreground"}>
                        <p>کالاهای مورد علاقه شما</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                            <Button size={"icon"} variant={"outline"} asChild className={"relative size-12 border-primary"}>
                                <Link href={user ? `/accounts/${user._id}?tab=2` : "/auth"}
                                      aria-label={"سبد خرید"}>
                                    <ShoppingBag className={"fill-primary size-7"}/>
                                </Link>
                            </Button>
                    </TooltipTrigger>
                    <TooltipContent data-side={"top"} className={"bg-gray-800 text-primary-foreground"}>
                        <p>سبد خرید شما</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default WishlistCartButtons;