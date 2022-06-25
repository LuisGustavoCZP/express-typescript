class NameValidator
{
    public name: string;
    public errors: string;
    static regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2, 12})$/;

    public constructor (name: string)
    {
        this.errors = "";
        this.name = this.validate(name);
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