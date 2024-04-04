import express from "express";

const app = express();
app.set('carName', 'Telsa')
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(req.path)
    next()
})
// add json middleware
app.use(express.json())
app.use(express.static('public'))

const cars = [{name: app.get('carName')}, {name: 'Astra'},]

app.get('/cars', (req, res, next) => {
    return res.json(cars)
})

app.post('/cars', (req, res, next) => {
    cars.push(req.body)
    return res.sendStatus(201)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
