document.getElementById('bookingForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const service = document.getElementById('service').value.trim();
  const quote = document.getElementById('quote').value.trim();

  const data = { name, email, phone, address, service, quote };

  try {
    const response = await fetch('http://localhost:3000/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Booking successful! Confirmation sent to your email.');
      document.getElementById('bookingForm').reset();
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error. Please try again later.');
  }
});
