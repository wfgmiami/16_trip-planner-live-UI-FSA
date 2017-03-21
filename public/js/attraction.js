
var attractionModule = (function(){

  var $itinerary, $hotel, $restaurants, $activities;

  $(function(){
    $itinerary = $('#itinerary');
    $hotel = $itinerary.find('ul[data-type="hotel"]');
    $restaurants = $itinerary.find('ul[data-type="restaurant"]')
    $activities = $itinerary.find('ul[data-type="activity"]')
  })

  function Attraction(data){
    utilsModule.merge(data,this);
    this.buildItineraryItem().buildMarker();
  }

  Attraction.prototype.buildItineraryItem = function(){

    var $title = $('<span class="title"></span>').text(this.name)
    var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>')

    this.$itineraryItem = $('<div class="itinerary-item"></div>')
    .append($title)
    .append($button);

    //this.itineraryItem = $itineraryItem

    var self = this;
    $button.on('click', function(){
      self.hide();
    });
    return this;
  }

  Attraction.prototype.buildMarker = function(){
    this.marker = mapModule.buildAttractionMarker(this)
    return this;
  }

  Attraction.prototype.show = function(){

    switch(this.type){
      case 'hotel': $hotel.append(this.$itineraryItem); break;
      case 'restaurant': $restaurants.append(this.$itineraryItem); break;
      case 'activity': $activities.append(this.$itineraryItem); break;
      default: console.error('bad type:',this)
    }
    mapModule.drawMarker(this.marker);
  }

  Attraction.prototype.hide = function(){
    this.itineraryItem.detach();
    mapModule.hideMarker(this.marker);
  }

  var publicAPI = {
    create: function(databaseAttraction){
      return new Attraction(databaseAttraction);
    }
  };

  return publicAPI;

}());

