// login page js
document.getElementById('admin-login-btn').addEventListener('click', function() {
    setActiveButton('admin-login-btn', 'teacher-login-btn');
});

document.getElementById('teacher-login-btn').addEventListener('click', function() {
    setActiveButton('teacher-login-btn', 'admin-login-btn');
});

function setActiveButton(activeId, inactiveId) {
    document.getElementById(activeId).classList.add('active');
    document.getElementById(inactiveId).classList.remove('active');
}

//admin page js
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        alert('Navigating to ' + card.querySelector('h3').innerText);
    });
});

//teachers section js
// JavaScript for modal functionality
const modal = document.getElementById("teacherModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const teacherGrid = document.getElementById("teacherGrid");
const teacherForm = document.getElementById("teacherForm");

// Open modal
openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Close modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside of the modal
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Submit teacher form
teacherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Create new teacher card
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;

    const teacherCard = document.createElement("div");
    teacherCard.classList.add("teacher-card");

    teacherCard.innerHTML = `
        <h4>${firstName} ${lastName}</h4>
        <p>Email: ${email}</p>
    `;

    // Append teacher card to the grid
    teacherGrid.appendChild(teacherCard);

    // Clear form and close modal
    teacherForm.reset();
    modal.style.display = "none";
});

