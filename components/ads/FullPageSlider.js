import Slider from "react-slick";

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
    const addsLayout = adds.map((add) => {
        return (
            <div key={add.id}>
                <img src={add.image_url} />
            </div>
        );
    });

    return addsLayout;
}


const FullPageSlider  = ({ adds }) => {
    return (
        <Slider {...settings}>
            {renderAdds(adds)}
        </Slider>
    );
}

export default FullPageSlider;