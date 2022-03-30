import cors from 'cors'
import express from 'express'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 3000


let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]
const dataErr = {
    "type": "Error",
    "title": "Error",
    "status": 0,
    "detail": "data is not correct",
    "instance": "title",
}

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())


app.get('/lesson_01/api/videos', (req, res) => {
    res.send(videos)
})

app.post('/lesson_01/api/videos', (req, res) => {
    const title = req.body.title
    if (title && typeof title === "string") {
        const newValue = {
            id: ++videos.length,
            title: title,
            author: 'it-incubator.eu'
        }
        console.log(newValue)
        videos = [...videos, newValue]
        res.send(newValue)
    } else {
        res.send(dataErr)
    }
})

app.get('/lesson_01/api/videos/:id', (req, res) => {
    if (req.params.id && typeof +req.params.id === "number") {
        const entity = videos.find(video => video.id === +req.params.id)
        if (entity) {
            res.send(entity)
        } else {
            res.send(dataErr)
        }
    } else {
        res.send(dataErr)
    }
})

app.put('/lesson_01/api/videos/:id', (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const isNumberValid = id && typeof +id === "number"

    if (isNumberValid && title.trim()) {
        const candidate = videos.findIndex(video => video.id === +id)
        console.log(videos[candidate])
        if (videos[candidate] ) {
            videos = videos.map(video => {
                return video.id === +id ? {...video, title: title} : video
            })
            res.send(203)
        }else{
            res.send(dataErr)
        }
    }else{
        res.send(dataErr)
    }
})

app.delete('/lesson_01/api/videos/:id', (req, res) => {
    const id = req.params.id
    const isNumberValid = id && typeof +id === "number"
    if (isNumberValid) {
        const candidate = videos.findIndex(video => video.id === +id)
        if (videos[candidate]) {
            videos = videos.filter(video => video.id !== +id)
            res.send(203)
        }else{
            res.send(dataErr)
        }
    }else{
        res.send(dataErr)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

