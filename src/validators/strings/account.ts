import RegexValidator from "./regex-validator";

class AccountValidator extends RegexValidator
{
    protected override get regex() : RegExp 
    {
        return /^([0-9]{1-6})$/;
    }

    protected override get type() : string 
    {
        return "account";
    }
}

export default AccountValidator;