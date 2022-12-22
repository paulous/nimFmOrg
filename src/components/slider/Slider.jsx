import { useState, useRef, useEffect } from 'react'
import { WrapImgCount, WrapThumbs, SliderCont, OverflowCont, DefineHeight, LeftSlideCont, MidSlideCont, LoaderCont, Loader, ThumbsCont, Thumb, SlideLeftBtn, SlideRightBtn } from './sliderStyles'
import { useSpring } from '@react-spring/web'
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'

export default function Slider({ imageArr, urlClick, children }) {

    const [counter, setCounter] = useState(0)
    const [oldCounter, setOldCounter] = useState(0)
    const [leftRight, setLeftRight] = useState(false)
    const [loader, setLoader] = useState(true)

    const slideRest = useRef(true)
    const skipIntro = useRef(false)

    const [slider, setSlider] = useSpring(() => ({left:'0%'}))

    let isUrl = urlClick ? true : false

    let slide = indx => e => {
        e.preventDefault()

        if (indx === counter || oldCounter === indx || 
            indx >= imageArr.length || indx < 0 || !slideRest.current) return
        
        indx > counter ? setLeftRight(true) : setLeftRight(false)
        setLoader(true)
        setCounter(indx)
        slideRest.current = false
    }

    let loaded = direction => {
        setLoader(false)
        skipIntro.current && setSlider.start({left:direction === 'left' ? '-100%' :'100%', onRest: () => {
            setOldCounter(counter)
            setSlider.start({left:'0%', immediate:true})
            slideRest.current = true
        }})

        skipIntro.current = true
    }

    let sides = (imgNum, direction) => (
        direction
        ?   <img onLoad={() => loaded(direction)} src={imageArr[imgNum]} style={{width:'100%'}} />
        :   <img src={imageArr[imgNum]} style={{width:'100%'}} />
    )

    useEffect(() => {
        setCounter(0)
        setOldCounter(0)
	}, [imageArr])

    return <WrapImgCount>
		{children}
		<WrapThumbs>
			<ThumbsCont>
				{imageArr.map((img, i) => (
					<Thumb 
					key={`${i}tmb`} 
					onClick={slide(i)} 
					selected={i === counter ? true : false}
					>
						<img src={img} />
					</Thumb>
				))}
			</ThumbsCont>
			<OverflowCont>
				<SliderCont style={slider} onClick={isUrl ? urlClick(counter): null} urlon={isUrl.toString()}>
					<DefineHeight>
						{sides(counter)}
					</DefineHeight>
					<LeftSlideCont leftRight={leftRight}>
						{sides(counter, leftRight ? 'left' : 'right')}
					</LeftSlideCont>
					<MidSlideCont>
						{sides(oldCounter)}
						{
							loader && 
							<LoaderCont>
								<Loader />
							</LoaderCont>
						}
					</MidSlideCont>
				</SliderCont>
				<SlideLeftBtn startEnd={counter <= 0 ? false : true} onClick={slide(counter-1)}>
					<FiChevronLeft color={'white'} size={36} />
				</SlideLeftBtn>
				<SlideRightBtn startEnd={counter >= imageArr.length-1 ? false : true} onClick={slide(counter+1)}>
					<FiChevronRight color={'white'} size={36} />
				</SlideRightBtn>
			</OverflowCont>
		</WrapThumbs>
		<p className='itm-count'>Showing: {`(${counter+1}) of (${imageArr.length}) images.`}</p>
	</WrapImgCount>
}