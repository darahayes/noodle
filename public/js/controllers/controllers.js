angular.module('app.controllers', [])

.controller('app_control', function($scope) {
  $scope.title = 'Noodle';
})

.controller('events_control', function($scope) {
  $scope.items = ["A", "List", "Of", "Events"];
})

.controller('new_event_control', function($scope) {

  $scope.event = {
    overview: {
      meta: {

      },
      data: [
        {
          "visible": true,
          "text": "",
          "css": "rl_text_color_black    text-center rl_font_2_5  ",
          "style": ""
        }
      ]
    },
    attendees_meta: {
      maxNo: 10,
      request_lunch: true,
      request_position: true,
      positions: [
      ]
    },
    offerings: {
      meta: {
        visible: true
      },
      data: [
      {}
      ]
    }
  }

  //reload the damn date picker when a new event offering is added innit
  $scope.$on('onRepeatLast', function(scope, element, attrs){
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });
  });

  $scope.add_offering = function() {
    var offering = {}
    $scope.event.offerings.data.push(offering)
  }
})

.directive('onLastRepeat', function() {
  return function(scope, element, attrs) {
    if (scope.$last) setTimeout(function(){
      scope.$emit('onRepeatLast', element, attrs);
    }, 1);
  };
})