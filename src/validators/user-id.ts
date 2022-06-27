class UserIDValidator
{
    public data: string;
    public errors: string;
    static regex = /^([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})$/;

    public constructor (date: string)
    {
        this.errors = "";
        this.data = this.validate(date);
    }

    private validate (date: string) : string
    {
        if(!date || date.length == 0)
        {
            this.errors = this.errors += "cpf:cpf required|";
            return "";
        }

        if(!UserIDValidator.regex.test(date))
        {
            this.errors = this.errors += "cpf:invalid cpf format|";
            return "";
        }

        return date.trim();
    }
}

export default UserIDValidator;