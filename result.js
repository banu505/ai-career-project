document.addEventListener("DOMContentLoaded", async () => {

    try {

        const answers = JSON.parse(localStorage.getItem("answers"));
        const userId = localStorage.getItem("userId");

        const response = await fetch("http://localhost:3000/predict-career", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                answers: answers,
                userId: userId
            })
        });

        const data = await response.json();

        console.log("AI Result:", data);

        loadCareerRecommendations(data.careers);

    } catch (error) {

        console.error("Error loading careers:", error);

    }

});


/* LOAD CAREERS */

function loadCareerRecommendations(careers){

const container = document.getElementById("careersContainer")

container.innerHTML=""

careers.forEach((career)=>{

const card = document.createElement("div")

card.className="career-card"

card.innerHTML=`

<div class="career-header">

<div class="career-icon">
<i class="fas fa-briefcase"></i>
</div>

<div class="career-title">
<h3>${career.name}</h3>
<div class="career-match">${career.match || 80}% Match</div>
</div>

</div>

<div class="career-actions">

<button onclick="exploreCareer('${career.name}')">
Learn More
</button>

</div>

`

container.appendChild(card)

})

}


function exploreCareer(name){
alert("Career: " + name)
}