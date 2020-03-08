import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseCommentNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const removeElement = li => {
  li.remove();
  decreaseCommentNumber();
};

const deleteComment = async (index, li) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/${index}`,
    method: "DELETE",
    data: {
      index: index
    }
  });
  if (response.status === 200) {
    removeElement(li);
  }
};

const handleDeleteClick = event => {
  const li = event.target.closest("li");
  const index = li.getAttribute("data-index");
  deleteComment(index, li);
};

const init = () => {
  var deleteBtnList = document.getElementsByClassName("comment__delete");
  for (var btn in deleteBtnList) {
    deleteBtnList[parseInt(btn)].addEventListener("click", handleDeleteClick);
  }
};

if (commentList) {
  init();
}
