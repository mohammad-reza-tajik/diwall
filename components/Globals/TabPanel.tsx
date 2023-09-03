import React from "react";

interface Props {
    children?: React.ReactNode;
    index: number;
    tab: number;
}

const TabPanel: React.FC<Props> = (props) => {
    const {children, tab, index} = props;

    return (
        <>
            { tab === index && (children) }
        </>
    );
}

export default TabPanel