/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Admin',
          lastname: 'Root',
          document: '12345678',
          email: 'anavarro@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$8jpAZ2T.DPQMMn9Da05xqOryaTeXvkXeCHAltSbb1llr.jpIkdyzW',
          birthday: new Date(),
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Juan',
          lastname: 'Martinez',
          document: '12345678',
          email: 'atleta2@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1993-04-27T23:51:14.045Z',
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Maria',
          lastname: 'Moncada',
          document: '12345678',
          email: 'atleta3@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1987-04-10T23:51:14.045Z',
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Pedro',
          lastname: 'Perez',
          document: '12345678',
          email: 'atleta4@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1980-04-10T23:51:14.045Z',
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Marta',
          lastname: 'Gonzalez',
          document: '12345678',
          email: 'atleta5@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1958-04-10T23:51:14.045Z',
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Gustavo',
          lastname: 'Briceño',
          document: '12345678',
          email: 'atleta6@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1975-04-10T23:51:14.045Z',
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Andrea',
          lastname: 'Pulido',
          document: '12345678',
          email: 'atleta7@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1989-04-10T23:51:14.045Z',
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Andres',
          lastname: 'Torres',
          document: '12345678',
          email: 'atleta8@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1988-04-10T23:51:14.045Z',
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Steve',
          lastname: 'Jobs',
          document: '12345678',
          email: 'atleta9@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '2003-04-10T23:51:14.045Z',
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Andres',
          lastname: 'Galarraga',
          document: '12345678',
          email: 'atleta10@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1997-04-10T23:51:14.045Z',
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Cam',
          lastname: 'Speck',
          document: '12345678',
          email: 'coach1@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '2000-04-10T23:51:14.045Z',
          anonymous: 'true',
          description:
            'praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/cam-speck-coach-profile.png',
          address: null,
          customer_id: null,
          twitter: '@camspeck',
          instagram: '@camspeck',
          facebook: 'camspeck',
          linkedin: 'camspeck',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Michelle',
          lastname: 'Lewin',
          document: '12345678',
          email: 'coach2@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1980-04-10T23:51:14.045Z',
          anonymous: 'true',
          description:
            'praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/michelle-lewin-coach-profile.png',
          address: null,
          customer_id: null,
          twitter: '@michellelewin',
          instagram: '@michellelewin',
          facebook: 'michellelewin',
          linkedin: 'michellelewin',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Amanda',
          lastname: 'Cerny',
          document: '12345678',
          email: 'coach3@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1967-04-10T23:51:14.045Z',
          anonymous: 'true',
          description:
            'praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/amanda-cerny-coach-profile.png',
          address: null,
          customer_id: null,
          twitter: '@amandacerny',
          instagram: '@amandacerny',
          facebook: 'amandacerny',
          linkedin: 'amandacerny',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Mike',
          lastname: 'Ohearn',
          document: '12345678',
          email: 'coach4@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1980-04-10T23:51:14.045Z',
          anonymous: 'true',
          description:
            'praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/mike-ohearn-coach-profile.png',
          address: null,
          customer_id: null,
          twitter: '@mikeohearn',
          instagram: '@mikeohearn',
          facebook: 'mikeohearn',
          linkedin: 'mikeohearn',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Admin',
          lastname: 'Gym 1',
          document: '12345678',
          email: 'admingym1@wayuinc.com',
          cellphone: '+584141234567',
          password:
            '$2b$10$A82S.Ru/TJDn39UzhP4Eaei185XW6aJhF277Go1Sg/Tubnrbtq92.',
          birthday: '1997-04-10T23:51:14.045Z',
          anonymous: 'true',
          picture:
            'https://s3.amazonaws.com/media.bison-reserve/users/no-image-available.jpg',
          address: null,
          customer_id: null,
          twitter: null,
          instagram: null,
          facebook: null,
          linkedin: null,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
