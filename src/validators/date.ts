class DateValidator
{
    public data: string;
    public errors: string;

    public constructor (date: string)
    {
        this.errors = "";
        this.data = this.validate(date);
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