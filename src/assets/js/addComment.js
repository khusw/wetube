import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const createComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const leftColumn = document.createElement("div");
  const rightColumn = document.createElement("div");
  const textBox = document.createElement("div");
  const iconBox = document.createElement("div");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const editIcon = document.createElement("i");
  const deleteIcon = document.createElement("i");
  const img = document.createElement("img");

  li.classList.add("comments");
  leftColumn.classList.add("comments__column");
  rightColumn.classList.add("comments__column");
  textBox.classList.add("comments__text-box");
  iconBox.classList.add("comments__icon");
  editBtn.classList.add("comment__edit");
  deleteBtn.classList.add("comment__delete");
  editIcon.classList.add("fas.fa-edit");
  deleteIcon.classList.add("fas.fa-trash-alt");

  li.appendChild(leftColumn);
  leftColumn.appendChild(img);

  li.appendChild(rightColumn);
  rightColumn.appendChild(textBox);
  textBox.appendChild(span);
  rightColumn.appendChild(iconBox);
  iconBox.appendChild(editBtn);
  editBtn.appendChild(editIcon);
  iconBox.appendChild(deleteBtn);
  deleteBtn.appendChild(deleteIcon);

  span.innerHTML = comment;
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    createComment(comment);
  }
};

const handleAddComment = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const init = () => {
  addCommentForm.addEventListener("submit", handleAddComment);
};

if (addCommentForm) {
  init();
}
