import {createContext, useReducer} from "react";

const initialValues = {
	admin:false,
	setAdmin:() => {},
	openVerified:false,
	setOpenVerified:() => {},
	verified:{
		id:'12345',
		email:"p@p.com",
		customData:['hello', '0123'],
		favs:['paul','knoger'],
		purchased:['0123','7865']
	},
	setVerified:() => {},
	items:[], 
	setItems:() => {},
	cart:[], 
	setCart:() => {},
	openCart:false, 
	setOpenCart:() => {},
	cartHeight:0, 
	setCartHeight:() => {},
	isItemInCart:[], 
	setIsItemInCart:() => {},
	sideNavOpen:false, 
	setSideNavOpen:() => {},
	purchHist:false, 
	setPurchHist:() => {},
	apiEvent:{
		name:'',
		loading:false,
		text:''
	}, 
	setApiEvent:() => {},
	dataList:[], 
	setDataList:() => {},
	btnMin:false, 
	setBtnMin:() => {},
	disableAdminBtn:false, 
	setDisableAdminBtn:() => {},
	openSignIn:false, 
	setOpenSignIn:() => {},
	isSignIn:false, 
	setIsSignIn:() => {},
	openOverlayA:false, 
	setOpenOverlayA:() => {},
	favItems:[{}], 
	setFavItems:() => {},
	favItemIndx:{ 
		active: false, 
		indx: 0 
	}, 
	setFavItemIndx:() => {},
	fromHome:false, 
	setFromHome:() => {}
};


export const AppContext = createContext(initialValues)


function reducer(state, action) {
    switch (action.type) {
	case "setAdmin": 
		return {...state, admin:!state.admin}
	case "setOpenVerified": 
		return {...state, openVerified:!state.openVerified}
	case "setVerified": 
		return {...state, verified:action.payload}
	case "setItems": 
		return {...state, items:action.payload}
	case "setCart": 
		return {...state, cart:action.payload}
	case "setOpenCart": 
		return {...state, openCart:!state.openCart}
	case "setCartHeight": 
		return {...state, cartHeight:action.payload}
	case "setIsItemInCart": 
		return {...state, isItemInCart:action.payload}
	case "setSideNavOpen": 
		return {...state, setSideNavOpen:!state.sideNavOpen}
	case "setPurchHist": 
		return {...state, purchHist:!state.purchHist}
	case "setApiEvent": 
		return {...state, apiEvent:action.payload}
	case "setDataList": 
		return {...state, datalist:action.payload}
	case "setBtnMin": 
		return {...state, btnMin:!state.btnMin}
	case "setDisableAdminBtn": 
		return {...state, disableAdminBtn:!state.disableAdminBtn}
	case "setOpenSignIn": 
		return {...state, openSignIn:!state.openSignIn}
	case "setIsSignIn": 
		return {...state, isSignIn:!state.isSignIn}
	case "setOpenOverlayA": 
		return {...state, openOverlayA:!state.openOverlayA}
	case "setFavItems": 
		return {...state, favItems:action.payload}
	case "setFavItemIndx": 
		return {...state, favItemIndx:action.payload}
	case "setFromHome": 
		return {...state, fromHome:!state.fromHome}
	default:
		return state
    }
}

export const AppProvider= ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialValues)

    return <AppContext.Provider
            value={{
				admin:state.admin,
				setAdmin:() => dispatch({type: "setAdmin"}),
				openVerified:state.openVerified,
				setOpenVerified:() => dispatch({type: "setOpenVerified"}),
				verified:state.verified,
				setVerified:(obj) => dispatch({type: "setVerified", payload:obj}),
				items:state.items, 
				setItems:(items) => dispatch({type: "setItems", payload:items}),
				cart:state.cart, 
				setCart:(arr) => dispatch({type: "setCart", payload:arr}),
				openCart:state.openCart, 
				setOpenCart:() => dispatch({type: "setOpenCart"}),
				cartHeight:state.cartHeight, 
				setCartHeight:(num) => dispatch({type: "setCartHeight", payload:num}),
				isItemInCart:state.isItemInCart, 
				setIsItemInCart:() => dispatch({type: "setIsItemInCart"}),
				sideNavOpen:state.sideNavOpen, 
				setSideNavOpen:() => dispatch({type: "setSideNavOpen"}),
				purchHist:state.purchHist, 
				setPurchHist:() => dispatch({type: "setPurchHist"}),
				apiEvent:state.apiEvent, 
				setApiEvent:(obj) => dispatch({type: "setApiEvent", payload:obj}),
				dataList:state.dataList, 
				setDataList:(arr) => dispatch({type: "setDataList", payload:arr}),
				btnMin:state.btnMin, 
				setBtnMin:() => dispatch({type: "setBtnMin"}),
				disableAdminBtn:state.disableAdminBtn, 
				setDisableAdminBtn:() => dispatch({type: "setDisableAdminBtn"}),
				openSignIn:state.openSignIn, 
				setOpenSignIn:() => dispatch({type: "setOpenSignIn"}),
				isSignIn:state.isSignIn, 
				setIsSignIn:() => dispatch({type: "setIsSignIn"}),
				openOverlayA:state.openOverlayA, 
				setOpenOverlayA:() => dispatch({type: "setOpenOverlayA"}),
				favItems:state.favItems, 
				setFavItems:(arr) => dispatch({type: "setFavItems", payload:arr}),
				favItemIndx:state.favItemIndx, 
				setFavItemIndx:(obj) => dispatch({type: "setFavItemIndx", payload:obj}),
				fromHome:state.fromHome, 
				setFromHome:() => dispatch({type: "setFromHome"})
            }}>
        {children}
        </AppContext.Provider>
}
