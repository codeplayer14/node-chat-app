const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');


describe('generateMessage',()=>{

  it('It should generate a message.',()=>{

      var from =  'Paddy';
      var text = "Wassup Peeps.";
      var message = generateMessage(from,text);
      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from,text});

  });

});

describe('generateLocationMessage',()=>{

  it('Should generate location message',()=>{

      var latitude = 13.2;
      var longitude = 15.6;
      var locationURL = `https://www.google.com/maps?q=${latitude},${longitude}`;
      var message= generateLocationMessage('Admin',{latitude,longitude});

      expect(message.createdAt).toBeA('number');

      expect(message).toInclude({from:'Admin',locationURL});
  });

});
