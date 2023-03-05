import { useState, useEffect } from "react";

export default function PlayTime({audioStream}) {

	const [time, setTime] = useState('')

	let update = () => {

        let currentMinutes = Math.floor(audioStream.currentTime / 60); 
        let currentSeconds = Math.floor(audioStream.currentTime - currentMinutes * 60); 
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
        
        return `${currentMinutes} : ${currentSeconds}`

    }

	useEffect(() => {

		audioStream.addEventListener('timeupdate', (e) => {
			setTime(update())
		})
	
	}, [])
	

    return <span>{time}</span>
}
