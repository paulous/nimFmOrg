import {createContext, useReducer} from "react"

const initialValues = {
	programHostList:[],
	setProgramHostList: () => {},
	currentShow:{title:'test title', started:false},
    setCurrentShow: () => {}
}

export const HomeContext = createContext(initialValues)

function reducer(state, action) {
    switch (action.type) {
	case "setProgramHostList":

		let justTitles = action.payload
		.sort((a,b) => (a.indx - b.indx))
		.map(day => day.hosts.map(host => {host.day = day.day; return host}))
		.reduce((a, b) => a.concat(b), [])

		let filterDups = justTitles.filter((v,i,a) => a.findIndex(t => (t.title === v.title)) === i)

		return {...state, programHostList:filterDups}

	case "setCurrentShow": 
		return {...state, currentShow:action.payload}
	default:
		return state
    }
}

export const HomeProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialValues)

    return <HomeContext.Provider
            value={{
				programHostList:state.programHostList,
				setProgramHostList:(arr) => dispatch({type: "setProgramHostList", payload:arr}),
				currentShow:state.currentShow,
				setCurrentShow:(obj) => dispatch({type: "setCurrentShow", payload:obj})
            }}>
        {children}
        </HomeContext.Provider>
}
