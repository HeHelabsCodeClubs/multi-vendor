const cartItems = {
    mart: {
        info: {
            name: 'posh creative',
            url: 'kkkk',
            icon: ''
        },
        products: {
            // option one for product without options
            cabbage: {
                cart_image_url: 'htpps//',
                has_attribute_options: 0,
                quantity: 5,
                stock: 10,
                price: 7000,
                has_discount: 1,
                special_price: 3000,
                discount_percent: 57
            },

            kt: {
                cart_image_url: 'htpps//',
                has_attribute_options: 1,
                meta: [
                    {
                        quantity: 5,
                        stock: 10,
                        options: {
                            size: {
                                attribute_id: 24,
                                option_id: 6,
                                title: 'S'
                            },
                            color: {
                                attribute_id: 23,
                                option_id: 1,
                                title: 'Red'
                            }
                        }
                    }
                ],
                attribute_options: [
                    // all product options here
                ],
                price: 7000,
                has_discount: 1,
                special_price: 3000,
                discount_percent: 57
            }
        }
    }
}





// dummy
const cartItems = {
    kukiranguzo: {
        info: {
            name: "Kukiranguzo",
            url: "https://shop.kukiranguzo.com",
            icon: "https://shop.kukiranguzo.com/images/logos/5/kukiranguzo_favicoldpi.png",
            shipment_methods: [
                {
                    title: "Same day delivery",
                    description: "For orders placed and processed before 5PM",
                    rate: "1000",
                    cart_shipping_id: "5",
                    code: "sales.carriers.whs-sameday.active"
                },
                {
                    title: "Next day delivery",
                    description: "Place your order and we will get it delivered in 24 hours",
                    rate: "500",
                    cart_shipping_id: "3",
                    code: "sales.carriers.whs-nextday.active"
                },
                {
                    title: "Three days delivery",
                    description: "Delivered in 48 hours",
                    rate: "0",
                    cart_shipping_id: "4",
                    code: "sales.carriers.whs-threedays.active"
                },
                {
                    title: "Pick & Go",
                    description: "You can now pick up your own package from the physical address of your favorite store. \r\nGet notified when your package is ready and when to pick it up on a hassle-free and timely manner.",
                    rate: "0",
                    cart_shipping_id: "8",
                    code: "sales.carriers.whs-pickgo.active"
                }
            ]
        },
        products: {
            kid_s_scooter_2: {
            name: "Kid’s Scooter",
            cart_image_url: "https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/w_100,h_100,c_pad/v1562921857/multi-vendor/products/267/awbnjfsipn4qkawczcfh.jpg",
            has_attributes: 0,
            price: 31000,
            quantity: 1,
            stock: 100,
            has_discount: 0,
            special_price: 0,
            discount_percent: 0,
            attributes: 
                {
                    short_description: "<p>Amazing Kid’s Scooter</p>",
                    description: "<p>Amazing Kid’s Scooter</p>",
                    meta_title: "",
                    meta_keywords: "",
                    meta_description: "Amazing Kid’s Scooter",
                    weight: "12"
                }
            },
            to_7_years: 
                {
                    name: "5 to 7 years Kid’s Bike",
                    cart_image_url: "https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/w_100,h_100,c_pad/v1568129473/multi-vendor/products/389/zu5litmohzzhg7k4tjos.png",
                    has_attributes: 0,
                    price: 80000,
                    quantity: 1,
                    stock: 1,
                    has_discount: 0,
                    special_price: 0,
                    discount_percent: 0,
                    attributes:
                    {
                        short_description: "<p>5 to 7 years Kid’s Bike</p>",
                        description: "<p>5 to 7 years Kid’s Bike</p>",
                        meta_title: "",
                        meta_keywords: "",
                        meta_description: "5 to 7 years Kid’s Bike",
                        weight: "12"
                    }
                }
        }
    },
    mode_lingeries: {
        info: {
            name: "Mode Lingeries",
            url: "https://store.modelingeries.rw",
            icon: "https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1563789124/multi-vendor/channel/32/favicon/mokbowmmjw4zdmqgqdnt.jpg",
            shipment_methods: [
                {
                    title: "Same day delivery",
                    description: "For orders placed and processed before 5PM",
                    rate: "1000",
                    cart_shipping_id: "5",
                    code: "sales.carriers.whs-sameday.active"
                },
                {
                    title: "Next day delivery",
                    description: "Place your order and we will get it delivered in 24 hours",
                    rate: "500",
                    cart_shipping_id: "3",
                    code: "sales.carriers.whs-nextday.active"
                },
                {
                    title: "Three days delivery",
                    description: "Place your order and we will get it delivered in 72 hours",
                    rate: "0",
                    cart_shipping_id: "4",
                    code: "sales.carriers.whs-threedays.active"
                },
                {
                    title: "Pick & Go",
                    description: "You can now pick up your own package from the physical address of your favorite store. \r\nGet notified when your package is ready and when to pick it up on a hassle-free and timely manner.",
                    rate: "0",
                    cart_shipping_id: "8",
                    code: "sales.carriers.whs-pickgo.active"
                }
            ]
        },
        products: {
            sielei_8: {
                name: "Sielei",
                cart_image_url: "https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/w_100,h_100,c_pad/v1562930944/multi-vendor/products/920/p3gbm54bgza8dwleblud.jpg",
                has_attributes: 1,
                meta: [
                    {
                        quantity: 1,
                        stock: 10,
                        options: {
                            Sizes: {
                                attribute_id: 273,
                                option_id: 595,
                                title: "Khaki (42)"
                            }
                        },
                        price: 15000,
                        has_discount: 0,
                        special_price: 0,
                        discount_percent: 0
                    }
                ],
                attributes: {
                    short_description: "<p class=\"MsoNormal\" style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\">Color: Beige-Khaki</p>\r\n<p class=\"MsoNormal\" style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\"> </p>\r\n<p style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\">Size: Beige (38) ,Khaki (38)-(42</p>",
                    description: "<p class=\"MsoNormal\" style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\">Color: Beige-Khaki</p>\r\n<p class=\"MsoNormal\" style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\"> </p>\r\n<p style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\">Size: Beige (38) ,Khaki (38)-(42</p>",
                    options: [
                        {
                            type: "select",
                            code: "4893-25-844",
                            title: "Sizes",
                            is_required: 1,
                            data: [
                                {
                                    attribute_id: 273,
                                    attribute_sort: 2412,
                                    option_id: 594,
                                    title: "Beige (38) "
                                },
                                {
                                    attribute_id: 273,
                                    attribute_sort: 2413,
                                    option_id: 595,
                                    title: "Khaki (42)"
                                }
                            ]
                        }
                    ],
                    meta_title: "",
                    meta_keywords: "",
                    meta_description: "Color: Beige-Khaki\r\n\r\n\r\nSize: Beige (38) ,Khaki (38)-(42",
                    weight: "12"
                },
                price: 15000,
                has_discount: 0,
                special_price: 0,
                discount_percent: 0
            }
        }
    }
}