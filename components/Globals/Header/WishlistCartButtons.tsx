import Link from "next/link";
import {HeartOutlined, ShoppingBag} from "@/components/Globals/Icons";
import {UserType} from "@/db/userModel";

function WishlistCartButtons(user:UserType) {
    return (
        <div className={"flex items-center gap-2"}>
            <div className="tooltip tooltip-bottom" data-tip="کالاهای مورد علاقه شما">
                <div className="indicator">
                            <span className="indicator-item indicator-start badge badge-primary size-7 rounded-full">
                                {user?.wishlist.length || 0}
                            </span>
                    <Link className={"btn btn-square btn-ghost border border-primary rounded-full"}
                          href={user.username ? `/accounts/${user?._id}?tab=1` : "/auth"}
                          aria-label="go to wishlist">
                        <HeartOutlined className={"fill-primary size-7"}/>
                    </Link>
                </div>
            </div>
            <div className="tooltip tooltip-bottom" data-tip="سبد خرید شما">
                <div className="indicator">
                            <span className="indicator-item indicator-start badge badge-primary size-7 rounded-full">
                                {user?.cart.length || 0}
                            </span>
                    <Link className={"btn btn-square btn-ghost border border-primary rounded-full"}
                          href={user.username ? `/accounts/${user?._id}?tab=2` : "/auth"}
                          aria-label="go to cart">
                        <ShoppingBag className={"fill-primary size-7"}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WishlistCartButtons;