import abstractServices from '../abstracts/abstractServices';

class authServices extends abstractServices {
    public async signupService() {
        const connection = await this.connect('haiku');
        const result = connection.find({});
        const results = await result.toArray();
        console.log(results)
        this.close();
        return results;
    }
}

export default authServices;