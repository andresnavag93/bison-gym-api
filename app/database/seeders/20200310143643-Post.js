/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('posts', [
      {
        gym_id: 1,
        type_id: 30,
        title: 'Books',
        message:
          'praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
        created_at: '2020-03-18T09:00:00-04',
        updated_at: new Date()
      },
      {
        gym_id: 1,
        type_id: 30,
        title: 'Computers',
        message:
          'a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non',
        created_at: '2020-03-17T09:00:00-04',
        updated_at: new Date()
      },
      {
        gym_id: 1,
        type_id: 30,
        title: 'Sports',
        message:
          'turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies',
        created_at: '2020-03-19T09:00:00-04',
        updated_at: new Date()
      },
      {
        gym_id: 1,
        type_id: 30,
        title: 'Beauty',
        message:
          'libero rutrum ac lobortis vel dapibus at diam nam tristique tortor eu pede',
        created_at: '2020-03-21T09:00:00-04',
        updated_at: new Date()
      },
      {
        gym_id: 1,
        type_id: 30,
        title: 'Health',
        message:
          'massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi',
        created_at: '2020-03-22T09:00:00-04',
        updated_at: new Date()
      },
      {
        gym_id: 1,
        type_id: 30,
        title: 'Books',
        message:
          'praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
        created_at: '2020-03-17T09:00:00-04',
        updated_at: new Date()
      },
      {
        gym_id: 1,
        type_id: 30,
        title: 'Computers',
        message:
          'a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non',
        created_at: '2020-03-17T09:00:00-04',
        updated_at: new Date()
      },
      {
        gym_id: 1,
        type_id: 30,
        title: 'Sports',
        message:
          'turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies',
        created_at: '2020-03-17T09:00:00-04',
        updated_at: new Date()
      },
      {
        gym_id: 1,
        type_id: 30,
        title: 'Beauty',
        message:
          'libero rutrum ac lobortis vel dapibus at diam nam tristique tortor eu pede',
        created_at: '2020-03-17T09:00:00-04',
        updated_at: new Date()
      },
      {
        gym_id: 1,
        type_id: 30,
        title: 'Health',
        message:
          'massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi',
        created_at: '2020-03-17T09:00:00-04',
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};
