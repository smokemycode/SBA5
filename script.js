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