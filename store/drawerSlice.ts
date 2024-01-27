import {createSlice} from "@reduxjs/toolkit";

const initialState   = {
    searchDrawerOpen : false,
    menuDrawerOpen : false
}

const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers : {
        openSearchDrawer(state) {
            state.searchDrawerOpen = true
        },
        closeSearchDrawer(state) {
            state.searchDrawerOpen = false
        },
        openMenuDrawer(state) {
            state.menuDrawerOpen = true
        },
        closeMenuDrawer(state) {
            state.menuDrawerOpen = false
        },
    }
})

export const drawerActions = drawerSlice.actions;

export default drawerSlice