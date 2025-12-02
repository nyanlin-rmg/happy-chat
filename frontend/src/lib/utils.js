export const getTime = (createdAt) => {
    const timeObj = new Date(createdAt);

    const options = {
        hour: '2-digit',
         minute: '2-digit',
        hour12: true,
    }

    return timeObj.toLocaleTimeString(undefined, options);
}