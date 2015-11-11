Meteor.subscribe('items');

Template.Order.helpers({
  items: () => {
    items = Items.find({orderId: Router.current().params.orderId});
    Session.set('itemsCount', items.count())
    return items;
  },

  individualFee: () => {
    return Session.get('deliveryFee') / Session.get('itemsCount');
  },

  individualPrice: (individualFee, cost) => {
    return individualFee + cost;
  },

  total: (deliveryFee) => {
    return Items.find({orderId: Router.current().params.orderId})
              .fetch().reduce( (sum, item) => item.cost + sum, 0) + deliveryFee;
  }
});

Template.Order.events({
  'click .delete': (e) => {
    Meteor.call('removeItem', e.currentTarget.id);
  }
});