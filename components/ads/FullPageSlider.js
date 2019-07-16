import Slider from "react-slick";
import ImageLoader from '../reusable/ImageLoader';

const settings = {
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    // fade: true,
    cssEase: 'linear'
};


function renderAdds(adds) {
    if (adds) {
        const addsLayout = adds.map((add) => {
            return (
                <div key={add.id}>
                    <a href="#">
                        <ImageLoader 
                        imageUrl={add.image_url}
                        hasPlaceholder={false}
                        placeholderHeight={300}
                        />
                    </a>
                </div>
            );
        });
    
        return addsLayout;
    }
    
}
const FullPageSlider  = ({ adds }) => {
    return (
        <Slider {...settings}>
            {renderAdds(adds)}
        </Slider>
    );
}

export default FullPageSlider;