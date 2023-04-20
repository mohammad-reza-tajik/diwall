import {userActions} from "./userSlice";
import {useAppDispatch,useAppSelector} from "../hooks/useStore";
import store from "./store"

/*
* we create an index file so to import everything related to redux
* from a single place.
* this makes our life as a developer much easier .
* now in every component that we need to interact with our store we
* can import everything from here.
* */


export { store, userActions , useAppDispatch , useAppSelector }