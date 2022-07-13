import {Divider, Grid, Typography,List,ListItem} from "@mui/material";
import Image from "next/image"

const styles = {
    listItem:{
        gap:10


    },
    list:{
        width:1,
        height:400,
        overflowY:"scroll"

    }
}

const SearchResults = (props) => {

    const {results} = props

    return (
        <List sx={styles.list}>
            {results.length !== 0 && results.map((item)=>{
                return(
                <ListItem button divider sx={styles.listItem} key={item._id}>
                    <Image src={item.image} width={90} height={90} alt={props.title} />
                    <Typography variant={"h4"} fontSize={18} color={"#666"}>
                        {item.title}
                    </Typography>
                </ListItem>
                )
            })}

       </List>
    )
}

export default SearchResults