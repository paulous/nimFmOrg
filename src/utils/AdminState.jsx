import {createContext, useReducer, useEffect} from "react"
import { useAuth } from "../contexts/AuthContext"; // Import the custom hook

const initialValues = {
	admin:{status:false, user:{}, program:false, show:false, sponsors:false, shop:false, docs:false, about:false},
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

export const AdminProvider= ({ children }) => {
	const { user, loading } = useAuth();

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
