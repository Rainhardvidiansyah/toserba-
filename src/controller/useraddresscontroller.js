const UserAddressService = require('../service/useraddressservice');


class UserAddressController{
    constructor(){}

    async createUserAddress(req, res){
        try {
            const {street, city, province, subdistrict, district} = req.body;
            const userId = req.id;
            const address = await UserAddressService.createUserAddress(street, city, province, subdistrict, district, userId);
            res.status(200).json(address);
        } catch (error) {
            console.log(error);
        }
    }

    async updateUserAddress(req, res){
        try {
            const {street, city} = req.body;
            await UserAddressService.updateUserAddress(req.address.id, street, city);
            return res.status(200).json({message: "address updated successfully"});

        } catch (error) {
            console.log(error);
        }
    }

    async deleteUserAddress(req, res){
        try {
            await UserAddressService.deleteAddress(req.address.id);
            return res.status(200).json({message: "address deleted successfully!"});
        } catch (error) {
            return res.status(500).json({message: "error deleting address"});
        }
    }
}

module.exports = new UserAddressController();