import {Child, Refrigerator, Bed, Desk, OfficeBuilding, Sofa} from "@/components/shared/Icons";

const places = [
    {
        href: "/products?category=اتاق-کودک",
        icon: <Child className={"size-10"} />,
        text: "اتاق کودک"
    } ,
    {
        href: "/products?category=اداره",
        icon: <OfficeBuilding className={"size-10"}/>,
        text: "اداره"
    } ,
    {
        href: "/products?category=آشپزخانه",
        icon: <Refrigerator className={"size-10"} />,
        text: "آشپزخانه"
    },
    {
        href: "/products?category=اتاق-پذیرایی",
        icon: <Bed className={"size-10"}/>,
        text: "اتاق خواب"
    },
    {
        href: "/products?category=اتاق-پذیرایی",
        icon:  <Desk className={"size-10"} />,
        text: "اتاق کار"
    },
    {
        href: "/products?category=اتاق-پذیرایی",
        icon: <Sofa className={"size-10"}/>,
        text: "حال و پذیرایی"
    }
];
export default places;