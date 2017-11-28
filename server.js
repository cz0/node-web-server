express = require('express')
hbs = require('hbs')
fs = require('fs')

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to append log.')
        }
    })

    next()
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our fancy page'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/bad', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    res.send({
        error: 'This is a bad request.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})