const ImageLoaderPlaceHolder  = ({ 
    imageClass, 
    height, 
    width, 
    url, 
    loadStatus,
    placeholderBackgroundColor
}) => {
    const placeholderClass = !loadStatus ? 'image-placeholder loaded' : 'image-placeholder';
    const background = placeholderBackgroundColor == undefined ? '#f5f5f5' : placeholderBackgroundColor;
    return (
        <div 
        className={placeholderClass}
        style={{ 
            height: `${height}px`, 
            width: `${width}px`,
            backgroundColor: background
        }}
        >
           <img className={imageClass} src={url}/>
        </div>
    );
}

export default ImageLoaderPlaceHolder;