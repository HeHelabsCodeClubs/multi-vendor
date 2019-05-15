class ImageLoaderPlaceHolder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            heightValue: 0
        }
    }
    componentWillMount() {
        this.setState({
            heightValue: this.props.height
        });
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.loadStatus) {
            this.setState({
                loading: false
            });

            setTimeout(() => {
                this.setState({
                    heightValue: 'auto'
                });
            }, 4000)
        }
    }
    render() {
        const {
            placeholderBackgroundColor,
            placeholderBackBefore,
            height,
            width,
            imageClass,
            url
        } = this.props;
        const { loading, heightValue } = this.state;
        const placeholderClass = !loading ? 'image-placeholder loaded' : 'image-placeholder';
        const background = placeholderBackgroundColor == undefined ? '#f5f5f5' : placeholderBackgroundColor;
        const back = !loading ? background : placeholderBackBefore;
        return (
            <div 
            className={placeholderClass}
            style={{ 
                height: heightValue, 
                width: `${width}px`,
                backgroundColor: back
            }}
            >
            <img className={imageClass} src={url}/>
            </div>
        );

    }
    
}

export default ImageLoaderPlaceHolder;