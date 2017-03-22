var attractionsModule = (function (){

// private! not global!

  var enhanced = {
    hotels: hotels.map(attractionModule.create),
    restaurants: restaurants.map(attractionModule.create),
    activities: activities.map(attractionModule.create)
  }

  function findById(array, id){
    return array.find(function(el){
      return el.id === id*1
    })
  }

// returned and assigned to global var! Shared!
  var publicAPI = {
    getByTypeAndId: function(type,id){
      if(type === 'hotel'){
        return findById(enhanced.hotels, id)
      }else if(type === 'restaurant'){
        return findById(enhanced.restaurants, id)
      }else if(type === 'activity'){
        return findById(enhanced.activities, id)
      }else{
        throw Error('unknown attraction type')
      }
    },
    getEnhanced: function(databaseAttraction){
      var type = databaseAttraction.type;
      var id = databaseAttraction.id;
      var found = publicAPI.getByTypeAndId(type,id);
      if (found) return found;
      throw Error('enhanced version not found', databaseAttraction);
    }
  }
  return publicAPI;

}());

// Revealing Module Pattern:
// Invoking function right away
// Only thing on the global scope is the attractionsModule
// 1.wrapping with function, 2.wrapping the function itself
// Without 1 and 2 there is global acces to enhanced,findById
// and getByTypeAndId

