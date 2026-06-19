const mood = document.getElementById("mood");
const genre = document.getElementById("genre");
const length = document.getElementById("length");
const age = document.getElementById("age");
const series = document.getElementById("series");
const favoriteBooks = document.getElementById("favorite-books");
const avoid = document.getElementById("avoid");

const createPromptButton = document.getElementById("create-prompt");
const aiPrompt = document.getElementById("ai-prompt");
const aiResult = document.getElementById("ai-result");
const makeShelfButton = document.getElementById("make-shelf");
const bookShelf = document.getElementById("book-shelf");
const catalogSummary = document.getElementById("catalog-summary");

function updateCatalog() {
  catalogSummary.innerHTML = `
    <div><strong>Mood</strong><span>${mood.value}</span></div>
    <div><strong>Genre</strong><span>${genre.value}</span></div>
    <div><strong>Length</strong><span>${length.value}</span></div>
    <div><strong>Level</strong><span>${age.value}</span></div>
  `;
}

[mood, genre, length, age, series, favoriteBooks, avoid].forEach((field) => {
  field.addEventListener("change", updateCatalog);
  field.addEventListener("input", updateCatalog);
});

function createLibrarianPrompt() {
  updateCatalog();

  aiPrompt.value = `You are helping with an educational Book Selector project for a student.

Use the reader's answers to recommend books.

Please recommend 5 books. Keep them age-appropriate and explain why each one fits.

Use this exact format so the website can organize it:

BOOK 1:
Title:
Author:
Why it fits:
Content note:

BOOK 2:
Title:
Author:
Why it fits:
Content note:

BOOK 3:
Title:
Author:
Why it fits:
Content note:

BOOK 4:
Title:
Author:
Why it fits:
Content note:

BOOK 5:
Title:
Author:
Why it fits:
Content note:

READING TIPS:
- Give 3 short reading tips.

Reader preferences:
- Mood: ${mood.value}
- Genre: ${genre.value}
- Length: ${length.value}
- Reading level: ${age.value}
- Series preference: ${series.value}
- Books or shows already liked: ${favoriteBooks.value || "not provided"}
- Avoid: ${avoid.value || "nothing listed"}

Do not recommend books that are too mature, too scary, or inappropriate for a young student. If unsure, say that a parent should check the book first.`;
}

function extractTitle(bookText, fallback) {
  const titleMatch = bookText.match(/Title:\s*([^\n]+)/i);
  return titleMatch ? titleMatch[1].trim() : fallback;
}

function addBookCard(title, text) {
  const card = document.createElement("article");
  card.className = "book-spine";

  const heading = document.createElement("h3");
  heading.textContent = title;

  const body = document.createElement("p");
  body.textContent = text.trim();

  card.appendChild(heading);
  card.appendChild(body);
  bookShelf.appendChild(card);
}

function makeReadingShelf() {
  const result = aiResult.value.trim();
  bookShelf.innerHTML = "";

  if (!result) {
    addBookCard("Paste AI result first", "Copy the librarian prompt into ChatGPT or Gemini, then paste the recommendation answer here.");
    return;
  }

  const bookMatches = [...result.matchAll(/BOOK\s*([1-5])\s*:\s*([\s\S]*?)(?=BOOK\s*[1-5]\s*:|READING TIPS:|$)/gi)];

  if (bookMatches.length > 0) {
    bookMatches.forEach((match) => {
      const bookText = match[2];
      const title = extractTitle(bookText, `Book ${match[1]}`);
      addBookCard(title, bookText);
    });

    const tipsMatch = result.match(/READING TIPS:\s*([\s\S]*)/i);
    if (tipsMatch) {
      addBookCard("Reading Tips", tipsMatch[1]);
    }
  } else {
    addBookCard("AI Book Recommendations", result);
  }

  addBookCard("Safety Note", "This is a reading helper. A parent can check books first if the reader is unsure.");
}

createPromptButton.addEventListener("click", createLibrarianPrompt);
makeShelfButton.addEventListener("click", makeReadingShelf);
updateCatalog();
