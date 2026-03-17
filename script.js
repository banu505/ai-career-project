// Wait until the page fully loads
document.addEventListener("DOMContentLoaded", function () {

    // Get form element
    const form = document.querySelector("form");

    // Check if form exists on the page
    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault(); // stop page refresh

            const name = document.querySelector("#username")?.value;
            const email = document.querySelector("#email")?.value;

            // Send data to backend
            fetch("http://localhost:3000/add-student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    course: "AI Career"
                })
            })
            .then(response => response.json())
            .then(data => {
                alert("Data Saved Successfully!");
                console.log(data);
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Failed to save data");
            });

        });

    }

});