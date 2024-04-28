const {RefreshToken} = require('../model/refreshtoken.model');

class RefreshTokenService{
    constructor(){}

    async createRefreshToken(token, userId){
        try {
            const refreshToken = await RefreshToken.create({
                refreshToken: token,
                user_id: userId
            });
            return refreshToken;
        } catch (error) {
            console.error(error);
        }
    }

    


}

module.exports = new RefreshTokenService();