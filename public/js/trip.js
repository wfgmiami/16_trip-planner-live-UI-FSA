var tripModule = (function(){
  // application state
  var days = [],
      currentDay;

  var $addButton, $removeButton;
  $(function(){
    $addButton =  $('#day-add');
    $removeButton = $("#day-title > button.remove");

  })

  function switchTo(newCurrentDay){
    if(currentDay) currentDay.hide()
    currentDay = newCurrentDay;
    currentDay.show();
  }

  $(function(){
    $addButton.on('click', addDay);
    $removeButton.on('click', deleteCurrentDay);
  })

  function addDay(){
    var newDay = dayModule.create({number: days.length + 1 })
    days.push(newDay);
    if(days.length === 1) currentDay = newDay;

    switchTo(newDay);
  }

  function deleteCurrentDay(){
    if(days.length < 2 || !currentDay) return;
    var index = days.indexOf(currentDay);
    var removedDay = days.splice(index, 1)[0]
    var newCurrentDay = days[index] || days[index - 1];
    days.forEach(function(day,i){
      day.setNumber(i + 1);
    })
    switchTo(newCurrentDay);
    removedDay.hideButton()
  }

  var publicAPI = {
    load: function(){
      $(addDay);
    },
    switchTo: switchTo,
    addToCurrent: function(attraction){
      currentDay.addAttraction(attraction)
    },
    removeFromCurrent: function(attraction){
      currentDay.removeAttraction(attraction);
    }
  };

  return publicAPI;

}());
