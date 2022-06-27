import StringValidator from "./string-validator";

class NameValidator extends StringValidator
{
    protected override get type() : string 
    {
        return "name";
    }

    protected override validate (name: string) : string
    {
        if(!super.validate(name))
        {
            return "";
        }

        if(name.length < 3) 
        {
            this.errors = this.errors += `${this.type}:field is too short|`;
            return "";
        }

        return name.trim();
    }
}

export default NameValidator;