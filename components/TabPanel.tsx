import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    tab: number;
}
const TabPanel : React.FC = (props: TabPanelProps)  => {
    const { children, tab, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={tab !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}

        >
            {
                tab === index && (
                <>
                    {children}
                </>
            )
            }
        </div>
    );
}

export default TabPanel