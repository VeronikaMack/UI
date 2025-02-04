

const imgContainer = document.querySelector(".grid-container");
const images = ["0.jpg","1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"];
let imagePickList = [...images, ...images];
const imgCount = imagePickList.length;

//Game state
let revealedCount = 0;
let activeImg = null;
let awaitingEndOfMove = false;
let movesCount = 0;

/* ZAIDIMAS */
function buildImage(image){
    const element = document.createElement("div");
    element.classList.add("img-box");
    element.setAttribute("data-image", image);
    element.setAttribute("data-revealed", "false");
    element.addEventListener("click", () =>{

        const revealed = element.getAttribute("data-revealed");

        if(awaitingEndOfMove||revealed === "true"||(activeImg && element === activeImg.element)){ 
            return;
        }

        let imgElement = document.createElement('img');
        imgElement.src = image;
        element.appendChild(imgElement);

        if(!activeImg){
            activeImg = { element: element, imgElement: imgElement };
            return;
        }
        
        const imageToMatch = activeImg.element.getAttribute("data-image");
        if(imageToMatch === image){
            activeImg.element.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");
            activeImg.element.style.backgroundColor = "rgb(130, 169, 130)";
            element.style.backgroundColor = "rgb(130, 169, 130)";
            imgElement.style.display = 'none';
            activeImg.imgElement.style.display = 'none';
            awaitingEndOfMove = false;
            activeImg = null;
            revealedCount +=2;
            movesCount++;
            updateMovesCount();
            if(revealedCount === imgCount){
                if (revealedCount === imgCount) {
                    openModal();
                    leaderboard2();
                    
                }
            }
            return;
        }
        

        awaitingEndOfMove = true;

        setTimeout(() => {
            imgElement.style.display = 'none';
            activeImg.imgElement.style.display = 'none';
            movesCount++;
            updateMovesCount();
            awaitingEndOfMove = false;
            activeImg = null;
        }, 1000);
    })

    return element;

}

/* RESTART */
function restart(){

    imgContainer.innerHTML = "";
    revealedCount = 0;
    activeImg = null;
    awaitingEndOfMove = false;
    movesCount = 0;
    updateMovesCount();
    imagePickList = [...images, ...images]; 

    for (let i = 0; i < imgCount; i++) {
        const randomIndex = Math.floor(Math.random() * imagePickList.length);
        const image = imagePickList[randomIndex];
        imagePickList.splice(randomIndex, 1);

        const imageBox = buildImage(image);
        imgContainer.appendChild(imageBox);
    }
}

/* RANDOMIZERIS NUOTRAUKU DISPLAY */
for (let i = 0; i < imgCount; i++){
    const randomIndex = Math.floor(Math.random() * imagePickList.length);//random funkcija
    const image = imagePickList[randomIndex];//save the image
    imagePickList.splice(randomIndex, 1);//remove that option

    const imageBox = buildImage(image);

    console.log(image);
    imgContainer.appendChild(imageBox);
}

/* EJIMU SKAICIAVIMAS */
function updateMovesCount() {
    const movesCountDisplay = document.getElementById("movesCountDisplay");
    
    if (movesCountDisplay) {
        movesCountDisplay.textContent = `Moves: ${movesCount}`;
    }
}

/* LAIMEJIMO ZINUTE */
function openModal() {
    const modal = document.getElementById("myModal");
    const winMessage = document.getElementById("winMessage");

    if (modal && winMessage) {
        winMessage.textContent = `You won! It took you ${movesCount} moves to complete`;
        modal.style.display = "block";
    }
}
function closeModal() {
    const modal = document.getElementById("myModal");

    if (modal) {
        modal.style.display = "none";
    }
}

/* ZAIDEJO REGISTRACIJA */
function registerUser(){
    let userCount = sessionStorage.getItem('userCount') || 0;
    userCount++;
    const username = document.getElementById("user").value;
    alert("User registered. Hello "+ username + "!")
    sessionStorage.setItem(`username${userCount}`, username);
    sessionStorage.setItem(`userCount`, userCount);
}

function leaderboard2() {
    const users = [];
  
    const userCount = sessionStorage.getItem('userCount') || 0;
    sessionStorage.setItem(`moves${userCount}`, movesCount);
   
    for (let i = 1; i <= userCount; i++) {
      const username = sessionStorage.getItem(`username${i}`);
      const moves = sessionStorage.getItem(`moves${i}`);
  
      if (username && moves) {
        users.push({ username, moves });
      }
    }
  

    users.sort((a, b) => parseInt(a.moves, 10) - parseInt(b.moves, 10));
  

    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''
  
    users.forEach((user) => {
      const newLeader = document.createElement('li');
      newLeader.textContent = `${user.username} ${user.moves} moves`;
      leaderboardList.appendChild(newLeader);
    });
  }
  

  
  

  