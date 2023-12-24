console.log("me pge werk");

/* ----- MESSAGES ----- */
const form = document.getElementById("messageForm");
const msgContainer = document.getElementById("messageContainer");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  // get the form data
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  // send the joke to the API
  const response = await fetch("http://localhost:8080/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  const json = await response.json();

  console.log(json);
});

async function getMessages() {
  // get the jokes from our Database via our API
  const response = await fetch("http://localhost:8080/messages");
  const messages = await response.json();
  //It is Christmas Time I would have figured better way with more time to only print the new messages
  msgContainer.innerHTML = "";
  // loop through the messages and print them on the page
  messages.forEach(function (message) {
  const msgDiv = document.createElement("div");
    msgDiv.classList.add("msgDiv");

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
    
    const likes = document.createElement("p");
    likes.classList.add("msgLikes");
    
    const likeButton = document.createElement("button");
    likeButton.classList.add("msgLikeBut");

    img.src = `./images/${message.reaction}.webp`;
    img.alt = message.reaction;
    h3.textContent = message.agentName;
    p.textContent = message.secretMessage;
    delButton.textContent = "delete";
    delButton.addEventListener("click", async function() {
      const deleteMsg = await fetch("http://localhost:8080/deletemsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
      });
      console.log("pressed delete");
    });
    likeButton.textContent = "like";
    likeButton.addEventListener("click", async function() {
      const likeMsg = await fetch("http://localhost:8080/likemsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      });
    });
    likes.textContent = message.likes;
    
    msgContainer.appendChild(msgDiv);
    msgDiv.appendChild(img);
    msgDiv.appendChild(h3);
    msgDiv.appendChild(p);
    msgDiv.appendChild(delButton);
    msgDiv.appendChild(likesContainer);
    likesContainer.appendChild(likes);
    likesContainer.appendChild(likeButton);
  });
}

/* ----- Announcements ----- */

const announcementsContainer = document.getElementById("announcementContainer");

async function getAnnouncements() {
  const response = await fetch("http://localhost:8080/announcements");
  const announcements = await response.json();
  //clear container lmao worst solution ever 
  announcementContainer.innerHTML = ""; 
  announcements.forEach(function (data) {
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    h3.textContent = data.lineOne;
    p.textContent = data.lineTwo;
    announcementsContainer.appendChild(h3);
    announcementsContainer.appendChild(p);
  });
}

/* ----- Get all messages and announcements ----- */ 

setInterval(() => {
  getAnnouncements();
  getMessages();
}, 1000);
