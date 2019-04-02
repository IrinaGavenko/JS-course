module.exports = {
  eventsList: {},
  /**
   * @param {String} event
   * @param {Object} subscriber
   * @param {Function} handler
   */
  on: function (event, subscriber, handler) {
    if (! this.eventsList.hasOwnProperty(event)) 
	this.eventsList[event] = [];
    this.eventsList[event].push({
	subscriber: subscriber,
        handler: handler
    });
    return this;
  },

  /**
   * @param {String} event
   * @param {Object} subscriber
   */
  off: function (event, subscriber) {
    if (this.eventsList.hasOwnProperty(event)) {
      this.eventsList = this.eventsList[event].filter(function(item) {
	  return ~(item.subscriber === subscriber);
      });
    }
    return this;

  },

  /**
   * @param {String} event
   */
  emit: function (event) {
    if (this.eventsList.hasOwnProperty(event)) {
	this.eventsList[event].forEach(function(item) {
      	  item.handler.call(item.subscriber);
    	});
    }
    return this;
  }
};
