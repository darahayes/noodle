angular.module('app.EventServiceModule', ['ngStorage'])

.factory('eventService', function($http, $localStorage) {
  
  console.log('Events Service init')
  if (!$localStorage.events) {
    console.log('Creating events object')
    $localStorage.events = []
  }

  function get(cb) {
    $http.get('/api/events')
    .then(function success(response, status, headers) {
      if (response.data) {
        console.log('response', response.data)
        $localStorage.events = response.data;
        cb(null, response.data);
      }
    }, function error(err) {
      console.log(err);
      cb(null);
    });
  }

  function save(event, cb) {
    var method = (event.id) ? 'put' : 'post';
    console.log('METHOD', method)
    $http[method]('/api/events', event)
    .then(function success(response, status, headers) {
      if (response.data) {
        console.log('response', response.data)
        cb(null, response.data)
      }
    }, function error(err) {
      console.log(err);
      cb(err);
    });
  }

  function remove(event, cb) {
    $http.delete('/api/events', {params: {id: event.id}})
    .then(function success(response, status, headers) {
      if (response.data) {
        console.log('response', response.data)
        cb(null)
      }
    }, function error(err) {
      console.log("ERROR", err);
      cb(err);
    });
  }

  var getBlankEvent = function() {
    console.log('Get Blank Event Called')
    return {
      overview: {
        model_type: 'Seminar',
        available: true,
        active: true,
        meta: {
          "visible": true,
          "css": "b_solid rl_bkg_color_green rl_rcorners25",
          "style": "font-size:1em"
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
          visible: false,
        },
        data: [
          
        ]
      }
    }
  }
  
  return {
    get: get,
    save: save,
    remove: remove,
    events: $localStorage.events,
    getBlankEvent: getBlankEvent
  };
})