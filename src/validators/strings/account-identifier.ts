import RegexValidator from "./regex-validator";

class AccountIdentifierValidator extends RegexValidator
{
    protected override get regex() : RegExp 
    {
        return /^([0-9]{1})$/;
    }

    protected override get type() : string 
    {
        return "account-identifier";
    }
}

export default AccountIdentifierValidator;