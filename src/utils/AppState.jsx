import {createContext, useReducer, useRef} from "react";

const initialValues = {
	setPlayerUrl:() => {},
	playerUrl:{},
	setPlayerPause:() => {},
	playerPause:{},
	currentShow:{title:'test title', started:false},
	setCurrentShow:() => {}
}

export const AppContext = createContext(initialValues)


function reducer(state, action) {
    switch (action.type) {
	case "setPlayerUrl": 
		return {...state, playerUrl:action.payload}
	case "setPlayerPause": 
		return {...state, playerPause:action.payload}
	case "setCurrentShow": 
		return {...state, currentShow:action.payload}
	default:
		return state
    }
}

export const AppProvider= ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialValues)
	let audioStream = useRef(new Audio())

    return <AppContext.Provider
            value={{
				audioStream:audioStream.current,
				playerUrl:state.playerUrl,
				setPlayerUrl:(url) => dispatch({type: "setPlayerUrl", payload:url}),
				playerPause:state.playerPause,
				setPlayerPause:(obj) => dispatch({type: "setPlayerPause", payload:obj}),
				currentShow:state.currentShow,
				setCurrentShow:(obj) => dispatch({type: "setCurrentShow", payload:obj})
            }}>
        {children}
        </AppContext.Provider>
}
