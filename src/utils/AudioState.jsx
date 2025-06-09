import {createContext, useReducer, useRef, useEffect} from "react";

const initialValues = {
	setPlayerUrl:() => {},
	playerUrl:{},
	setPlayerPause:() => {},
	playerPause:{pauseplay:false, btn:false}
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
	let audioPaused = useRef(false)

	let togglePlay = (e) => {
		e && e.preventDefault()

		if(!state.playerPause.pauseplay){ 
			//if(!audioStream.current) audioStream.current.src = 'https://uk5.internet-radio.com/proxy/nimfm?mp=/stream'
			dispatch({type: "setPlayerPause", payload:{pauseplay:true, btn:true, load:true}})
			audioPaused.current && audioStream.current.load()// first play will be fast
			audioStream.current
			.play()
			.then(() => dispatch({type: "setPlayerPause", payload:{pauseplay:true, btn:true, load:false}}))
			.catch((e) => console.log('errrrr', e))

		}
		else{
			audioStream.current.pause()
			dispatch({type: "setPlayerPause", payload:{pauseplay:false, btn:false, load:false}})
			audioPaused.current = true
		} 
	}

	useEffect(() => {

		audioStream.current.src = 'https://uk5.internet-radio.com/proxy/nimfm?mp=/stream'

		let stalled = (e) => {
			
			if(!audioStream.current.paused){
				dispatch({type: "setPlayerPause", payload:{pauseplay:true, btn:true, load:true}})
				audioStream.current.load()
				audioStream.current
				.play()
				.then(() => state.setPlayerPause({pauseplay:true, btn:true, load:false}))
				.catch((e) => console.log('errrrr', e))
			}
		}

		audioStream.current.addEventListener('stalled', stalled)
		return () => audioStream.current.removeEventListener('stalled', stalled)

	}, [])
	
    return <AudioContext.Provider
            value={{
				togglePlay,
				audioStream:audioStream.current,
				playerUrl:state.playerUrl,
				setPlayerUrl:(url) => dispatch({type: "setPlayerUrl", payload:url}),
				playerPause:state.playerPause,
				setPlayerPause:(obj) => dispatch({type: "setPlayerPause", payload:obj})
            }}>
        {children}
        </AudioContext.Provider>
}
