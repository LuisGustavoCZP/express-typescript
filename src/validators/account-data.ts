import { User } from "../models";
import DateValidator from "./strings/date";
import EmailValidator from "./strings/email";
import NameValidator from "./strings/name";
import CPFValidator from "./strings/cpf";

class AccountDataValidator 
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

export default AccountDataValidator;