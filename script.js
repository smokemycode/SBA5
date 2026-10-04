// Array of post objects
let posts = [];

// Tracks the id of the post currently being edited
let editingId = null;

// localStorage key
const STORAGE_KEY = "personal-blog-posts";

// DOM Element Selection
const form = document.getElementById("post-form");
const titleInput = document.getElementById("post-title");
const contentInput = document.getElementById("post-content");
const editingIdInput = document.getElementById("editing-id");
const titleError = document.getElementById("title-error");
const contentError = document.getElementById("content-error");
const postsContainer = document.getElementById("posts-container");
const noPostsMsg = document.getElementById("no-posts-message");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");

// Utilities

// Unique id 
function generateId() {

}

// Save posts
function savePosts() {

}

// Render posts
function renderPosts() {

}


// New Post Form Submission
form.addEventListener("submit", (event) => {
	event.preventDefault();

	const title = titleInput.value;
	const content = contentInput.value;

	if (!validateForm(title, content)) return;

	if (editingId) {
		const newPost = {
			id: generateId(),
			title: title.trim(),
			content: content.trim(),
			timestamp: new Date(),
		};
		posts.push(newPost);
	}

	savePosts();
	renderPosts();
	form.reset();
	clearErrors();
});
