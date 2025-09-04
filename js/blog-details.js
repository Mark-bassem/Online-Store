document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    document.getElementById("blogDetails").innerHTML =
      "<p>❌ Post not found.</p>";
    return;
  }

  fetch("blog.json")
    .then((res) => res.json())
    .then((data) => {
      const post = data.find((p) => p.id == postId);

      if (!post) {
        document.getElementById("blogDetails").innerHTML =
          "<p>❌ Post not found.</p>";
        return;
      }

      document.getElementById("blogDetails").innerHTML = `
            <div class="blog-details">
              <img src="${post.image}" alt="${post.title}" class="details-img">
              <h1>${post.title}</h1>
              <p class="meta">By ${post.author} | ${new Date(
        post.date
      ).toLocaleDateString()}</p>
              <div class="blog-body">${post.content}</div>
            </div>
          `;
    })
    .catch((err) => {
      console.error("Error loading blog post:", err);
      document.getElementById("blogDetails").innerHTML =
        "<p>⚠️ Failed to load post.</p>";
    });
});