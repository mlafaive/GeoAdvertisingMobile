export function setBusinesses(businesses) {
  return {
    type: 'SET_BUSINESSES',
    businesses: businesses,
  };
}

export function addBusiness(business) {
  return {
    type: 'ADD_BUSINESS',
    business: business,
  };
}

export function setOffers(offers) {
  return {
    type: 'SET_OFFERS',
    offers: offers,
  };
}

export function addOffer(id, offer) {
  return {
    type: 'ADD_OFFER',
    id: id,
    offer: offer
  };
}

export function clearBusinesses() {
  return {
    type: 'CLEAR_BUSINESSES'
  };
}