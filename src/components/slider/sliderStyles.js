import styled, {keyframes} from 'styled-components'
import {a} from '@react-spring/web'
import media from '../../utils/media'

const spin = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`
export  const WrapImgCount = styled.div`
	align-self: flex-start;

	h3, .itm-count{
		margin:15px 0;
		${media.desktop`margin:15px 0;`}
		${media.laptop`margin:15px;`}
		${media.phone`margin:15px;`}
	}

`
export  const WrapThumbs = styled.div`
	display:flex;
	flex-wrap:wrap-reverse;
    background:rgba(0,0,0,0.1);
	width:fit-content;
`
export const OverflowCont = styled.div`
    position:relative;
	//width:100vw;
	max-width:450px;
    //min-height:60vh;
    display:flex;
	flex-wrap:wrap;
    align-items:center;
    background:rgba(0,0,0,1);
	overflow-x:hidden;
`
export const SliderCont = styled(a.div)`
    position:relative;
	//width:100%;
    //height:clamp(100px, 75vh, 1200px);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:${props => props.urlon === 'true' ? 'pointer' : 'arrow'};
`
export const DefineHeight = styled.div`
    opacity:0;
	width:100%;
`
export const LeftSlideCont = styled.div`
    position:absolute;
    top:0;
    left:${({leftRight}) => leftRight ? '100%' : '-100%'};
	width:100%;
	height:100%;

	/*.for-logos img{
		width:15%;
		aspect-ratio:3/2;
		object-fit:contain;
		mix-blend-mode:color-burn;
	}*/
`
export const MidSlideCont = styled.div`
    position:absolute;
    top:0;
    left:0%;
	width:100%;
	height:100%;
`
export const RightSlideCont = styled.div`
    position:absolute;
    top:0;
    left:100%;
	width:100%;
	height:100%;
`
export const LoaderCont = styled.div`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,0.7);
`
export const Loader = styled.div`
	border: 7px solid rgba(255, 204, 0, 0.3);
	border-top: 7px solid rgba(255, 204, 0, 1);
	border-radius: 50%;
	width:75px;
	height:75px;
	animation: ${spin} 1s linear infinite;
` 
export const ThumbsCont = styled.div`
    display:flex;
    align-items:flex-end;
	flex-wrap:wrap;
	flex-flow:column-reverse;
	//max-height:100px;
    padding-top:1px;
    background:rgba(0,0,0,0.1);
    overflow-x:auto;
	border-left:3px solid  rgba(0, 0, 0, 1);
    //cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39,
    //auto;

	//${media.desktop` flex-flow:column-reverse;`}
	${media.laptop`flex-flow:column-reverse;`}
	${media.phone`flex-flow:row;`}
`
export const Thumb = styled.div`
	//width:fit-content;
    margin:0 1px;
    cursor:pointer;
    border-bottom:5px solid ${props => props.selected ?  'rgba(177, 163, 189, 1)' : '#35193dff'};
    opacity:${props => props.selected ?  1 : 0.5};

	img{
		width:150px;
		aspect-ratio:3/2;
		object-fit:contain;
	}

    &:hover{
        opacity:1;
    }
`
export const SlideLeftBtn = styled.div`
    position:absolute;
    display:flex;
    align-items:center;
    justify-content:center;
    width:clamp(45px, 10vw, 65px);
    height:clamp(45px, 10vw, 65px);
    background: ${props => props.startEnd ?  'rgba(0,0,0, 0.4)': 'rgba(0,0,0, 0.2)'};
    ${props => props.startEnd && 'cursor:pointer;'}
    
    border-radius:50%;
    margin:15px;
    opacity:${props => props.startEnd ?  1 : 0.5};


    &:hover{
        background: ${props => props.startEnd ?  'rgba(0,0,0, 0.5)': 'rgba(0,0,0, 0.2)'};
    }
`
export const SlideRightBtn = styled(SlideLeftBtn)`
    right:0;
`