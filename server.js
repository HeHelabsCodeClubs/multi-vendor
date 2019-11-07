const express = require('express')
const next = require('next')
const app_conf = require('./env')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = app_conf.env.port;
const getTokenValue = app_conf.env.getTokenValue;
const mobileSiteUrl = 'https://m.hehe.rw';


app
    .prepare()
    .then(() => {
        const server = express()

        server.get('/order-complete/:payment', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/order-complete/' + req.params.payment
                });
                res.end();
            }
            return app.render(req, res, '/order-complete', { 
                payment: req.params.payment
            });
        })

        server.get('/process/:payment', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/process/' + req.params.payment
                });
                res.end();
            }
            return app.render(req, res, '/process', { 
                payment: req.params.payment
            });
        })

        server.get('/sellers/:seller/products/:slug', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/sellers/' + req.params.seller + '/products/' + req.params.slug
                });
                res.end();
            }
            return app.render(req, res, '/product-page', { 
                seller: req.params.seller,
                slug: req.params.slug
            });
        })

        server.get('/search-results/:search_term', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/search-results/' + req.params.search_term
                });
                res.end();
            }
            if (!req.params.search_term || (req.params.search_term === '')) {
                res.redirect('/');
            }
            return app.render(req, res, '/search-results', { 
                search_term: req.params.search_term
            });
        })

        server.get('/categories/:category_slug', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/categories/' + req.params.category_slug
                });
                res.end();
            }
            return app.render(req, res, '/categories', { 
                category_slug: req.params.category_slug
            });
        })

        server.get('/categories/:category_slug/:sub_cat_slug', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/categories/' + req.params.category_slug + '/' + req.params.sub_cat_slug
                });
                res.end();
            }
            return app.render(req, res, '/categories', { 
                category_slug: req.params.category_slug,
                sub_cat_slug: req.params.sub_cat_slug
            });
        })

        server.get('/categories/:category_slug/:sub_cat_slug/:sub_last_cat_slug', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/categories/' + req.params.category_slug + '/' + req.params.sub_cat_slug + '/' + req.params.sub_last_cat_slug
                });
                res.end();
            }
            return app.render(req, res, '/categories', { 
                category_slug: req.params.category_slug,
                sub_cat_slug: req.params.sub_cat_slug,
                sub_last_cat_slug: req.params.sub_last_cat_slug
            });
        })

        server.get('/invoice/:id', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/invoice/' + req.params.id
                });
                res.end();
            }
            return app.render(req, res, '/invoice', { 
                id: req.params.id
            });
        })

        server.get('/profile/:page', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/profile/' + req.params.page
                });
                res.end();
            }
            const token = getTokenValue(req.headers.cookie, 'VENDOR_TOKEN');
            if (!token && req.params.page === 'orders') {
                res.redirect('/signin');
            }
            return app.render(req, res, '/profile', { 
                page: req.params.page
            });
        })

        server.get('/checkout/:page', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/checkout/' + req.params.page
                });
                res.end();
            }
            const token = getTokenValue(req.headers.cookie, 'VENDOR_TOKEN');
            if (token && req.params.page === 'account') {
                res.redirect('/checkout/addresses');
            }

            if (!token && req.params.page !== 'account') {
                res.redirect('/checkout/account');
            }
            
            return app.render(req, res, '/checkout', { 
                page: req.params.page
            });
        })

        // server.get('/p/:id', (req, res) => {
        //     const ua = req.header('user-agent');
        //     if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
        //         res.writeHead(302, {
        //             Location: mobileSiteUrl + '/p/' + req.params.id
        //         });
        //         res.end();
        //     }
        //     const actualPage = '/post'
        //     const queryParams = { title: req.params.id }
        //     app.render(req, res, actualPage, queryParams)
        // })

        server.get('/profile/orders', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/profile/orders'
                });
                res.end();
            }
            return app.render(req, res, '/profile');
        })

        server.get('/profile/orders/:id', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl + '/profile/orders/' + req.params.id
                });
                res.end();
            }
            return app.render(req, res, '/order-detail', { 
                id: req.params.id
            });
        })

        server.get('*', (req, res) => {
            const ua = req.header('user-agent');
            if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                res.writeHead(302, {
                    Location: mobileSiteUrl
                });
                res.end();
            }
            return handle(req, res)
        })

        server.listen(port, err => {
            if (err) throw err
            console.log('> Ready on http://localhost:' + port)
        })

        
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })