class NameValidator
{
    public data: string;
    public errors: string;

    public constructor (name: string)
    {
        this.errors = "";
        this.data = this.validate(name);
    }

    private validate (name: string) : string
    {
        if(!name) 
        {
            this.errors = this.errors += "name:field required|";
            return "";
        }
        if(name.length < 3) 
        {
            this.errors = this.errors += "name:name is too short|";
            return "";
        }

        const f = name.trim();
        if(!f) 
        {
            this.errors = this.errors += "name:cannot be only spaces|";
            return "";
        }

        return f;
    }
}

export { NameValidator };