interface Props {
    children?: React.ReactNode;
    index: number;
    tab: number;
}

function TabPanel ({children, tab, index} : Props) {

    return (
        <>
            { tab === index && (children) }
        </>
    );
}

export default TabPanel