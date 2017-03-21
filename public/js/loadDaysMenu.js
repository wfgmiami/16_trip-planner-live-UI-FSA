function loadDaysMenu(dayNumber){
  var container = $('.day-buttons');

  var currentDay = $('.current-day', container).html() * 1 - 1 || 0;
  if(currentDay > state.days.length - 1)
    --currentDay;
  container.empty();

  for(var i = 0; i < dayNumber + 1; i++){
    if (i === currentDay){
      var daysButton = $(`<button class="btn btn-circle day-btn current-day">${i + 1}</button>`);
    }else{
       var daysButton = $(`<button class="btn btn-circle day-btn">${i + 1}</button>`);
    }
    daysButton.on('click', function(){
        $('.day-buttons .current-day').removeClass("current-day")
        onSelectDay($(this));
    })

    container.append(daysButton)
  }

  var addDay = $('<button class="btn btn-circle day-btn" id="day-add">+</button>');
  addDay.on('click', function(){
      onAddDay(dayNumber+1)
  })
  container.append(addDay)

 onDayHeaderChange(currentDay)

}
