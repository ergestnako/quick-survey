angular.module('quick-survey').directive('addQuestion', function () {
  return {
    restrict: 'A',
    scope: {
      // TODO: figure out a way to not pass survey through here, just
      // the save() method on survey as well as just the questions
      // array.
      survey: '=',
      questionTypes: '=',
    },
    controller: function ($scope) {

      $scope.question = {
        'required': false,
        'type': $scope.questionTypes[0].type
      };

      $scope.addQuestion = function(question) {
        $scope.survey.questions.push(question);
        Surveys.update($scope.survey._id,
          { $set: {
              questions: angular.copy($scope.survey.questions)
          } }, function(err) {
            if (err) console.log('error', err);

            $scope.$apply(function() {
              $scope.question = {
                'required': false,
                'type': $scope.questionTypes[0].type
              };
              $scope.showAddQuestionForm = false;
            })

          })
      };
    },
    templateUrl: 'client/js/manage/directives/add-question.ng.html',
  };
});
