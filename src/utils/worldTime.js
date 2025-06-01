
export const worldTime = () => {
     const date = new Date();
        const options = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "Australia/Sydney",
        };
        const dateTimeFormat = new Intl.DateTimeFormat("en-AU", options);

        const parts = dateTimeFormat.formatToParts(date);
        const partValues = parts.map((p,i) => i !== parts.length-1 ? Number(p.value) : p.value).filter((_, i) => i % 2 === 0);

        if(partValues[partValues.length - 1] === "pm" && partValues[0] < 12) { 
            partValues[0] += 12; 
        }
        partValues.pop();
        partValues.unshift(date.getDay())

        return {
            getDay: partValues[0],
            getHour: partValues[1],
            getMins: partValues[2],
            getSecs: partValues[3]
        }
}