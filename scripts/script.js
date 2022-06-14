function renderFormAmountHTML(start, end) {
  let options = "";
  for (let i = start; i <= end; i++) {
    if (i === 10) {
      options += `<option selected="selected">${i}</option>`;
    } else {
      options += `<option>${i}</option>`;
    }
  }
  amount.innerHTML = options;
}

function renderFormCategoryHTML() {
  const promise = axios.get(`${OPEN_TDB_URL}/api_category.php`);
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
  getParams();
  generateQuiz();
}

function getParams() {
  const amountValue = amount.value;
  const categoryValue = category.value;
  const difficultyValue = difficulty.value;
  const typeValue = type.value;

  params = {};
  params.amount = amountValue;

  if (categoryValue !== "") {
    params.category = categoryValue;
  }

  if (difficultyValue !== "") {
    params.difficulty = difficultyValue;
  }

  if (typeValue !== "") {
    params.type = typeValue;
  }
}

function generateQuiz() {
  const promise = axios.get(`${OPEN_TDB_URL}/api.php`, {params: params});
  promise.then(response => {
    quizes = response.data.results;
    sizeQuizes = quizes.length;
    loadQuizes();
  });
}

function loadForm() {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
  }
  
  section.classList.add('hidden');
  renderFormAmountHTML(1, 50);
  renderFormCategoryHTML();
}

function loadQuizes() {
  form.classList.add('hidden');
  if (section.classList.contains('hidden')) {
    section.classList.remove('hidden');
  }

  let quizesHTML = '';
  for (const quiz of quizes) {
    quizesHTML += quizHTML(quiz);
  }
  
  section.innerHTML = quizesHTML;
  section.innerHTML += '<button onclick="getResults()">Get Results</button>'
}

function quizHTML(quiz) {
  const options = [];
  options.push(`<p class="correct">${quiz.correct_answer}</p>`);
  for (const incorrectAnswer of quiz.incorrect_answers) {
    options.push(`<p>${incorrectAnswer}</p>`)
  }
  
  options.sort(() => Math.random() - 0.5);
  console.log(options.join('\n'));
  return `
    <article>
      <h3>${quiz.question}</h3>
      <div>${options.join('')}</div>
    </article>`
}

// function loadGame
const OPEN_TDB_URL = "https://opentdb.com";

const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
const difficulty = document.querySelector("#difficulty");
const type = document.querySelector("#type");
const submitBtn = document.querySelector("button");
const section = document.querySelector('section');

let params = null;
let quizes = null;
let sizeQuizes = null;
submitBtn.addEventListener("click", submitForm);

loadForm();
