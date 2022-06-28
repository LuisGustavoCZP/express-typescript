import RegexValidator from "./regex-validator";

class AgencyIdentifierValidator extends RegexValidator
{
    protected override get regex() : RegExp 
    {
        return /^([0-9]{1})$/;
    }

    protected override get type() : string 
    {
        return "agency-identifier";
    }
}

export default AgencyIdentifierValidator;