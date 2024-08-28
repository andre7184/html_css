document.addEventListener("DOMContentLoaded", (event) => {
  loadPosts();
});

function toggleForm() {
  if (document.getElementById("postForm").style.display === "block") {
    document.getElementById("postForm").style.display = "none";
  } else {
    document.getElementById("postForm").style.display = "block";
  }
}

function addPost() {
  const username = document.getElementById("username").value;
  const category = document.getElementById("category").value;
  const postText = document.getElementById("postText").value;

  if (postText.trim() === "" || username.trim() === "") {
    alert("Por favor, insira um nome de usuário e um texto para a postagem.");
    return;
  }

  const post = {
    username: username,
    category: category,
    text: postText,
  };

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("postForm").reset();
  toggleForm();
  loadPosts();
}

function loadPosts() {
  const categories = ["please-wait", "botao-navbar", "menu-hamburguer"];

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  categories.forEach((category) => {
    const categoryPosts = posts.filter((post) => post.category === category);
    const title = document.getElementById(`${category}-title`);
    title.textContent = `${categoryPosts.length} postagem${
      categoryPosts.length !== 1 ? "s" : ""
    } de ${category.replace("-", " ")}`;

    const postContainer = document.getElementById(`${category}-posts`);
    postContainer.innerHTML = "";

    categoryPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      const user = document.createElement("strong");
      user.textContent = `${post.username}: `;
      postElement.appendChild(user);

      const text = document.createElement("p");
      text.textContent = post.text;
      postElement.appendChild(text);

      postContainer.appendChild(postElement);
    });
  });
}
