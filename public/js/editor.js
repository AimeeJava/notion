const postForm = document.getElementById("post-form");
const input = document.getElementById("in");
const previewOut = document.getElementById("preview-out");
let timer;

window.AppState = {
  currentDocId: null,
};

function setNoteId(id) {
  window.AppState.currentDocId = id;
  document.getElementById("copy-share-link-btn").disabled = !id;
}

function clearNoteId() {
  window.AppState.currentDocId = null;
  document.getElementById("copy-share-link-btn").disabled = true;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function allowSafeUrl(url) {
  if (typeof url !== "string") return "";
  const pattern = /^(https?:\/\/|mailto:|tel:)/i;
  return pattern.test(url) ? url : "";
}

function markdownStyle(text) {
  let s = escapeHtml(text);
  // Bold - (.+?) is less strict than ([^*]+)
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic
  s = s.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // h2, match smaller first
  s = s.replace(/^##\s*(.+)$/gm, "<h2>$1</h2>");
  // h1
  s = s.replace(/^#\s*(.+)$/gm, "<h1>$1</h1>");
  // Links
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const safeUrl = allowSafeUrl(url || "");
    if (!safeUrl) return text; // If URL is not safe, return just the text
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
  // Unordered Lists
  s = s.replace(/^(?:-\s+.+\n?)+/gm, (block) => {
    // Split the block into individual lines and remove the leading "- "
    const items = block
      .trim()
      .split(/\n/)
      .map((line) => line.replace(/^-+\s*/, ""));
    // use map to wrap each item in <li> tags and join to combine them into a single string
    return "<ul>" + items.map((it) => "<li>" + it + "</li>").join("") + "</ul>";
  });

  previewOut.innerHTML = s;
}

//Use timeouts to implement debouncing.
//Update the preview only after half a second (i.e., 500ms)

postForm.addEventListener("input", () => {
  clearNoteId();
  clearTimeout(timer);
  timer = setTimeout(() => {
    //console.log(input.value);
    markdownStyle(input.value);
  }, 500);
});

async function saveMarkdown() {
  const content = input?.value ?? "";
  const status = document.getElementById("save-status");
  try {
    const response = await fetch("/async/save.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
      credentials: "same-origin",
    });
    const data = await response.json();
    if (!response.ok || data.error) {
      if (status) {
        status.textContent = data.error || "Failed to save the content.";
      }
      return;
    } else if (response.ok) {
      setNoteId(data.success.id);
      if (status) {
        console.log(data.success);
        status.textContent = "Saved! Shareable ID: " + data.success.id;
        setNoteId(data.success.id);
      }
    }
  } catch (err) {
    console.error(err);
    if (status) {
      status.textContent = "An error occurred while saving.";
    }
  }
}

async function loadLatest() {
  try {
    const response = await fetch("/async/latest.php", {
      method: "GET",
      credentials: "same-origin",
    });
    if (!response.ok) {
      console.error("Failed to fetch the latest content.");
      return;
    }
    const data = await response.json();
    if (data.success) {
      const content = data.content || "";
      const elem = document.getElementById("in");
      elem.value = content;
      setNoteId(data.id);
    } else {
      console.error("Error in response data:", data.error || "Unknown error");
    }
  } catch (err) {
    console.error(err);
  }
}

async function viewDoc(id) {
  try {
    const response = await fetch(
      `/async/doc.php?id=${encodeURIComponent(id)}`,
      {
        method: "GET",
        credentials: "same-origin",
      }
    );
    if (!response.ok) {
      console.error("Failed to fetch the document.");
      return;
    }
    const data = await response.json();
    const elem = document.getElementById("in");
    if (data.success) {
      elem.value = data.content || "";
      elem.setAttribute("readonly", "");
      setNoteId(id);
    } else {
      elem.value = "Error loading document";
    }
  } catch (err) {
    console.error(err);
  }
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Shareable link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const docId = params.get("id");

  if (docId) {
    viewDoc(docId);
    return;
  }
});

const saveBtn = document.getElementById("save-btn");
if (saveBtn) {
  saveBtn.addEventListener("click", saveMarkdown);
}

const loadLatestBtn = document.getElementById("load-latest-btn");
if (loadLatestBtn) {
  loadLatestBtn.addEventListener("click", loadLatest);
}

const copyShareLinkBtn = document.getElementById("copy-share-link-btn");
copyShareLinkBtn.addEventListener("click", async () => {
  const id = window.AppState.currentDocId;
  if (id) {
    const shareableLink = `${
      window.location.origin
    }/doc.php?id=${encodeURIComponent(id)}`;
    await copyToClipboard(shareableLink);
  }
});
