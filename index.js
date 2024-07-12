const express = require('express');
const app = express();

app.use(express.json());
app.use(logger);

let courses = [
    { id: 1,name: "java"},
    { id: 2,name: "javascript"},
    { id: 3, name: "python"}
];



app.get('/courses',(req,res)=>{
    res.json(courses);
});

// app.get('/',(req,res) => {
//     res.write("hello");
// })

app.post('/courses',(req,res) =>{
    console.log(req.body);
    let singleCourse = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(singleCourse);
    res.send(courses);
})

app.put('/courses:id',(req,res) => {
    console.log("changed id 1");
   try{
    let changedcourse = courses.find((course) => {
        return course.id === req.params.id;//params are parameters,url
    })
   

   if(!changedcourse){
    res.status(404).send("course does not exist");
   }

   singleCourse.name = req.body.name;
   res.send(courses);
} catch(err){
    res.status(500).send(err);
}
    
})
app.delete('/courses:id',(req,res) => {
    console.log("deleted id 2");
      const index = courses.findIndex(course => course.id === 2);
      if(index != -1){
        courses.splice(index,1);
        res.send(courses);
      }else{
        res.status(404).send("course with id 2 not found");
      }
   
})

function logger(req,res,next) { //custom middleware
    console.log(`${req.ip}+${req.hostname}+${req.method}+${req.date}`);
    next();
}

app.listen(3000, () => {
    console.log("server is listening");
}
);

