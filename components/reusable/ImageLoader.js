import ImageLoaderPlaceHolder from './ImageLoaderPlaceholder';

class ImageLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.renderImage = this.renderImage.bind(this);
        this.handleImageLoad = this.handleImageLoad.bind(this);
    }
    componentDidMount() {
        let Img = new Image();
        Img.onload = this.handleImageLoad();
        Img.src = this.props.imageUrl;
    }
    handleImageLoad() {
        this.setState({
            loading: false
        });
    }
    renderImage() {
        const { loading } = this.state;
        const { 
            imageUrl,
            placeholderHeight, 
            placeholderWidth,
            placeholderBackgroundColor,
            placeholderBackBefore
        } = this.props;
        if (!loading) {
            return (
                <ImageLoaderPlaceHolder 
                loadStatus={loading}
                height={placeholderHeight} 
                width={placeholderWidth}
                url={imageUrl}
                placeholderBackgroundColor={placeholderBackgroundColor}
                placeholderBackBefore={placeholderBackBefore}
                />
            );
        }
        return (
            <ImageLoaderPlaceHolder 
            height={placeholderHeight} 
            width={placeholderWidth} 
            loadStatus={loading}
            url=''
            />
        )
    }
    render() { 
        return (
            <div>
                {this.renderImage()}
            </div>
        );
    }
}

export default ImageLoader;