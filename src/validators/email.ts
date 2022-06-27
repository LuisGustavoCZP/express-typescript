class EmailValidator
{
    public data: string;
    public errors: string;
    static regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;

    public constructor (email: string)
    {
        this.errors = "";
        this.data = this.validate(email);
    }

    private validate (email: string) : string
    {
        if(email.length == 0)
        {
            this.errors = this.errors += "email:email required|";
            return "";
        }

        if(!EmailValidator.regex.test(email))
        {
            this.errors = this.errors += "email:invalid email|";
            return "";
        }

        return email.trim();
    }
}

export { EmailValidator };