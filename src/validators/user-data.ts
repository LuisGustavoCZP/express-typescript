import { User } from "../models";
import { DateValidator } from "./date";
import { EmailValidator } from "./email";
import { NameValidator } from "./name";
import { CPFValidator } from "./cpf";

class UserDataValidator 
{
    public data: Partial<User>;
    public errors: string;

    public constructor (user: User)
    {
        this.errors = "";
        this.data = this.validate(user);
    }

    public validate (user: User) : Partial<User>
    {
        const validEmail = new EmailValidator(user.email);
        const validName = new NameValidator(user.name);
        const validBirthdate = new DateValidator(user.birthdate);
        const validCPF = new CPFValidator(user.cpf);

        this.errors = this.errors.concat(`${validEmail.errors}${validName.errors}${validBirthdate.errors}${validCPF.errors}`)
    
        const userData: Partial<User> = {
            email:validEmail.data,
            name:validName.data,
            birthdate:validBirthdate.data,
            cpf:validCPF.data
        }

        return userData;
    }
}

export {UserDataValidator};