angular.module('app.controllers', ['app.EventServiceModule', 'ngStorage'])

.controller('app_control', function($scope) {
  $scope.title = 'Noodle';
})

.controller('events_control', function($scope, eventService, $localStorage) {
  $scope.events = [];
  
  eventService.get(function(err, events) {
    console.log(events)
    $scope.events = events || $localStorage.events;
  });

  $scope.untitled = 'Untitled Event';

  $scope.removeEvent = function(index) {
    console.log('Remove index', index);
    eventService.remove($scope.events[index], function(err) {
      if (!err) {
        Materialize.toast('Event Deleted', 2000)
        $scope.events.splice(index, 1);
        // $scope.events = $localStorage.events
      } else {
        Materialize.toast('Oops! Something went wrong.', 2000)
      }
    })
  }

  //Fancy function to get time since modification
  $scope.timeSince = function(date) {

      var seconds = Math.floor((new Date() - new Date(date)) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
  }

})

.controller('new_event_control', function($scope, eventService, $state, event, index) {

  console.log('Input Event');
  if (event) {
    $scope.title = 'Update Event';
    $scope.event = event
  }
  else {
    $scope.title = 'New Event';
    $scope.event = eventService.getBlankEvent()
  }

  $scope.addOverviewDetail = function($event) {
    var text = angular.element('#detail_input').val();
    var detail = {
      visible: true,
      text: text,
      css: "rl_text_color_black    text-center rl_font_2_5  ",
      style: ""
    };
    $scope.event.overview.data.push(detail);
  }

  $scope.addPosition = function($event) {
    var text = angular.element('#position_input').val();
    var position = {
      id: $scope.event.attendees_meta.positions.length,
      name: text
    };
    $scope.event.attendees_meta.positions.push(position);
  }

  $scope.saveEvent = function() {
    $scope.event.name = $scope.event.overview.data[0].text
    $scope.event.nameLowercase = String.toLowerCase($scope.event.name);
    eventService.save($scope.event, function(err, event) {
    if (err) { 
    /*Toast*/ 
    }
    else {
      console.log('event saved')
      $scope.event = event;
      Materialize.toast('Event Saved', 2000);
    }

    });
  }

  $scope.deleteEvent = function() {
    console.log('delete event called');
    if ($scope.event.id) {
      eventService.remove($scope.event, function(err) {
        if (err) {
          Materialize.toast('Oops! Something went wrong', 2000);
        }
        else {
          Materialize.toast('Event Deleted', 2000);
        }
        $state.go('app.events');
      });
    } else {
      $state.go('app.events');
    }
  }

  //reload the damn date picker when a new event offering is added innit
  $scope.$on('onRepeatLast', function(scope, element, attrs){
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15,
        container: 'body' // Creates a dropdown of 15 years to control year
      });
  });

  $scope.add_offering = function() {
    var offering = {
      visible: true,
      lines: [
        {
          text: '',
          'css': 'rl_padding_left_15 rl_font_1_5'
        },
        {
          text: '',
          css: 'rl_padding_left_15 rl_font_1_2'
        }
      ]
    }
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