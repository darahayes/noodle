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
      template_meta: {
        type: "template1_seminar",
        panel_hover_css: "rl_hover_straw",
        submission_container_css: "rl_rcorners15 rl_brd_clr_green rl_brd_solid rl_box_shadow1",
        attendee_edit_hover_css: "rl_hover_lime",
        description: "Seminar: 1:N,i.e. One offering, 1+ attendees, used when offering is full session\/day and no second or more offerings for the attendee"
      },
      overview: {
        model_type: 'Seminar',
        available: true,
        active: true,
        meta: {
          visible: true,
          css: "b_solid rl_bkg_color_green rl_rcorners25",
          style: "font-size:1em"
        },
        data: [
          {
            visible: true,
            text: "",
            css: "rl_text_color_black    text-center rl_font_2_5  ",
            style: ""
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
          columns: 1,
          columnCss: " b_solid rl_bkg_color_blue1 rl_rcorners25",
          columnStyle: "padding-bottom:10px;  ",
          itemCss:  " rl_rcorners15 rl_brd_clr_black rl_brd_solid rl_box_shadow1 rl_margin_top_10",
          itemStyle: "border-width: 3px; rl_font_1_5 rl_padding_left_15"
        },
        data: [
          
        ]
      },
      organisation: {
        meta: {
          ui_text_to_display: '',
          sectorNo_text: '',
          enabled: false,
          template: 'organisation_minimum',
          allowChooser: true,
          allowCountyFilter: true
        }
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