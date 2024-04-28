const userAddress = require('../model/address.model');

class UserAddressService{
    constructor(){}

    //street, city, province, subdistrict, district
    async createUserAddress(street, city, province, subdistrict, district, UserId) {
        try {
            const address = await userAddress.create({
                street: street, city: city, province: province,
                subdistrict: subdistrict, district: district, 
                UserId: UserId
            });
            return address;
            
        } catch (error) {
            console.log(error);
        }
    }

    async findAddressById(id){
        try {
            const address = await userAddress.findByPk(id);
            // console.log(address.UserId);
            return address;
        } catch (error) {
            console.log(error);
        }
    }

    async findAllAddress(){
        try {
            const address = await userAddress.findAll();
            return address;
        } catch (error) {
            console.log(error);
        }
    }

    //update useraddress set street = '', city = '' where UserId = value_id;
    async updateUserAddress(id, street, city){
        try {
            const address = await userAddress.update(
                { street: street, city: city },
            {where: {id: id}});
            return address;
        } catch (error) {
            console.log(error);
        }
    }

    async getAddressByUserId(UserId){
        try {
            const user = await userAddress.findOne({where: {UserId: UserId}}); //change to address id
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAddress(addressId){
        try {
            await userAddress.destroy(
                {
                    where: {id: addressId}
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

  

}

module.exports = new UserAddressService();