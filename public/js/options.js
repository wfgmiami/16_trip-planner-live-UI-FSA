$(function(){
  var $optionsPanel = $('#options-panel');
  var $hotelSelect = $optionsPanel.find('#hotel-choices');
  var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
  var $activitySelect = $optionsPanel.find('#activity-choices');

hotels.forEach(makeOption, $hotelSelect);
restaurants.forEach(makeOption, $restaurantSelect);
activities.forEach(makeOption, $activitySelect);

function makeOption(databaseAttraction, i){
  var option = $('<option></option>')
  .text(databaseAttraction.name)
  .val(i+1);
  this.append(option)
}

$optionsPanel.on('click', 'button[data-action="add"]', function(){
  var $select = $(this).siblings('select');
  var id = $select.val();
  var type = $select.data('type');
  var name = $select.find(':selected').text();
  var attraction = attractionsModule.getByTypeAndId(type,id)
  tripModule.addToCurrent(attraction)
})


})

