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