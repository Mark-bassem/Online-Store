document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("commentForm");
  const nameInput = document.getElementById("name");
  const commentInput = document.getElementById("commentText");
  const commentList = document.querySelector(".comment-list");
  const totalCommentsEl = document.getElementById("totalComments");
  const totalLikesEl = document.getElementById("totalLikes");
  const paginationEl = document.getElementById("pagination");

  let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  let likedComments = JSON.parse(localStorage.getItem("likedComments")) || [];

  const commentsPerPage = 5; // عدد التعليقات في الصفحة
  let currentPage = 1;

  function updateCounters() {
    totalCommentsEl.textContent = savedComments.length;
    const totalLikes = savedComments.reduce((sum, c) => sum + c.likes, 0);
    totalLikesEl.textContent = totalLikes;
  }

  function renderComments() {
    commentList.innerHTML = "";

    const start = (currentPage - 1) * commentsPerPage;
    const end = start + commentsPerPage;
    const visibleComments = savedComments.slice(start, end);

    visibleComments.forEach((comment, index) => {
      addCommentToDOM(
        comment.name,
        comment.text,
        comment.time,
        comment.likes,
        start + index
      );
    });

    renderPagination();
  }

  function renderPagination() {
    paginationEl.innerHTML = "";
    const totalPages = Math.ceil(savedComments.length / commentsPerPage);

    if (totalPages <= 1) return;

    // زر Previous
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "⏮ Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.classList.add("page-btn");
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderComments();
      }
    });
    paginationEl.appendChild(prevBtn);

    // أرقام الصفحات
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("page-btn");
      if (i === currentPage) btn.classList.add("active");

      btn.addEventListener("click", () => {
        currentPage = i;
        renderComments();
      });

      paginationEl.appendChild(btn);
    }

    // زر Next
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next ⏭";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.classList.add("page-btn");
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderComments();
      }
    });
    paginationEl.appendChild(nextBtn);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const text = commentInput.value.trim();
    const time = new Date().toLocaleString();

    if (name && text) {
      const newComment = { name, text, time, likes: 0 };
      savedComments.unshift(newComment);
      localStorage.setItem("comments", JSON.stringify(savedComments));

      currentPage = 1;
      renderComments();
      updateCounters();
      form.reset();
    }
  });

  function addCommentToDOM(name, text, time, likes = 0, index) {
    const commentItem = document.createElement("div");
    commentItem.classList.add("comment-item");

    const isLiked = likedComments.includes(index);

    commentItem.innerHTML = `
      <h4>${name}</h4>
      <p class="comment-text">${text}</p>
      <span class="comment-time">🕒 ${time}</span>
      <div class="comment-actions">
        <button class="like-btn ${isLiked ? "liked" : ""}">
          👍 Like (<span class="like-count">${likes}</span>)
        </button>
        <button class="edit-btn">✏️ Edit</button>
        <button class="delete-btn">❌ Delete</button>
      </div>
    `;

    const likeBtn = commentItem.querySelector(".like-btn");
    const likeCount = commentItem.querySelector(".like-count");

    likeBtn.addEventListener("click", () => {
      if (likedComments.includes(index)) {
        savedComments[index].likes--;
        likedComments = likedComments.filter((id) => id !== index);
        likeBtn.classList.remove("liked");
      } else {
        savedComments[index].likes++;
        likedComments.push(index);
        likeBtn.classList.add("liked");
      }

      localStorage.setItem("comments", JSON.stringify(savedComments));
      localStorage.setItem("likedComments", JSON.stringify(likedComments));
      likeCount.textContent = savedComments[index].likes;
      updateCounters();
    });

    commentItem.querySelector(".delete-btn").addEventListener("click", () => {
      savedComments.splice(index, 1);
      localStorage.setItem("comments", JSON.stringify(savedComments));

      if (currentPage > Math.ceil(savedComments.length / commentsPerPage)) {
        currentPage--;
      }
      renderComments();
      updateCounters();
    });

    commentItem.querySelector(".edit-btn").addEventListener("click", () => {
      const p = commentItem.querySelector(".comment-text");
      const oldText = p.textContent;

      const textarea = document.createElement("textarea");
      textarea.value = oldText;
      textarea.classList.add("edit-area");

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "💾 Save";
      saveBtn.classList.add("save-btn");

      p.replaceWith(textarea);
      commentItem.querySelector(".edit-btn").style.display = "none";
      commentItem.querySelector(".delete-btn").style.display = "none";
      likeBtn.style.display = "none";
      commentItem.querySelector(".comment-actions").prepend(saveBtn);

      saveBtn.addEventListener("click", () => {
        const newText = textarea.value.trim();
        if (newText) {
          savedComments[index].text = newText;
          localStorage.setItem("comments", JSON.stringify(savedComments));

          const newP = document.createElement("p");
          newP.classList.add("comment-text");
          newP.textContent = newText;

          textarea.replaceWith(newP);
          saveBtn.remove();
          commentItem.querySelector(".edit-btn").style.display = "inline-block";
          commentItem.querySelector(".delete-btn").style.display =
            "inline-block";
          likeBtn.style.display = "inline-block";
        }
      });
    });

    commentList.appendChild(commentItem);
  }

  renderComments();
  updateCounters();
});