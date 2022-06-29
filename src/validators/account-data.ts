import { TransactionAccount } from "../models";
import AgencyValidator from "./strings/agency";
import AgencyIValidator from "./strings/agency-identifier";
import AccountValidator from "./strings/account";
import AccountIValidator from "./strings/account-identifier";

class AccountDataValidator 
{
    public data: Partial<TransactionAccount>;
    public errors: string;

    public constructor (account: TransactionAccount)
    {
        this.errors = "";
        this.data = this.validate(account);
    }

    public validate (user: TransactionAccount) : Partial<TransactionAccount>
    {
        const validAgency = new AgencyValidator(user.agency);
        const validAgencyI = new AgencyIValidator(user.agency_identifier);
        const validAccount = new AccountValidator(user.account);
        const validAccountI = new AccountIValidator(user.account_identifier);

        this.errors = this.errors.concat(`${validAgency.errors}${validAgencyI.errors}${validAccount.errors}${validAccountI.errors}`)
    
        const userData: Partial<TransactionAccount> = {
            agency:validAgency.data,
            agency_identifier:validAgencyI.data,
            account:validAccount.data,
            account_identifier:validAccountI.data
        }

        return userData;
    }
}

export default AccountDataValidator;