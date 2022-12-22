import {createContext, useReducer} from "react"

const initialValues = {
	admin:{},
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

    const [state, dispatch] = useReducer(reducer, initialValues)

    return <AdminContext.Provider
            value={{
				admin:state.admin,
				setAdmin:(obj) => dispatch({type: "setAdmin", payload:obj})
            }}>
        {children}
        </AdminContext.Provider>
}
