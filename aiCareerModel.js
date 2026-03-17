const { spawn } = require("child_process")
const path = require("path")

function convertAnswers(answers){

let features = {
tech:0,
biology:0,
creativity:0,
communication:0,
math:0
}

answers.forEach(ans => {

if(ans === "technology" || ans === "tech" || ans === "ai")
features.tech++

if(ans === "science" || ans === "biotech")
features.biology++

if(ans === "creative" || ans === "arts")
features.creativity++

if(ans === "team" || ans === "collaborative")
features.communication++

if(ans === "math" || ans === "analytical")
features.math++

})

return features
}

function predictCareer(answers){

return new Promise((resolve, reject) => {

const features = convertAnswers(answers)

const scriptPath = path.join(__dirname,"../ai/predict.py")

const pythonProcess = spawn("python",[
scriptPath,
JSON.stringify(features)
])

let result=""
let error=""

pythonProcess.stdout.on("data",(data)=>{
result += data.toString()
})

pythonProcess.stderr.on("data",(data)=>{
error += data.toString()
})

pythonProcess.on("close",(code)=>{

if(code !== 0){
reject(error)
}

else{

try{

const parsed = JSON.parse(result.trim())
resolve(parsed)

}catch(e){

reject("Invalid AI response")

}

}

})

})

}

module.exports = { predictCareer }