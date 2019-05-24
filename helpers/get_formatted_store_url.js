export default (store_url) => {
    const newStoreUrl = store_url.split('/');
    return newStoreUrl[2];
}