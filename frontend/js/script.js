// Declaring variable
const divMessage = document.getElementById('message');
const patientSection = document.getElementById('patientSection');
const pFirstNameSpan = document.getElementById('pFirstName');
const pLastNameSpan = document.getElementById('pLastName');
const patientEmail = document.getElementById('pEmail');
const logoutButton = document.getElementById('logoutbutton');

function showMessage(type, text) {
  divMessage.style.display = 'block';

  if (type == 'succes') {
    divMessage.style.color = 'green';
  } else {
    divMessage.style.color = 'red';
  }
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
  const response = await fetch('/telemedicine/api/patient/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, phone, password }),
  });

  const result = await response.json;

  if (result.status === 201) {
    showMessage('success', result.message);
  } else {
    showMessage('failed', result.result);
  }
});

// Login form
document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();

  const firstName = document.getElementById('loginFirstName').value;
  const lastName = document.getElementById('loginLastName').value;
  const email = document.getElementById('loginEmail').value;
  const phone = document.getElementById('loginPhone').value;
  const password = document.getElementById('loginPassword').value;

  //   Transit the data
  const response = await fetch('/telemedicine/api/patients/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, phone, password }),
  });

  const result = await response.json;

  if (result.status === 201) {
    showMessage('success', result.message);
  } else {
    showMessage('failed', result.result);
  }
});

// Function for fetching user details
async function getPatient() {
  const response = await fetch('');
}
