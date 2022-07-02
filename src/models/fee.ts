import Transaction from "./transaction";

interface Fee extends Transaction {
    id: string
    origin: string
    account: string
    type: string
    value: number
}

export default Fee;