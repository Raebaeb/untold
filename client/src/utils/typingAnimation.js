
export const typingAnimation = (text) => {
  const i = 0;
  const speed = 50;
  if (i < text.length) {
    document.getElementById('landing-hero').innerHTML += text.charAt(i);
    i++;
    setTimeout(typingAnimation, speed)
  }
}