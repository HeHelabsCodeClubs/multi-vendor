const express = require('express')
const next = require('next')
const app_conf = require('./env')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = app_conf.env.port;

app
    .prepare()
    .then(() => {
        const server = express()

        server.get('/sellers/:seller/products/:slug', (req, res) => {
            return app.render(req, res, '/product-page', { 
                seller: req.params.seller,
                slug: req.params.slug
            });
        })

        server.get('/categories/:category_slug', (req, res) => {
            return app.render(req, res, '/categories', { 
                category_slug: req.params.category_slug
            });
        })

        server.get('/categories/:category_slug/:sub_cat_slug', (req, res) => {
            return app.render(req, res, '/categories', { 
                category_slug: req.params.category_slug,
                sub_cat_slug: req.params.sub_cat_slug
            });
        })

        server.get('/p/:id', (req, res) => {
            const actualPage = '/post'
            const queryParams = { title: req.params.id }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
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