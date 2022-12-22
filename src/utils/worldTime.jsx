
export const worldTime = async () => {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Australia/Sydney')
    const myJson = await response.json()

	let date = new Date(myJson.unixtime*1000)

    return {
		getDay:date.getDay(),
		getHour:date.getHours(),
		getMins:date.getMinutes(),
		getSecs:date.getSeconds()
	}
}