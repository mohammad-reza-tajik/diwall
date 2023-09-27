import React from "react";

interface Props {
    children?: React.ReactNode;
    index: number;
    tab: number;
}

const TabPanel: React.FC<Props> = ({children, tab, index}) => {

    return (
        <>
            { tab === index && (children) }
        </>
    );
}

export default TabPanel