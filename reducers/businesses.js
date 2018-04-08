export function businesses(state = null, action) {
  switch (action.type) {
    case 'SET_BUSINESSES':
      if (state === null) {
        state = {};
      }
      state.ids = [];
      state.businesses = {};
      for (var i = 0; i < action.businesses.length; i++) {
        let b = action.businesses[i];
      	state.ids.push(b.id);
      	state.businesses[b.id] = b;
      }
      state.each = function(func) {
      	for (var i = this.ids.length - 1; i >= 0 ; i--) {
    			func(i, this.businesses[this.ids[i]])
    		}
      };
      return state;
    case 'ADD_BUSINESS':
      state.ids.push(action.business.id);
      state.businesses[action.business.id] = action.business;
      return state;
    case 'ADD_OFFER':
      state.businesses[action.id].offers.push(action.offer);
      return state;
    case 'SET_OFFER':
      if (state === null) {
        return state;
      }
      for (var i = 0; i < state.businesses[action.id].offers.length; i++) {
        if (state.businesses[action.id].offers[i].id === action.offer.id) {
          state.businesses[action.id].offers[i] = action.offer;
          break;
        }
      }
      return state;
    case 'CLEAR_BUSINESSES':
      return null;
    default:
      return state;
  }
}