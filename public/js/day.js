var dayModule = (function(){

  var $dayButtons, $dayTitle;

  $(function(){
    $dayButtons = $('.day-buttons');
    $dayTitle = $('#day-title > span')
  })

  function Day(data){
    this.number = data.number;
    this.hotel;
    this.restaurants =[];
    this.activities = [];
    utilsModule.merge(data,this);

    if(this.hotel) this.hotel = attractionsModule.getEnhanced(this.hotel);
    //this.buildButton().showButton();   <---- with require 'return this' in buildButton
    this.buildButton()
    this.showButton()

  }

  Day.prototype.setNumber = function (num){
    this.number = num;
    this.$button.text(num);
  }

  Day.prototype.buildButton = function() {
    this.$button = $('<button class="btn btn-circle day-btn"></button>')
    .text(this.number);
    //return this;
    var self = this;
    this.$button.on('click', function(){
      tripModule.switchTo(self)
    })
    //return this
  }

  Day.prototype.showButton = function(){
    $dayButtons.append(this.$button)
  }

  Day.prototype.hideButton = function(){
    this.$button.detach();
  }

  Day.prototype.show = function(){
    this.$button.addClass('current-day');
    $dayTitle.text('Day ' + this.number);

    function show(attr) { attr.show() };
    if(this.hotel) this.hotel.show();
    this.restaurants.forEach(show);
    this.activities.forEach(show);
  }

  Day.prototype.hide = function(){
    this.$button.removeClass('current-day');
    $dayTitle.text("Day not loaded")

    function hide(attr) { attr.hide() }
    if(this.hotel) this.hotel.hide();
    this.restaurants.forEach(hide)
    this.activities.forEach(hide)
  }

  Day.prototype.addAttraction = function(attraction){
    switch(attraction.type){
      case 'hotel':
        if(this.hotel) this.hotel.hide();
        this.hotel = attraction;
        break;
      case 'restaurant':
        utilsModule.pushUnique(this.restaurants, attraction);break;
      case 'activity':
        utilsModule.pushUnique(this.activities, attraction);break;
      default: console.error('unknown attraction type: ', attraction)
    }
    attraction.show()
  }

  Day.prototype.removeAttraction = function(attraction){
    switch(attraction.type) {
      case 'hotel':
        this.hotel = null;
        break;
      case 'restaurant':
        utilsModule.remove(this.restaurants, attraction);
        break;
      case 'activity':
        utilsModule.remove(this.activities, attraction);
        break;
      default: console.error('bad type: ', attraction);
    }
    attraction.hide();
  }

  var publicAPI = {
    create: function(databaseDay){
      return new Day(databaseDay);
    }
  }

  return publicAPI;

}());
