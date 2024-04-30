import { timeStamp } from "console"

export const timestampToDateString = (timestamp:number) => {

    const date = new Date(timestamp)

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    const formattedDate = date.toLocaleDateString('en-GB', options)

    return formattedDate;
}