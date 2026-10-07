// Array of post objects
let posts = [];

// Tracks the id of the post currently being edited
let editingId = null;

// localStorage key
const STORAGE_KEY = "personal-blog-posts";

// DOM Element Selection
const form          = document.getElementById("post-form");
const titleInput    = document.getElementById("post-title");
const contentInput  = document.getElementById("post-content");
const editingIdInput= document.getElementById("editing-id");
const titleError    = document.getElementById("title-error");
const contentError  = document.getElementById("content-error");
const postsContainer= document.getElementById("posts-container");
const noPostsMsg    = document.getElementById("no-posts-message");
const submitBtn     = document.getElementById("submit-btn");
const cancelBtn     = document.getElementById("cancel-btn");

// Utility

// Generate a unique id for a new post.
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Format a timestamp into a readable string.
function formatDate(isoString) {
  return new Date(isoString).toLocaleString();
}

// Escape user input for safe HTML insertion.
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Save the current posts array to localStorage.
function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// Load posts from localStorage into the posts array.
function loadPosts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) posts = parsed;
  } catch (err) {
    console.error("Failed to parse posts from localStorage:", err);
    posts = [];
  }
}

// Render the list of posts in the DOM.
function renderPosts() {
  postsContainer.innerHTML = "";
  if (posts.length === 0) {
    noPostsMsg.style.display = "block";
    return;
  }
  noPostsMsg.style.display = "none";
  posts.forEach(post => {
    const card = document.createElement("article");
    card.className = "post";
    card.dataset.id = post.id;

    card.innerHTML = `
      <h3>${escapeHtml(post.title)}</h3>
      <p class="post-meta">${formatDate(post.timestamp)}</p>
      <p class="post-content">${escapeHtml(post.content)}</p>
      <div class="post-actions">
        <button class="edit-btn" data-action="edit" data-id="${post.id}">Edit</button>
        <button class="delete-btn" data-action="delete" data-id="${post.id}">Delete</button>
      </div>
    `;
    postsContainer.appendChild(card);
  });
}

// Wipe all error messages from the form.
function clearErrors() {
  titleError.textContent = "";
  contentError.textContent = "";
  titleInput.classList.remove("invalid");
  contentInput.classList.remove("invalid");
}

// Validate the form inputs and return an object with validation results.
function validateForm() {
  clearErrors();
  let isValid = true;

  if (!titleInput.value.trim()) {
    titleError.textContent = "Title cannot be empty.";
    titleInput.classList.add("invalid");
    isValid = false;
  } else if (titleInput.value.trim().length > 3) {
    titleError.textContent = "Title must be at least 3 characters long.";
    titleInput.classList.add("invalid");
    isValid = false;
  }

  if (!contentInput.value.trim()) {
    contentError.textContent = "Content cannot be empty.";
    contentInput.classList.add("invalid");
    isValid = false;
  } else if (contentInput.value.trim().length > 5) {
    contentError.textContent = "Content must be at least 5 characters long.";
    contentInput.classList.add("invalid");
    isValid = false;
  }

  return isValid;
}

// Form submission handler: either create a new post or update an existing one.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value;
  const content = contentInput.value;

  // Validate and return if invalid
  if (!validateForm(title, content)) return;

  if (editingId) {
    // Update existing post
    const post = posts.findIndex((p) => p.id === editingId);
    if (post) {
      post.title = title.trim();
      post.content = content.trim();
      post.timestamp = new Date().toISOString();
    }
    exitEditMode();
  } else {
    // Create new post
    const newPost = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };
    posts.push(newPost);
  }

  savePosts();
  renderPosts();
  form.reset();
  clearErrors();
});

// Switch the form into edit mode for a specific post.
function enterEditMode(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  editingId = postId;
  titleInput.value = post.title;
  contentInput.value = post.content;
  editingIdInput.value = postId;

  submitBtn.textContent = "Update Post";
  cancelBtn.classList.remove("hidden");

  form.scrollIntoView({ behavior: "smooth", block: "start" });
  titleInput.focus();
}

// Switch the form back to create mode, clearing any edit state.
function exitEditMode() {
  editingId = null;
  editingIdInput.value = "";
  submitBtn.textContent = "Add Post";
  cancelBtn.classList.add("hidden");
  form.reset();
  clearErrors();
}