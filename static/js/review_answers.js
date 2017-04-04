(function (global) {

    var questionCounter = global.localStorage.getItem("sharedCounter"); // Check the question number
    var selections = []; // Array storing the answers
    var quiz = $('#answers'); // Getting the quiz div element

    moveToNextQuestion();

    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });
    var reviewElement = $('<div>', {
            id: 'review'
        });
    var currentAnswers;
    // Creates and returns the div that contains the questions and the answer selections
    function createReviewElement() {
        console.log(global.localStorage.getItem("sharedSelection")[questionCounter]);
        var i = 0;
        for(questionNo = 0; questionNo <= questionCounter; questionNo++) {
            currentAnswers = $('<p>').append(questionNo+1, " : ",
                                global.localStorage.getItem("sharedSelection")[i]);
            reviewElement.append(currentAnswers);
            i += 2;
        }

        return reviewElement;
    }

    // Displays next requested element
    function moveToNextQuestion() {
        quiz.fadeOut(function() {
            // $('#question').remove();

            //if(questionCounter < questions.length){
                var nextQuestion = createReviewElement();
                quiz.append(nextQuestion).fadeIn();
                if (!(selections[questionCounter] < 'A' || selections[questionCounter] > 'E')) {
                    $('input[value='+selections[questionCounter]+']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if(questionCounter === 1){
                    $('#prev').show();
                } else if(questionCounter === 0){

                    $('#prev').hide();
                    $('#next').show();
                }
            //}
            // else {
            //     var scoreElem = displayScore();
            //     quiz.append(scoreElem).fadeIn();
            //     $('#next').hide();
            //     $('#prev').hide();
            //     $('#start').show();
            // }
        });
    }


}(window));