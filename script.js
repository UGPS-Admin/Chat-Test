const CLIENT_ID = 'rB9bHuU6T9SElL0D';

const drone = new ScaleDrone(CLIENT_ID, {
  data: {
    name: getRandomName(),
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', (error) => {
  if (error) {
    return console.error(error);
  }

  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', (error) => {
    if (error) {
      return console.error(error);
    }

    console.log('Successfully joined room');
  });

  room.on('members', (roomMembers) => {
    members = roomMembers;
    updateMembers();
  });

  room.on('member_join', (newMember) => {
    members.push(newMember);
    updateMembers();
  });

  room.on('member_leave', ({ id }) => {
    const index = members.findIndex((member) => member.id === id);
    members.splice(index, 1);
    updateMembers();
  });

function replaceWordsWithHashtags(message) {
  // Define the words you want to replace
  const wordsToReplace = ['hello', 'world'];

  // Replace each word with the same number of hashtags as the length of the word
  let updatedMessage = message;
  wordsToReplace.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const hashtags = '#'.repeat(word.length);
    updatedMessage = updatedMessage.replace(regex, hashtags);
  });

  return updatedMessage;
}

const Scaledrone = require('scaledrone-node');

const room = new Scaledrone('rB9bHuU6T9SElL0D');
room.on('open', error => {
  if (error) {
    return console.error(error);
  }

  room.on('message', (message) => {
    // Replace certain words in the message
    const updatedMessage = replaceWordsWithHashtags(message.data);

    // Broadcast the updated message to all clients in the room
    room.publish({
      message: updatedMessage
    });
  });
});

drone.on('close', (event) => {
  console.log('Connection was closed', event);
});

drone.on('error', (error) => {
  console.error(error);
});

function updateMembers() {
  DOM.membersCount.textContent = members.length;
  DOM.membersList.innerHTML = members
    .map((member) => `<li style="color:${member.clientData.color}">${member.clientData.name}</li>`)
    .join('');
}

function addMessageToList(text, member) {
  const messageEl = document.createElement('li');
  messageEl.innerHTML = `
    <span class="message-username" style="color:${member.client

function getRandomName() {
  const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}
//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: 'observable-room',
    message: value,
  });
}

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in room:`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}
function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}
