export class User{
    constructor(public firstname:string, public middlename :string, public lastname:string,public email:string,
        public phone: string,public role: string, public address: string,public customer: string,public created_on?: string,
        public modified_on?: string,public id?: number)
    {
 
    }
}