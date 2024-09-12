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

