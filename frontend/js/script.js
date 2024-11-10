// Declaring variable
const divMessage = document.getElementById('message');
const patientSection = document.getElementById('patientSection');
const pFirstNameSpan = document.getElementById('pFirstName');
const pLastNameSpan = document.getElementById('pLastName');
const patientEmail = document.getElementById('pEmail');
const logoutButton = document.getElementById('logoutbutton');

function showMessage(type, text) {
  divMessage.style.display = 'block';
  divMessage.style.color = red;
  divMessage.textContent = text;

  setTimeout(() => {
    divMessage.style.display = 'none';
  }, 3000);
}

// Registration form
document.getElementById('registerForm').addEventListener('submit', async e => {
  e.preventDefault();

  const firstName = document.getElementById('regFirstName').value;
  const lastName = document.getElementById('regLastName').value;
  const email = document.getElementById('regEmail').value;
  const phone = document.getElementById('regPhone').value;
  const password = document.getElementById('regPassword').value;

  //   Transit the data
  const response = await fetch('/telemedicine/api/patient/register', {});
});
