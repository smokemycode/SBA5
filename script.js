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
