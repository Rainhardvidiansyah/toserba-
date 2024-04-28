const TokenActivation = require('../model/tokenactivation.model');

class TokenActivationService{
    constructor(){}

    async createTokenActivation(token, UserId){
        try {
            const activation = await TokenActivation.create({
                token: token, UserId: UserId
            });
            return activation;
        } catch (error) {
            console.log(error);
        }
    }

    async findTokenByUserId(UserId){
        const token = await TokenActivation.findOne({
            where: { UserId: UserId }
        });
        return token;
    }

    async findAllToken(){
        try {
         const tokens = await TokenActivation.findAll();
         return tokens;
        } catch (error) {
            console.error(error);
        }
    }

    async findOneToken(tokenActivation){
        try {
            const token = await TokenActivation.findOne({
                where: {token: tokenActivation}
            });
            return token;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new TokenActivationService();

