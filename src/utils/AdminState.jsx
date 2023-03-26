import {createContext, useReducer, useEffect} from "react"

const initialValues = {
	admin:{status:false, user:{}, program:false, show:false, sponsors:false, shop:false, docs:false},
	setAdmin:() => {}
}

export const AdminContext = createContext(initialValues)


function reducer(state, action) {
    switch (action.type) {
	case "setAdmin": 
		return {...state, admin:{...state.admin, ...action.payload}}
	default:
		return state
    }
}

export const AdminProvider= ({ user, children }) => {

    const [state, dispatch] = useReducer(reducer, initialValues)

	useEffect(() => {
	  	dispatch({type: "setAdmin", payload:{user}})
	}, [])
	
    return <AdminContext.Provider
            value={{
				admin:state.admin,
				setAdmin:(obj) => dispatch({type: "setAdmin", payload:obj})
            }}>
        {children}
        </AdminContext.Provider>
}
