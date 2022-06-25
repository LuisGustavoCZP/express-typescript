import { User } from "../models";
import { DateValidator } from "./date";
import { EmailValidator } from "./email";
import { NameValidator } from "./name";

class UserDataValidator 
{
    public user: User;
    public errors: string;

    public constructor (user: User)
    {
        this.errors = "";
        this.user = user;
    }

    public validate (user: User) : User
    {
        const validEmail = new EmailValidator(user.email);
        const validName = new NameValidator(user.name);
        const validBirthdate = new DateValidator(user.birthdate);

        this.errors = this.errors.concat(`${validEmail.errors}${validName.errors}${validBirthdate.errors}`)
    
        const userData: Partial<User> = {
            email:validEmail,
            name:validName,
            birthdate:validBirthdate,
        }
    }
}

export {UserDataValidator};