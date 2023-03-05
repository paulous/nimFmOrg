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

	let togglePlay = (e) => {
		e && e.preventDefault()

		if(!state.playerPause.pauseplay){ 
			audioStream.current
			.play()
			.then(() => dispatch({type: "setPlayerPause", payload:{pauseplay:true, btn:true}}))
			.catch((e) => console.log('errrrr', e))

		}
		else{
			audioStream.current.pause()
			audioStream.current.load()
			dispatch({type: "setPlayerPause", payload:{pauseplay:false, btn:false}})
		} 
	}

	useEffect(() => {
		console.log('useeffect audiostate')

		audioStream.current.src = 'https://uk5.internet-radio.com/proxy/nimfm?mp=/stream'

		audioStream.current.addEventListener('stalled', (e) => {
			console.log('useeffect stalled')

			audioStream.current.load()
			//audioStream.current.src = 'https://uk5.internet-radio.com/proxy/nimfm?mp=/stream'
			audioStream.current
			.play()
			.then(() => state.setPlayerPause({pauseplay:true, btn:true}))
			.catch((e) => console.log('errrrr', e))
		})


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
