import { compare } from "bcrypt";
import { prisma } from "./database.server";

export const validateLoginCredentials = async (username: string, password: string): Promise<string[]> => {
    const errorList: string[] = [];
    if (!username || !password) {
        errorList.push('Please enter a username or password');
    } else {
        const foundUser = await prisma.user.findFirst({
            where: {
                username
            }
        });
        if (!foundUser || !(await compare(password, foundUser.password))) {
            errorList.push("User/Password is not found");
        }
    }
    return errorList;
}

export const validateNewUserCredentials = async (username: string, password: string, confirmPassword: string): Promise<string[]> => {
    const errorList: string[] = [];

    const existingUser = await prisma.user.findFirst({
        where: {
            username
        }
    });

    console.log(existingUser);

    if (existingUser !== null) {
        errorList.push('This user already exists');
        return errorList;
    }

    if (!username || !password) {
        errorList.push('Please enter a username or password');
    }
    if (!(password === confirmPassword)) {
        errorList.push('Password and Confirmation do not match');
    }
    if (password.length < 7) {
        errorList.push('Password is less than seven characters');
    }
    return errorList;
}