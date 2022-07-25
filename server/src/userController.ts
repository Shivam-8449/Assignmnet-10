import {Request,Response} from 'express';
import {pool} from './databaseConnection';

class controller {

    public async getAll(req:Request, res:Response) {
        pool.query(`SELECT users.id,firstname,middlename,lastname,email,
        phone,users.address,customer.name AS customer,roles.name AS role,users.created_on,users.modified_on FROM users 
        LEFT JOIN customer ON customerid = customer.id LEFT JOIN roles 
        ON role = roles.key ORDER BY users.id ASC`,
        (error: any,result: any)=>
        {
            if(error)
            {
                throw error;
                
            }

            else
            {
                for(let element of result.rows)
                {
                    const date = new Date(element.created_on).toLocaleString("en-US");
                    const date1 = new Date(element.modified_on).toLocaleString("en-US");
                    element.created_on = date;
                    element.modified_on = date1;
                }
                res.status(200).json(result.rows);
            }
        }
        );
       
    }


    public async getUserById(req: Request, res: Response) {
        const id = Number(req.params.id);
        pool.query(`SELECT users.id,firstname,middlename,lastname,email,phone,
        users.address,customer.name AS customer,roles.name AS role,users.created_on,users.modified_on FROM users
        LEFT JOIN customer ON customerid = customer.id LEFT JOIN roles 
        ON role = roles.key WHERE users.id = $1`,
        [id], (error,result) =>
        {
            if(error)
            {
                res.status(404).send("You have entered wrong id");
            }
            else
            {
                res.status(200).json(result.rows);
            }
        }
        );
    }
  

   
    public async createUser(req: Request, res: Response) {
        const {firstName,middleName,lastName,email,phone,role,address,customer} = req.body;
        pool.query(`INSERT INTO users(firstname,middlename,lastname,email,phone,role,
            address,customerid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [firstName,middleName,lastName,email,phone,role,address,customer],(err,result)=>
        {
            if(err)
            {
                throw err;
            }
            else
            {
                res.status(201).send(result);
            }
        }
        ); 
         
    }
    public async updateUser(req: Request, res: Response) {

        const id = Number(req.params.id);
        const {firstName,middleName,lastName,email,phone,role,address,customer} = req.body;
        pool.query(`UPDATE users SET firstname = $1, middlename = $2, lastname = $3, email = $4,
         phone = $5, role = $6, address = $7,customerid = $8 WHERE id = $9`,
        [firstName,middleName,lastName,email,phone,role,address,customer,id],(err,result) =>
        {
            if(err)
            {
                res.status(400).send("Failed due to bad input");
                throw err;
            }
            else{
                res.status(200).send();
            }
        }
        );
    }
    public async deleteUser(req: Request, res: Response) {
       
        const id = Number(req.params.id);
        pool.query('DELETE FROM users WHERE id = $1',[id],(err,result)=>
        {
            if(err)
            {
                throw err;
            }
            else
            {
                res.status(200).send(result);
            }
        });
     
    }
  
}

export const userController = new controller();
