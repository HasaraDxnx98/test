const questions = [
  { q: 'What is 2 + 2?', choices: ['3','4','5','6'], answer: 1 },
  { q: 'Capital of France?', choices: ['Berlin','Madrid','Paris','Rome'], answer: 2 },
  { q: 'Which of these is a JavaScript data type?', choices: ['String','Elephant','Car','Banana'], answer: 0 },
  { q: 'What color is the sky on a clear day?', choices: ['Green','Blue','Red','Yellow'], answer: 1 },
  { q: 'HTML stands for?', choices: ['Hyper Text Markup Language','Home Tool Markup Language','Hyperlinks and Text Markup Language','None of the above'], answer: 0 }
];

let current = 0;
let score = 0;
let selected = null;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const resultEl = document.getElementById('result');
const quizEl = document.getElementById('quiz');
const resultText = document.getElementById('resultText');
const scoreText = document.getElementById('scoreText');
const restartBtn = document.getElementById('restartBtn');

function renderQuestion(){
  const item = questions[current];
  questionEl.textContent = `Question ${current+1}: ${item.q}`;
  choicesEl.innerHTML = '';
  item.choices.forEach((c,i)=>{
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = c;
    btn.addEventListener('click', ()=> selectChoice(i, btn));
    choicesEl.appendChild(btn);
  });
  selected = null;
  nextBtn.disabled = true;
  nextBtn.textContent = current === questions.length - 1 ? 'Finish' : 'Next';
}

function selectChoice(i, btn){
  selected = i;
  document.querySelectorAll('.choice').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', ()=>{
  if(selected === null) return;
  if(selected === questions[current].answer) score++;
  current++;
  if(current < questions.length){
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult(){
  quizEl.classList.add('hidden');
  resultEl.classList.remove('hidden');
  const pass = score >= 3; // pass threshold
  resultText.textContent = pass ? 'You win!' : 'You lose!';
  scoreText.textContent = `Score: ${score} / ${questions.length}`;
}

restartBtn.addEventListener('click', ()=>{
  current = 0; score = 0; selected = null;
  resultEl.classList.add('hidden');
  quizEl.classList.remove('hidden');
  renderQuestion();
});

// initial render
renderQuestion();
