var bookMarkInput = document.getElementById("BookmarkName");
var bookMarkURLInput = document.getElementById("BookmarkURL");
var urlPattern = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
var regex = /^[A-Za-z]{3,}$/;
const inputElement = document.getElementById('inpu');
var lists = [];
if (localStorage.getItem("Data") != null) {
  lists = JSON.parse(localStorage.getItem("Data"))
  display()
}
var modal = document.querySelector("#modal");



function add() {
  var content = {
    Websitename: bookMarkInput.value,
    URLPath: bookMarkURLInput.value,

  }
  if (bookMarkInput.value == "" || bookMarkURLInput.value == "" || !urlPattern.test(bookMarkURLInput.value) || !regex.test(bookMarkInput.value)) {
    modal.style.display = "block"
    return;
  }

  lists.push(content)
  localStorage.setItem("Data", JSON.stringify(lists))
  clearInput()
  display()

}

function display() {
  var temp = " "
  for (var i = 0; i < lists.length; i++) {
    temp += ` <tbody>
<th>${i + 1}</th>
<th>${lists[i].Websitename}</th>
<td><button class="btn btn-success">
 <a href="${lists[i].URLPath}"> <i class="fa-solid fa-eye pe-2"></i>Visit</a>

</button></td>
<td><button onclick = deleterow(`+ i + `) class="btn btn-danger">
 <i class="fa-solid fa-trash-can"></i>
delete
</button></td>
</tbody>
`



  }
  document.getElementById("dataTable").innerHTML = temp;
}

closeElement.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none"
}

function deleterow(x) {
  lists.splice(x, 1)
  localStorage.setItem("Data", JSON.stringify(lists))
  display();
}

function clearInput() {
  bookMarkInput.value = "";
  bookMarkURLInput.value = "";
}

inputElement.addEventListener('input', function () {

  if (inputElement.value.trim() !== "") {
    inputElement.classList.add('highlight');
  } else {

    inputElement.classList.remove('highlight');
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});