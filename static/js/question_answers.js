(function (global) {
d3.csv("Question Set.csv", function(questions) {
    //var questionCounter = global.localStorage.getItem("sharedCounter"); // Check the question number
    var questionCounter = 0; // Check the question number
    var selections = []; // Array storing the answers
    var quiz = $('#quiz'); // Getting the quiz div element
    var answers = $('#answers');

    // Display initial question
    moveToNextQuestion();

    // Moving to the next question
    $('#next').on('click', function (e) {
        e.preventDefault();
        // Suspend click listener during fade animation
        if(quiz.is(':animated')) {
            return false;
        }
        choose();

        // If no user selection, progress is stopped
        if (isNaN($('input[name="answer"]:checked').val())) {
            alert('Please select an answer!');
        } else {
            questionCounter++;
            moveToNextQuestion();
        }

    });

    // Move to the previous question
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        moveToNextQuestion();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }

        questionCounter = 0;
        selections = [];
        moveToNextQuestion();
        $('#start').hide();
    });

    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var reviewElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }


    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        var choices = [questions[index].answer_1, questions[index].answer_2, questions[index].answer_3,
                        questions[index].answer_4, questions[index].answer_5];
        for (var i = 0; i < choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        if($('input[name="answer"]:checked').val() == 0)
            selections[questionCounter] = 'A';
        else if($('input[name="answer"]:checked').val() == 1)
            selections[questionCounter] = 'B';
        else if($('input[name="answer"]:checked').val() == 2)
            selections[questionCounter] = 'C';
        else if($('input[name="answer"]:checked').val() == 3)
            selections[questionCounter] = 'D';
        else if($('input[name="answer"]:checked').val() == 4)
            selections[questionCounter] = 'E';
    }

    // Displays next requested element
    function moveToNextQuestion() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if(questionCounter < questions.length){
                var nextQuestion = createQuestionElement(questionCounter);

                global.localStorage.setItem("sharedSelection", selections);
                global.localStorage.setItem("sharedCounter", questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (isNaN($('input[name="answer"]:checked').val())) {
                    $('input[value='+selections[questionCounter]+']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if(questionCounter === 1){
                    $('#prev').show();
                } else if(questionCounter === 0){

                    $('#prev').hide();
                    $('#next').show();
                }
            }
            else {
                global.localStorage.setItem("sharedSelection", selections);
                global.localStorage.setItem("sharedCounter", questionCounter);
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        var score = $('<p>',{id: 'question'});

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctval) {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' + questions.length + ' right!');
        return score;
    }

});
}(window));