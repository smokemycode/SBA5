# Interactive Personal Blog Platform

A client-side blog/journal app built with vanilla HTML, CSS, and JavaScript.
Create, edit, and delete posts — all persisted in your browser's localStorage.

## Features

- Create new posts with title and content
- Edit existing posts (form repopulates with post data)
- Delete posts (with confirmation dialog)
- Data persists across refreshes and browser restarts via localStorage
- Custom client-side form validation with user-friendly error messages
- XSS-safe rendering via HTML escaping

## How to Run

1. Clone or download this repo.
2. Open `index.html` in any modern browser.
3. That's it — no build step, no server, no dependencies.

## Project Structure

    personal-blog-sba/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── README.md

## Reflection

### How I approached it
I built this incrementally, one commit at a time:
1. HTML skeleton
2. CSS
3. JS state + utilities
4. Render function
5. Validation
6. Submit handler
7. Event delegation for edit/delete
8. Initialization

Doing it in this order meant each piece was testable before I moved on.
By the time I got to the submit handler, I already had a working render
function and a working validation function to plug into it.

### Challenges I hit

**Challenge 1: One form for both add and edit.**
My first instinct was to build a separate modal or edit form. But then
I'd be duplicating all the validation and rendering logic. My instructor
suggested using an `editingId` variable — if it's null, we're adding;
if it holds a post id, we're editing. The submit handler branches on it.
This kept everything in one place.

**Challenge 2: Event listeners on dynamically created buttons.**
I originally attached a click listener to each Edit/Delete button inside
`renderPosts()`. It worked, but every re-render re-attached listeners
and I felt like I was duplicating code. Then I learned about **event
delegation** — put ONE listener on the parent container and use
`event.target.closest()` to figure out what was clicked. Now `renderPosts`
doesn't need to know anything about events.

**Challenge 3: XSS safety.**
I was interpolating user input directly into `innerHTML` with template
literals. My instructor pointed out that `<img src=x onerror=alert(1)>`
as a title would execute. The fix is `escapeHtml()` — set the string as
`textContent` on a throwaway div, then read back `innerHTML`. The browser
encodes the dangerous characters for me.

**Challenge 4: Layout jumping when errors appear.**
When error messages appeared, the whole form jumped down. Fix was
`min-height: 1.1em` on `.error-message` so the space is always reserved.

### Known Issues / Not Implemented

- No search or filter.
- No rich text (plain text only).
- No undo for deletions (just a confirm dialog).
- Timestamps refresh on edit (by design, but debatable).
- Confirm dialog uses the browser default, not a custom modal.

## Rubric Self-Check

- HTML: semantic tags, labels, ARIA on error spans
- CSS: red error styling, form + card layout
- DOM: `getElementById`, `createElement`, `appendChild`
- Dynamic content: template literals in `renderPosts()`
- Events: `submit`, delegated `click`, `preventDefault`
- Validation: custom messages, min lengths, works for add AND edit
- localStorage: `JSON.stringify/parse` for save/load
- Code quality: small functions, comments, escapeHtml for safety
