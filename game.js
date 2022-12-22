const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const choicePrefix = document.querySelector('.choice-prefix');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
  question: 'A Leishmaniose Visceral(Calazar) e Tegumentar(Cutânea) é transmitida pelo mosquito-palha, o que pode contribuir para a doença proliferar?',
  choice1: 'Acúmulo de Lixo',
  choice2: 'Ambientes Higienizados',
  choice3: 'Outras pessoas infectadas',
  choice4: 'Locais com muita água parada',
  answer: 1,
},
{
  question: 'A Leishmaniose Visceral(Calazar) é uma doença que pode ser fatal se não tratada precocemente. Quais os orgãos internos mais afetados pela doença?',
  choice1: 'Coração, pulmão e estômago',
  choice2: 'Fígado, baço e intestinos',
  choice3: 'Fígado, coração e intestinos',
  choice4: 'Fígado, baço e medula óssea',
  answer: 4,
},
{
  question: 'Por quanto tempo pode durar a Leishmaniose Visceral(Calazar)?',
  choice1: 'Mais de um ano',
  choice2: 'Alguns dias apenas',
  choice3: 'Pode durar alguns meses ou até passar de 1 ano',
  choice4: 'Pode durar alguns meses somente ',
  answer: 3,
},
{
  question: 'A Leishmaniose Visceral(Calazar) é mais frequente em quais perfis?',
  choice1: 'Recém-nascidos',
  choice2: 'Adultos',
  choice3: 'Idosos',
  choice4: 'Crianças de até 10 anos',
  answer: 4,
},
{
  question: 'Porque cachorros são considerados um vetor da Leishmaniose Visceral(Calazar) e Tegumentar(Cutânea)?',
  choice1: 'Porque os cachorros podem ser picados pelo mosquito palha e assim serem hospedeiros da doença',
  choice2: 'Porque os cachorros ficam muito expostos a ambientes secos',
  choice3: 'Porque os cachorros transmitem diretamente a doença',
  choice4: 'Na verdade somente os cachorros de rua transmitem a doença',
  answer: 1,
},
{
  question: 'Quais os sintomas da Leishmaniose Tegumentar(Cutânea)?',
  choice1: 'Não tem sintomas aparentes',
  choice2: 'Úlceras na pele e nas mucosas das vias aéreas superiores',
  choice3: 'Dores no corpo, febre e orgãos internos atingidos',
  choice4: 'Feridas na pele e também órgãos internos atingidos',
  answer: 2,
},
{
  question: 'Porque cachorros são considerados um vetor da Leishmaniose Visceral(Calazar) e Tegumentar(Cutânea)?',
  choice1: '1',
  choice2: '2 ',
  choice3: '3',
  choice4: '4',
  answer: 1,
},
{
  question: 'Porque cachorros são considerados um vetor da Leishmaniose Visceral(Calazar) e Tegumentar(Cutânea)?',
  choice1: '1',
  choice2: '2',
  choice3: '3',
  choice4: '4',
  answer: 1,
},
{
  question: 'Porque cachorros são considerados um vetor da Leishmaniose Visceral(Calazar) e Tegumentar(Cutânea)?',
  choice1: '1',
  choice2: '2',
  choice3: '3',
  choice4: '4',
  answer: 1,
},
{
  question: 'Porque cachorros são considerados um vetor da Leishmaniose Visceral(Calazar) e Tegumentar(Cutânea)?',
  choice1: '1',
  choice2: '2',
  choice3: '3',
  choice4: '4',
  answer: 1,
}
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length ===0 || questionCounter > MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('end.html')
  }

  questionCounter++
  progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex,1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return
    
    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.previousElementSibling.classList.add(classToApply);
    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply)
      selectedChoice.previousElementSibling.classList.remove(classToApply);
      getNewQuestion()

    }, 1000);
  })
})

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}

startGame()