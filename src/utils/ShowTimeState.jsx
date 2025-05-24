import {createContext, useReducer} from "react";
import { worldTime } from '../utils/worldTime'

const initialValues = (day) => ({
	selectedDay:day,
	setSelectedDay:() => {},
	currentShow:{title:'nimFm', started:false},
    setCurrentShow: () => {}
})

export const ShowTimeContext = createContext(initialValues)

function reducer(state, action) {
    switch (action.type) {
	case "setSelectedDay": 
		return {...state, selectedDay:action.payload}
	case "setCurrentShow": 
		return {...state, currentShow:action.payload}
	default:
		return state
    }
}

export const ShowTimeProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialValues(worldTime().getDay))
		
    return <ShowTimeContext.Provider
            value={{
				selectedDay:state.selectedDay,
				setSelectedDay:(num) => dispatch({type: "setSelectedDay", payload:num}),
				currentShow:state.currentShow,
				setCurrentShow:(num) => dispatch({type: "setCurrentShow", payload:num})
            }}>
        {children}
        </ShowTimeContext.Provider>
}
