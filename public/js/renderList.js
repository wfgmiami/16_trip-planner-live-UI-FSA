function renderList(dayNum, category){

  var matches = [];
  var dayData = state.days[dayNum]

  if(category){
    var dayArray = dayData[category];
    var categories = Object.keys(dayData);
    dayArray.forEach(id => {
      matches.push(window[category].filter( item =>{
          return item.id == id;
      })[0]);

    })
    showCategoryPlaces(category,matches,dayNum)
  }else{
    if(Object.keys(dayData).length){
      var categories = Object.keys(dayData);
      categories.forEach( category => {
        if(dayData[category].length){
          dayData[category].forEach( id => {
            matches.push(window[category].filter(place => place.id === id)[0])
          })
        }
        showCategoryPlaces(category,matches,dayNum)
        matches = []
      })
    }
  }

}
