function loadDropDowns(){
  state.places.forEach(function(place){
    var container = $(`#${place}`);
    var dataArray = getArray(place);
    var lis = dataArray.map(function(place){
      return `<option>${place.name}</option>`
    })
    container.append(`<select id='${place}'>${lis}</select>`);
  })

  $('#options-panel').on('click', 'button', function(){

    var div = $(this).parents('div');
    var category = div.attr('id')
    var placeName = $(`select#${category}`).val();
    var dataArray = getArray(category);
    var placeId = dataArray.filter( place => place.name === placeName)[0].id;
    var dayNum = $('.day-buttons .current-day').html()*1 - 1;
    onAddOnePlace(dayNum,category, placeId*1)
  });
}
