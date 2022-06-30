import RegexValidator from "./regex-validator";

class AgencyValidator extends RegexValidator
{
    protected override get regex() : RegExp 
    {
        return /^([0-9]{1,4})$/;
    }

    protected override get type() : string 
    {
        return "agency";
    }
}

export default AgencyValidator;