This application allow users to take questions in a dataset and review the ones they have already answered.

The applications can be loaded at index.html. We first take in the CSV file which contains the questions, answer options and the correct answer.
I have used d3's csv method to read the csv file. The data from the csv file is stored as an object in the 'questions' variable.
This is then used to extract the questions and store the answers.

There are two other webpages in this application. quizQuestions.html is the page where the questions and the options are rendered.
In the other page, reviewAnswers.html, the user can review the answers that she has given.

The style sheets - quiz_style.css and style.css are used to style the quizQuestions.html, reviewAnswers.html and index.html respectively.

Javascript and JQuery is used for data handling. question_answers.js does the rendering for quizQuestions.html
while review_answers.js does the rendering for reviewAnswers.html
They also keep a track of the previous answers, that is used in the review page.
