import {createContext, useReducer} from "react";
import { worldTime } from '../utils/worldTime'

const initialValues = () => ({
	programColl: [],
	setProgramColl:() => {},
	selectedDay:worldTime().getDay,
	setSelectedDay:() => {},
	currentShow:{title:'nimbin 420', started:false},
    setCurrentShow: () => {},
	updateTimeDate:worldTime(),
	setUpdateTimeDate: () => {}
})

export const ShowTimeContext = createContext(initialValues)


function reducer(state, action) {
    switch (action.type) {
		case "setProgramColl": 
		return {...state, programColl:action.payload}
		case "setSelectedDay": 
		return {...state, selectedDay:action.payload}
		case "setCurrentShow": 
		return {...state, currentShow:action.payload}
		case "setUpdateTimeDate": 
			return {...state, updateTimeDate:action.payload}
	default:
		return state
    }
}


export const ShowTimeProvider = ({ 
	children 
	}) => {

	const [state, dispatch] = useReducer(reducer, initialValues())
		
    return <ShowTimeContext.Provider
            value={{
				programColl:state.programColl,
				setProgramColl:(arr) => dispatch({type: "setProgramColl", payload:arr}),
				selectedDay:state.selectedDay,
				setSelectedDay:(num) => dispatch({type: "setSelectedDay", payload:num}),
				currentShow:state.currentShow,
				setCurrentShow:(num) => dispatch({type: "setCurrentShow", payload:num}),
				updateTimeDate:state.updateTimeDate,
				setUpdateTimeDate:(obj) => dispatch({type: "setUpdateTimeDate", payload:obj})
            }}>
        {children}
        </ShowTimeContext.Provider>
}
