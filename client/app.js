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
  msgContainer.innerHTML = "";
  // loop through the messages and print them on the page
  messages.forEach(function (message) {
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    h3.textContent = message.agentName;
    p.textContent = message.secretMessage;


    msgContainer.appendChild(h3);
    msgContainer.appendChild(p);
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

setInterval(() => {
  getAnnouncements();
  getMessages();
}, 1000);
