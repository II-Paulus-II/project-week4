console.log("CIA Message Board Live");

/* ----- Get Server Host ----- */ 

let serverLocation  = "https://api.paulus.casa";

// if(window.location.hostname === "localhost") {
//   serverLocation = "http://localhost:9000"
// } else {
//   serverLocation = "https://api.paulus.casa";
// }

/* ----- Trusting Vite Build with your Website yes guten tag ----- */

const watchfulImage = document.getElementById("watchfulImage");
const angryImage = document.getElementById("angryImage");
const threatImage = document.getElementById("threatImage");

/* ----- MESSAGES ----- */
const form = document.getElementById("messageForm");
const msgContainer = document.getElementById("messageContainer");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  // get the form data
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  // send the message to the API
  const response = await fetch(`${serverLocation}/treadstone_messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
});

async function getMessages() {
  // get the jokes from our Database via our API
  const response = await fetch(`${serverLocation}/treadstone_messages`);
  const messages = await response.json();
  //It is Christmas Time I would have figured better way with more time to only print the new messages
  msgContainer.innerHTML = "";
  // loop through the messages and print them on the page
  messages.forEach(function (message) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msgDiv");

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("msgHeaderDiv");

    const h3 = document.createElement("h3");
    h3.classList.add("msgH3");

    const p = document.createElement("p");
    p.classList.add("msgP");

    const img = document.createElement("img");
    img.classList.add("msgImg");

    const delButton = document.createElement("button");
    delButton.classList.add("msgDbutton");
    
    const likesContainer = document.createElement("div");
    likesContainer.classList.add("msgLikesCont");
    
    const numLikes = document.createElement("p");
    numLikes.classList.add("msgNumLikes");

    const likes = document.createElement("p");
    likes.classList.add("msgLikes");
    
    const likeButton = document.createElement("button");
    likeButton.classList.add("msgLikeBut");
   
    //Horrific code due to 100% trusting vite to be cleaver with images
    switch(message.reaction) {
      case "watchful":
        img.src = watchfulImage.src;
        break;
      case "angry":
        img.src = angryImage.src;
        break;
      case "threat":
        img.src = threatImage.src;
        break;
    }
    img.alt = message.reaction;
    h3.textContent = message.agentName;
    p.textContent = message.secretMessage;
    delButton.textContent = "Delete";
    delButton.addEventListener("click", async function() {
      const deleteMsg = await fetch(`${serverLocation}/treadstone_deletemsg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
      });
    });
    
    likeButton.textContent = "Dislike Message";
    likeButton.addEventListener("click", async function() {
      const likeMsg = await fetch(`${serverLocation}/treadstone_likemsg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      });
    });
    likes.textContent = message.likes;
    numLikes.textContent = "Dislikes";
    msgContainer.appendChild(msgDiv);
    msgDiv.appendChild(headerDiv);
    headerDiv.appendChild(img);
    headerDiv.appendChild(h3);
    headerDiv.appendChild(delButton);
    msgDiv.appendChild(p);
    msgDiv.appendChild(likesContainer);
    likesContainer.appendChild(numLikes);
    likesContainer.appendChild(likes);
    likesContainer.appendChild(likeButton);
  });
}

/* ----- Announcements ----- */

const announcementsContainer = document.getElementById("announcementContainer");

async function getAnnouncements() {
  const response = await fetch(`${serverLocation}/treadstone_announcements`);
  const announcements = await response.json();
  //clear container lmao worst solution ever 
  announcementsContainer.innerHTML = ""; 
  announcements.forEach(function (data) {
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    h3.textContent = data.officer;
    p.textContent = data.message;
    announcementsContainer.appendChild(h3);
    announcementsContainer.appendChild(p);
  });
}

/* ----- Get all messages and announcements ----- */ 

getAnnouncements();
getMessages();

setInterval(() => {
  getAnnouncements();
  getMessages();
}, 1000);
