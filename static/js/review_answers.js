(function (global) {
    var questionCounter = global.localStorage.getItem("sharedCounter"); // Check the question number
    var answers = $('#answers'); // Getting the answers div element

    displayReviewPage();

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
        var i = 0;
        for(questionNo = 0; questionNo < questionCounter; questionNo++) {
            currentAnswers = $('<p>').append(questionNo+1, " : ",
                                global.localStorage.getItem("sharedSelection")[i]);
            reviewElement.append(currentAnswers);
            i += 2;
        }
        return reviewElement;
    }

    // Displays next requested element
    function displayReviewPage() {
        answers.fadeOut(function() {
            var reviewData = createReviewElement();
            answers.append(reviewData).fadeIn();
        });
    }
}(window));