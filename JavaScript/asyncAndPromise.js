(async function() {
  async function iAmSlow() {
  setTimeout(() => {
    console.log(`Hi, I hope I'm not late`);
  }, 3000);
}

await iAmSlow();

console.log(`Your script has reached the end. There is no more. I'm 99% sure of it.`);
})();
