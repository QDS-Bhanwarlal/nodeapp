
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(
        [
          {
            id: 1,
            name: 'Mukesh',
            location: 'Virar',
          },
          {
            id: 2,
            name: 'Prakash',
            location: 'Palghar'
          },
          {
            id: 3,
            name: 'Piyush',
            location: 'Andheri'
          },
          {
            id: 4,
            name: 'Ganesh',
            location: 'Bandra'
          },
          {
            id: 5,
            name: 'Sachin',
            location: 'Borivali'
          }
        ]
      );
    });
};
