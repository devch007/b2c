// Show / hide password buttons on the auth pages.
document.querySelectorAll('[data-toggle]').forEach(btn => {
  const input = document.getElementById(btn.dataset.toggle);
  btn.addEventListener('click', () => {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.textContent = show ? 'Hide' : 'Show';
  });
});
