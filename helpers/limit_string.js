export default (text, limit) => {
    if (text !== undefined) {
        return `${text.substring(0, limit)}...`;
    }
}