import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    tab: number;
}
const TabPanel = (props: TabPanelProps)  => {
    const { children, tab, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={tab !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {tab === index && (
                <>
                    {children}

                </>
            )}
        </div>
    );
}

export default TabPanel