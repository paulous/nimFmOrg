import { useState, useEffect } from "react";
import {
    useOutletContext,
    Form,
    useActionData,
    useNavigate
} from "react-router-dom";

//import media from '../media'
import styled from "styled-components";
import Checkbox from '../../components/buttons/Checkbox'
import BackButton from "../../components/buttons/BackButton";
import { basicAddDB } from "../../utils/actions";


const Main = styled.div`
    position: fixed;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    //justify-content:center;
    padding-top: clamp(50px, 3vw, 100px);
    background-image: radial-gradient(
            circle at top right,
            rgba(64, 9, 119, 0.694) 0%,
            rgba(64, 9, 119, 0.749) 48%,
            rgba(72, 7, 149, 0.47) 48%,
            rgba(72, 7, 149, 0.47) 53%,
            rgba(109, 5, 178, 0.45) 53%,
            rgba(109, 5, 178, 0.45) 56%,
            rgba(145, 2, 208, 0.48) 56%,
            rgba(145, 2, 208, 0.48) 69%,
            rgba(181, 0, 237, 0.44) 69%,
            rgba(181, 0, 237, 0.44) 100%
        ),
        linear-gradient(
            0deg,
            rgba(119, 8, 119, 0.504) 15%,
            rgba(53, 3, 53, 0.864) 95%
        );
    overflow-y: auto;

	h2{
		margin:60px 30px 0;
	}

    .back-btn {
        display: flex;
        width: 100%;

        a {
            position: fixed;
            top: 75px;
            left: 5vw;
            color: white;
            font-size: 1.5rem;
        }
    }

    h2 {
        margin: 60px 30px 0;
    }

    form {
        display: flex;
        flex-flow: column;
        align-items: flex-end;
        width: 100%;
        max-width: 1000px;
        margin: 30px 0;
        padding: 30px;

        input[type="submit"] {
            font-size: 1.3rem;
            padding: 15px;
            background: rgb(231, 239, 6);
            border: 0 none;
            cursor: pointer;
            border-radius: 5px;
            //color: white;
        }
        input,
        textarea[type="text"] {
            font-size: 1.3rem;
        }
        input,
        textarea,
        label {
            padding: 15px;
            margin: 15px;
            width: 96%;
        }
        label {
            font-size: 1.3rem;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 30px;

			.check-box{
				display:flex;
				flex-wrap:wrap;
				align-items:center;
				justify-content:space-evenly;

				span{
					flex-grow:1; 			
					display:flex;
					align-items:center;
					justify-content:space-evenly;
				}
			}
        }
        input:focus {
            background: rgb(255, 254, 219);
        }
    }

	.urls{
		display:flex;
		flex-flow:column;
		padding:15px;

		li{
			display:flex;
			justify-content:space-between;

			img{
				width:100px;
				aspect-ratio:1/1;
				object-fit:contain;
			}

			input{
				flex-grow: 1;
				border: none;
				background:rgba(0,0,0,0.2);
				color: white;
			}

			span{align-self: center; padding:0 15px; cursor:pointer;}
		}


		label{
			display:flex;
			flex-wrap:wrap;
			margin:15px 0;
			background:none;
			padding:0;

			span{
				padding: 15px 21px;
				border: 1px solid white;
				border-radius: 15px;
				font-size: 1.1rem;
				height: fit-content;
				align-self:center;
			}

			input{
				flex-grow: 1;
				border:revert;
				background:revert;
				color:revert;
				min-width: 10px;
    			width: fit-content;
			}
		}
	}
`;

export async function actions({ params, request }) {
    console.log(request, request.type);
    let formData = await request.formData()

	let data = {
		name:formData.get("name"), 
		description:formData.get("description"), 
		sku:'0000000', 
		unit_amount:{
			currency_code: "AUD",
			value: formData.get("amount")
		},
		
		quantity:formData.get("quantity"),
		stock:formData.get("stock"),
		images:formData.getAll("images"),
		status:{
			active: formData.get("active") ? true : false, // string or null for checkbox
			discount:{status:formData.get("discount") ? true : false},
			promotion:{status:formData.get("promotion") ? true : false}
		},
		tags:formData.get("tags")
	}

    //let result = {}//await addShow(params, addNewShow)

	let addedId = await basicAddDB('shop', data)
	
	return {addedId, data}
}

