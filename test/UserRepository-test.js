import { expect } from 'chai';
// import { getUserDataById } from './src/scripts.js'
const { getUserDataByID, avgSteps, getHydrationData } = require('../src/scripts.js');

// import userData from './data/users';



describe('User Repository', () => {
  it('should run tests', function () {
    expect(true).to.equal(true);
  });
});

// describe('User Data', () => {
//   it('should return user data based on ID', function (){
//     const user1 = getUserDataById(userData)
//     expect(user1.id).to.equal(1)
//   })
// })

describe('hydration', function() {
  it('should return hyrdration data', function(){
const data = getHydrationData()

expect(data).to.equal(true)
  })
})