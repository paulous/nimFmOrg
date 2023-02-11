import { useState, memo} from 'react'
import {useSpring, animated, useSprings} from '@react-spring/web'
import {Card} from './springAnimationStyles'

const ChangeCharsMemo = ({text, min, max}) => {

	const charsArr = [...text]

	const springs = useSprings(charsArr.length, charsArr.map(() => (null)))

	const random = (min, max) => Math.random() * (max - min) + min;

	return (
	<div>
		{springs.map((s, i) => {
		return (
			<animated.span key={`char${i}`} style={{opacity:random(min, max)}}>
				{charsArr[i] === ' ' ? <> </> : charsArr[i]}
			</animated.span>
		)
		})}
	</div>
	)
}
export const ChangeChars = memo(ChangeCharsMemo)

export const HeadlineTrail = props => {

    const {hline, intro} = props

    return (
        <div className={'headline'} style={{display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
            {intro.map(({ x, height, ...rest }, index) => (
                <animated.span
                    key={hline[index]}
                    style={{ ...rest, transform: x.to(x => `translate3d(0,${x}px,0)`) }}>
                    <animated.span style={{ height, marginRight:'15px' }}>
                        {hline[index]}
                    </animated.span>
                </animated.span>
            ))}
        </div>
    )
}

export const FlipCard = props => {

  const [flipped, set] = useState(false)

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  
  return (
    <div onClick={() => set(state => !state)}>
      <Card src={props.bgImageA} abs={'front'} style={{ opacity: opacity.to(o => 1 - o), transform}}/>
      <Card src={props.bgImageB} abs={'back'} style={{ opacity, transform: transform.to(t => `${t} rotateX(180deg)`)}}/>
    </div>
  )
}
