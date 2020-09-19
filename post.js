const POST_URL = 'http://jsonplaceholder.typicode.com/posts';
const COMMENT_URL = 'http://jsonplaceholder.typicode.com/comments';

// Store all the comments by post id in a dictionary
let comments = {};

// Fetch posts' titles and corresponding comments
async function fetchData() {

  const response1 = await fetch(POST_URL);
  const posts = await response1.json();

  // Show all the titles to the page
  posts.forEach(obj => {
    let ele = document.getElementById('post');
    ele.innerHTML += "<li class='link' onclick='showComments(" + obj['id'] + ")'><span>" + obj['title'] + "</span></li>";
    ele.innerHTML += "<ul id='" + obj['id'] + "'></ul>";
  });

  // Store all the names, emails and comments by post id
  const response2 = await fetch(COMMENT_URL);
  const data = await response2.json();
  data.reduce(function(r, el) {
    var e = el.postId;
    if (!comments[e]) {
      comments[e] = [];
    }
    comments[e].push(el.name);
    comments[e].push(el.email);
    comments[e].push(el.body);
  }, []);
}

fetchData();

// Helper function to remove all child nodes
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

// Last clicked post id
let last = 1;

// After clicking a title, show its comments
async function showComments(id) {
  // Remove comments from previously clicked post
  removeAllChildNodes(document.getElementById(last));
  // Comments from post id
  let entries = comments[id];
  // Show Name, Email and Comment to the page
  for (let i = 0; i < entries.length; i++) {
    document.getElementById(id).innerHTML += "<li class='comments'>Name: " + entries[i++] + "</li>";
    document.getElementById(id).innerHTML += "<li class='comments'>Email: " + entries[i++] + "</li>";
    document.getElementById(id).innerHTML += "<li class='comments'>Comment: " + entries[i] + "</li>";
    document.getElementById(id).innerHTML += "<br></br>";
  }
  // Set the last clicked post id to the current id
  last = id;
}
