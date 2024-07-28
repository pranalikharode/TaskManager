import {createContext} from "react";

// createContext(): Creates a new context object. 
//Context provides a way to pass data through the component tree without having to pass props down manually 
//at every level.

const noteContext = createContext();

export default noteContext;