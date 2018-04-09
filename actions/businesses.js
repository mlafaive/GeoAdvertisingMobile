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

export function setOffer(id, offer) {
  return {
    type: 'SET_OFFER',
    id: id,
    offer: offer
  };
}

export function deleteOffer(bid, oid) {
  return {
    type: 'DELETE_OFFER',
    bid: bid,
    oid: oid
  };
}

export function clearBusinesses() {
  return {
    type: 'CLEAR_BUSINESSES'
  };
}