import jwt from 'jsonwebtoken';
import { sign,  verify } from 'jsonwebtoken';
const secretKey = 'secretkey'   //secret
const expiresIn = 60;    //时效 (秒)

//生成jwt
export const generateToken=(user:string) =>{ 
    const token = jwt.sign({user}, secretKey, {
        expiresIn: expiresIn,
       });
    return token
}
 
//解析jwt
export const verifyToken=(token:any)=> {
    return jwt.verify(token, secretKey)
}
