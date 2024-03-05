function generateHTML() {
    let newInput = document.createElement("input")
    newInput.placeholder = "Enter email"
    newInput.classList.add("email", "mb-2", 'w-50')
    document.getElementById("email-container").append(newInput)
}

async function submitInvitations(e) {
    e.preventDefault()
    // create a Array from a new Set (unique values only) from an Array from the values of all the elements with class email
    // that do not have empty input fields
    const values = Array.from(new Set(Array.from(document.querySelectorAll('.email'))
        .map(input => input.value.trim()).filter(input => input)))

    const join_code = document.querySelector("#join_code").value

    console.log(values, join_code);

    const response = await fetch('/api/workspace/invites', {
        method: "POST",

        body: JSON.stringify({ values, join_code }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) {
        //navigate to ??
    }

}


document.getElementById("add-btn").addEventListener("click", generateHTML)
document.getElementById("invite-form").addEventListener("submit", submitInvitations)