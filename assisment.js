const totalQuestions = 5
let userResponses = {}

async function submitAssessment(){

if(Object.keys(userResponses).length < totalQuestions){
alert("Please answer all questions")
return
}

try{

const answers = Object.values(userResponses)

const response = await fetch("https://ai-career-project.onrender.com/predict-career",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
answers:answers
})
})

const data = await response.json()

const results = {
userResponses:userResponses,
aiResult:data,
completedDate:new Date().toISOString()
}

localStorage.setItem("careerAssessmentResults",JSON.stringify(results))

window.location.href="result.html"

}catch(error){

console.error("Server error",error)
alert("Cannot connect to AI server")

}

}
