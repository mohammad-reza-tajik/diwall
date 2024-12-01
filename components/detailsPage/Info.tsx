"use client"
import {useState} from "react";
import ReviewsForm from "@/components/detailsPage/ReviewsForm";
import SwiperProducts from "@/components/shared/SwiperProducts";
import {Create, Package, Review} from "@/components/shared/Icons";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Reviews from "@/components/detailsPage/Reviews";
import type {Product} from "@/types/product";


interface Props {
    slug: string;
    relatedProducts: Product[];
}

function Info({slug, relatedProducts}: Props) {

    const [addReview, setAddReview] = useState(false);

    const tabs = [
        {
            label: "محصولات مشابه",
            icon: <Package className={"size-4"}/>,
            content: <SwiperProducts products={relatedProducts}/>
        },
        {
            label: "دیدگاه ها",
            icon: <Review className={"size-4"}/>,
            content: <Reviews addReview={addReview} slug={slug}/>
        },
        {
            label: "درج دیدگاه",
            icon: <Create className={"size-4"}/>,
            content: <ReviewsForm setAddReview={setAddReview} slug={slug}/>
        },
    ];

    return (
        <Tabs defaultValue={tabs[0].label} className={"my-12"}>
            <TabsList className={"grid w-full grid-cols-3 lg:grid-cols-7 h-16 lg:h-20 md:px-3"}>
                {
                    tabs.map((tab) => (
                        <TabsTrigger key={tab.label}
                                     className={"text-foreground fill-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:fill-primary-foreground md:py-4 text-xs md:text-sm"}
                                     value={tab.label}
                        >
                            <div className={"flex flex-col md:flex-row items-center gap-2"}>
                                {tab.icon}
                                {tab.label}
                            </div>
                        </TabsTrigger>
                    ))
                }
            </TabsList>
            {
                tabs.map((tab) => (
                    <TabsContent key={tab.label} value={tab.label} className={"h-full"}>
                        {tab.content}
                    </TabsContent>
                ))
            }
        </Tabs>
    )
}

export default Info