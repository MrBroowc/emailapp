const domains = ["bndts.com"];
const emailElement = document.getElementById('email');
const copySuccess = document.getElementById('copy-success');

function getRandomString(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => 
    characters[Math.floor(Math.random() * characters.length)]
  ).join('');
}

function generateEmail() {
  emailElement.classList.remove('glow');
  void emailElement.offsetWidth; // Trigger reflow for animation reset
  
  const username = getRandomString(8);
  const domain = domains[Math.random() * domains.length | 0];
  emailElement.textContent = `${username}@${domain}`;
  emailElement.classList.add('glow');
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(emailElement.textContent);
    copySuccess.classList.add('visible');
    setTimeout(() => copySuccess.classList.remove('visible'), 2000);
  } catch (err) {
    copySuccess.textContent = "✦ Error copying!";
    copySuccess.classList.add('visible');
    setTimeout(() => copySuccess.classList.remove('visible'), 2000);
  }
}

// Event listeners
document.getElementById('generate-btn').addEventListener('click', generateEmail);
document.getElementById('copy-btn').addEventListener('click', copyEmail);

// Initial generation with slight delay for better UX
setTimeout(generateEmail, 300);
