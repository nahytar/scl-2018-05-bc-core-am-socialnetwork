const expect = require('chai').expect
const chat = require('../../public/js/chat')

describe('Chat', () => {
  it('Deberia devolver primero uid1', () => {
    const uid1 = "a";
    const uid2 = "b";
    
    const result = chat.generateId(uid1, uid2);

    expect(result).to.be.equal("ab");
  });
  it('Deberia devolver primero uid2', () => {
    const uid1 = "b";
    const uid2 = "a";

    const result = chat.generateId(uid1, uid2);

    expect(result).to.be.equal("ab");
  });
});