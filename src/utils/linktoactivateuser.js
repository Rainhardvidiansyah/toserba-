const url = require('url');



module.exports = 
    async (userid, token) => {
    const urlActivate = url.resolve('http://localhost:1023/api/v1/', 'user/activate');
    return `${urlActivate}?userId=${userid}&token=${token}`;
};

// Now response from mailtrap is: http://localhost:1023/user/activate?userid=23&token=rrs3yKefTd

//result will be returned like: http://localhost:6000/api/v1/user/activate?userid=1&token=ab33rtit99
//http://localhost:6000/user/activate?userid=21&token=1clxY7gH3B -> from mailtrap
