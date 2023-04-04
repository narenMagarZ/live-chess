import express,
     {json, urlencoded} 
from 'express'

const app =  express()

app.use(json())
app.use(urlencoded({
     extended:false
}))

export default app