export default function AdminAddItem() {

    let { admin } = useOutletContext()

    let actionData = useActionData()
    let navigate = useNavigate()

	let [checked, setChecked] = useState({active:true, discount:false, promotion:false})
	let [UrL, setURL] = useState('')
	let [urlArrs, setUrlArrs] = useState({images:[], tags:[]})

	let addUrl = (urlarr) => (e) => {
		e.preventDefault()
		try{
			new URL(UrL)
			setUrlArrs(state => ({...state, [urlarr]:[...state[urlarr], UrL]}))
			setURL('')
			console.log(UrL)
		}catch{
			console.log('Not a url')
		}
	}
	let rmvUrl = (urlarr, indx) => e => {
		e.preventDefault()
		setUrlArrs(state => ({...state, [urlarr]:urlArrs[urlarr].filter((_,i) => i !== indx)}))
	}

    useEffect(() => {
        if (actionData?.addedId) {
            navigate(`/shop`)
        } else {
            console.log("nothing was updated")
        }
    }, [actionData]);

    return (
        <>
            {admin.status && (
                <Main>
					<h2>ADD NEW ITEM</h2>
					<Form method="post" action={"/shop/admin-add-item"}>
						<label> NAME:
							<input
							name="name"
							type="text"
							placeholder="Item name"
							autoFocus
							/>
						</label>
						<label> ADD IMAGES:
							<ul className='urls'>
								{ 											
									urlArrs.images.map((url,i) => 
										<li key ={`im${i}`}>
											<img src={url} />
											<input											
											name="images"
											type="url"
											placeholder={url}
											readOnly={true}
											value={url}
											/>
											<span onClick={rmvUrl('images',i)}>X</span>
										</li>
									)													
								}
								<label>
									<span onClick={addUrl('images')}>ADD URL</span>
									<input 
									type="url"
									placeholder={'Add an image url'}
									onChange={(e) => setURL(e.target.value)}
									value={UrL}
									/>
								</label>
							</ul>
						</label>
						<label> TAGS:
							<textarea
							name="tags"
							type="text"
							rows={2}
							placeholder="Add tag words: music, nimbin, ..."
							/>
						</label>
						<label> DESCRIPTION:
							<input
							name="description"
							type="text"
							placeholder="Short summery of item."
							/>
						</label>
						<label> AMOUNT:
							<input
							name="amount"
							type="number"
							placeholder="Price of item"
							/>
						</label>
						<label> QUANTITY:
							<input
							name="quantity"
							type="number"
							placeholder="Quantity available"
							/>
						</label>
						<label> STOCK:
							<input
							name="stock"
							type="number"
							placeholder="Stock"
							/>
						</label>
						<label> ITEM OPTIONS:
							<div className="check-box">
							<span>Active:
							<Checkbox 
							name={'active'} 
							value={checked.active}
							checked={checked.active}
							onchange={() => setChecked((state) => ({...state, active:!checked.active}))} 
							/> </span>
							<span>Discount:
							<Checkbox 
							name={'discount'} 
							value={checked.discount.status}
							checked={checked.discount.status}
							onchange={() => setChecked((state) => ({...state, discount:{...state.discount, status:!state.discount.status}}))}   
							/> </span>
							<span>Promotion:
							<Checkbox
							name={'promotion'} 
							value={checked.promotion.status} 
							checked={checked.promotion.status}
							onchange={() => setChecked((state) => ({...state, promotion:{...state.promotion, status:!state.promotion.status}}))}  
							/></span>
							</div>
						</label>
						<input type="submit" value="ADD ITEM TO SHOP"/>
					</Form>
					<BackButton to={"/shop"} />
                </Main>
            )}
        </>
    );
}
