class DateValidator
{
    public date: string;
    public errors: string;
    static regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2, 12})$/;

    public constructor (date: string)
    {
        this.errors = "";
        this.date = this.validate(date);
    }

    private validate (date: string) : string
    {
        if(!date || date.length == 0)
        {
            this.errors = this.errors += "date:date required|";
            return "";
        }

        if(!new Date(date).getTime())
        {
            this.errors = this.errors += "date:invalid date|";
            return "";
        }

        return date.trim();
    }
}

export { DateValidator };