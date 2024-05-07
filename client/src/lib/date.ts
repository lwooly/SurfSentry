
export const timestampToDateString = (timestampInSeconds:number) => {

    // Validate the timestamp input
    if (typeof timestampInSeconds !== 'number' || Number.isNaN(timestampInSeconds)) {
        throw new Error('Invalid timestamp provided');
    }
    const date = new Date(timestampInSeconds * 1000)

    const options:Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    const formattedDate = date.toLocaleDateString('en-GB',options)

    return formattedDate;
}