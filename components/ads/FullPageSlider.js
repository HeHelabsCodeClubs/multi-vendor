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


// function renderAdds(adds) {
//     if (adds) {
//         const addsLayout = adds.map((add) => {
//             return (
//                 <div key={add.id}>
//                     <a href={add.slider_url}>
//                         <ImageLoader 
//                         imageUrl={add.image_url}
//                         hasPlaceholder={false}
//                         placeholderHeight={300}
//                         />
//                     </a>
//                 </div>
//             );
//         });
    
//         return addsLayout;
//     }
    
// }

const FullPageSlider  = ({ adds }) => {
    return (
        <Slider {...settings}>
            {/* {renderAdds(adds)} */}
            <div>
                <a href="https://m.hehe.rw/sellers/all-in-one/products/visit-rwanda-gift-pack">
                    <ImageLoader 
                    imageUrl="https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1570806633/hehe/Artboard_1.jpg"
                    hasPlaceholder={false}
                    placeholderHeight={300}
                    />
                </a>
            </div>

            {/* <div>
                <a href="https://hehe.rw/categories/clothing-fashion">
                    <ImageLoader 
                    imageUrl="https://res.cloudinary.com/hehe/image/upload/v1564395458/multi-vendor/slider_images/Default/Banner-1_mobile_2x.png"
                    hasPlaceholder={false}
                    placeholderHeight={300}
                    />
                </a>
            </div> */}
        </Slider>
    );
}

export default FullPageSlider;