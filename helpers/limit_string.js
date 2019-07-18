export default (text, limit) => {
    if (text !== undefined) {
        if (text.length <= limit) {
            return text;
        }
        
        return `${text.substring(0, limit)}...`;
    }
}