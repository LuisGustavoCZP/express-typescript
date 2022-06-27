import RegexValidator from "./regex-validator";

class CPFValidator extends RegexValidator
{
    protected override get regex() : RegExp 
    {
        return /^([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})$/;
    }

    protected override get type() : string 
    {
        return "cpf";
    }
}

export default CPFValidator;