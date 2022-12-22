import {createContext, useReducer, useRef} from "react";

const initialValues = {
	setPlayerUrl:() => {},
	playerUrl:{},
	setPlayerPause:() => {},
	playerPause:{}
}

export const AudioContext = createContext(initialValues)


function reducer(state, action) {
    switch (action.type) {
	case "setPlayerUrl": 
		return {...state, playerUrl:action.payload}
	case "setPlayerPause": 
		return {...state, playerPause:action.payload}
	default:
		return state
    }
}

export const AudioProvider= ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialValues)
	let audioStream = useRef(new Audio())

    return <AudioContext.Provider
            value={{
				audioStream:audioStream.current,
				playerUrl:state.playerUrl,
				setPlayerUrl:(url) => dispatch({type: "setPlayerUrl", payload:url}),
				playerPause:state.playerPause,
				setPlayerPause:(obj) => dispatch({type: "setPlayerPause", payload:obj})
            }}>
        {children}
        </AudioContext.Provider>
}
