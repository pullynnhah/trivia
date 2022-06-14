function renderFormAmountHTML(start, end) {
  let options = "";
  for (let i = start; i <= end; i++) {
    if (i === 10) {
      options += `<option selected="selected">${i}</option>`;
    } else {
      options += `<option>${i}</option>`;
    }
  }
  console.log(options);
  amount.innerHTML = options;
}

function renderFormCategoryHTML() {
  const promise = axios.get("https://opentdb.com/api_category.php");
  promise.then(response => {
    const categories = response.data["trivia_categories"];
    let options = '<option value="" selected="selected">Any Category</option>';
    for (const category of categories) {
      options += `<option value="${category.id}">${category.name}</option>`;
    }
    category.innerHTML = options;
  });
}

function submitForm(event) {
  event.preventDefault();
  // TODO: inplement object from form results
}


function loadForm() {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
  }
  renderFormAmountHTML(1, 50);
  renderFormCategoryHTML();
}


const form = document.querySelector('form');
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
const difficulty = document.querySelector("#difficulty");
const type = document.querySelector("#type");
const submitBtn = document.querySelector("button");


submitBtn.addEventListener("click", submitForm);

loadForm();
