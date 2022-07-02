import bcrypt from 'bcrypt';
class lib {

    //Hash password
    public static async hashPass(password: string) {
        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash(password, salt);
    }

    // compare hash password
    public static async compare(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

}

export default lib;