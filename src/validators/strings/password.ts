import RegexValidator from "./regex-validator";

class PasswordValidator extends RegexValidator
{
    protected override get regex() : RegExp 
    {
        return /^([a-zA-Z0-9]{6})$/;
    }

    protected override get type() : string 
    {
        return "password";
    }
}

export default PasswordValidator;