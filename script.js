const lockScreen = document.getElementById("lockScreen");
const mainScreen = document.getElementById("mainScreen");
const envelope = document.querySelector(".envelope");
const content = document.getElementById("content");
const music = document.getElementById("bgMusic");

function checkPassword(){
  const value = document.getElementById("passwordInput").value.trim();

  if(value === DATA.password){
    lockScreen.classList.remove("active");
    mainScreen.classList.add("active");
    loadContent();
  }else{
    document.getElementById("error").textContent = "كلمة السر غير صحيحة ❤️";
  }
}

function loadContent(){

    document.getElementById("title").textContent = DATA.title;

    music.src = DATA.music;

    typeWriter(DATA.message, document.getElementById("message"));

    setTimeout(()=>{
        showGallery();
    },10000);

    updateCounter();

}


function openEnvelope(){
  envelope.classList.add("open");

  setTimeout(()=>{
    content.classList.remove("hidden");
    music.play().catch(()=>{});
  },900);
}

function toggleMusic(){
  if(music.paused) music.play();
  else music.pause();
}

function sharePage(){
  if(navigator.share){
    navigator.share({
      title: DATA.title,
      text: "افتح الرسالة ❤️",
      url: location.href
    });
  }else{
    navigator.clipboard.writeText(location.href);
    alert("تم نسخ الرابط ❤️");
  }
}

function updateCounter() {
  const birth = new Date(DATA.birthDate);
  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
  }

  if (months < 0) {
      years--;
      months += 12;
  }

  document.getElementById("counter").innerHTML = `
      <h2>🎂 عمرك دلوقتي</h2>

      <div class="age-box">
          <span>${years}</span>
          <small>سنة</small>
      </div>

      <div class="age-box">
          <span>${months}</span>
          <small>شهر</small>
      </div>

      <div class="age-box">
          <span>${days}</span>
          <small>يوم</small>
      </div>
  `;
}

function typeWriter(text,element){

    element.innerHTML="";

    let i=0;

    const timer=setInterval(()=>{

        element.innerHTML+=text.charAt(i);

        i++;

        if(i>=text.length){

            clearInterval(timer);

        }

    },35);

}
function showGallery() {

    const gallery = document.getElementById("gallery");
    let index = 0;

    function showNext() {

        if (index >= DATA.images.length) {

    document.getElementById("loveSection").style.display = "block";

    return;
}

        const item = DATA.images[index];

        gallery.innerHTML = `
            <div class="photo-card show">
                <img src="${item.src}">
                <p></p>
            </div>
        `;

        typeWriter(item.text, gallery.querySelector("p"));

        index++;

        setTimeout(showNext, index === 1 ?5000 : 5000);
    }

    showNext();
}
document.getElementById("kissBtn").onclick = ()=>{

    document.getElementById("kissOverlay").classList.add("show");

    setTimeout(()=>{

        document.getElementById("kissOverlay").classList.remove("show");

    },3000);

}