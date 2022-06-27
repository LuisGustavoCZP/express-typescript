import StringValidator from "./string-validator";

abstract class RegexValidator extends StringValidator
{
    protected abstract get regex() : RegExp;

    protected override validate (info: string) : string
    {
        if(!super.validate(info))
        {
            return "";
        }

        if(!this.regex.test(info))
        {
            this.errors = this.errors += `${this.type}:invalid ${this.type}|`;
            return "";
        }

        return info.trim();
    }
}

export default RegexValidator;