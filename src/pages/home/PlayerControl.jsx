import React, {useState, useEffect, useCallback} from 'react'
import styled from "styled-components"
import PlayerSeek from './PlayerSeek'

const Duration = styled.span`
    display:flex; 
    align-items:center;
    justify-content:center;
    font-size:0.85rem;
    color:papayawhip;
    font-family:Arial, Helvetica, sans-serif;
    white-space: nowrap;
`

let once = true

export default function PlayerControl ({audioStream, isPodcast}) {

    const [currentTime, setCurrentTime] = useState('')
    const [buffered, setBuffered] = useState('')
    const [progress, setProgress] = useState('')
    
    /*function seekTo() { 
        // Calculate the seek position by the 
        // percentage of the seek slider 
        // and get the relative duration to the track 
        seekto = audioStream.duration * (seek_slider.value / 100); 
        
        // Set the current track position to the calculated seek position 
        audioStream.currentTime = seekto; 
        } 
        
        function setVolume() { 
        // Set the volume according to the 
        // percentage of the volume slider set 
        audioStream.volume = volume_slider.value / 100; 
        } 
        
        function seekUpdate() { 
        let seekPosition = 0; 
        
        // Check if the current track duration is a legible number 
        if (!isNaN(audioStream.duration)) { 
             
        } 

        // Functiom to reset all values to their default 
        function resetValues() { 
            curr_time.textContent = "00:00"; 
            total_duration.textContent = "00:00"; 
            seek_slider.value = 0; 
        } 
    
        seekPosition = audioStream.currentTime * (100 / audioStream.duration); 
                seek_slider.value = seekPosition; 
    } 
      */  
    let durationMinutes = Math.floor(audioStream.duration / 60)
    let durationSeconds = Math.floor(audioStream.duration - durationMinutes * 60)
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
            
    let updateDur = useCallback(() => {

        let currentMinutes = Math.floor(audioStream.currentTime / 60); 
        let currentSeconds = Math.floor(audioStream.currentTime - currentMinutes * 60); 
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
        
        return `${currentMinutes} : ${currentSeconds} `

    }, [audioStream.currentTime])

    useEffect(() => {
		console.log('playercontrol useeffect')
		
			audioStream.addEventListener('stalled', () => {
				if(audioStream.paused) return
				//audioStream.load()
				audioStream.play()
            })

            audioStream.addEventListener('timeupdate', () => {
                setCurrentTime(updateDur())
                setProgress((audioStream.currentTime / audioStream.duration)*100 + "%")
            })

            isPodcast && audioStream.addEventListener('progress', () => {
                let duration =  audioStream.duration
                if (duration > 0) {
                for (let i = 0; i < audioStream.buffered.length; i++) {
                        if (audioStream.buffered.start(audioStream.buffered.length - 1 - i) < audioStream.currentTime) {
                            setBuffered((audioStream.buffered.end(audioStream.buffered.length - 1 - i) / duration) * 100 + "%")
                            break
                        }
                    }
                }
            })
    }, [])
        
    return(
        <Duration>
            {currentTime}
            {!isNaN(durationSeconds) && isPodcast && <PlayerSeek {...{audioStream, buffered, progress}}/>}
            {`${!isNaN(durationSeconds) && isPodcast
            ? `${durationMinutes} : ${durationSeconds}` 
            : '| ∞' }`}
        </Duration>
    )
}