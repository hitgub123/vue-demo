const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
import sqlfun from './pgsql';
import { generateToken, verifyToken } from './security/token';


const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = 8081;
app.listen(port, () => console.log(`API服务器监听${port}端口!`));


app.get('/api', (req: any, res: { send: (arg0: string) => any; }) => res.send('测试API服务器'));

app.get('/api/goodsList', (req: { query: { page: number; input: any; }; }, res: { send: (arg0: { status: number; data: any; pageSize: number; total: number; }) => void; }) => {
    const page = req.query.page || 1;
    let pageSize = 5;
    let input = req.query.input;
    let condition = input ? `where concat(name,sellpoint,description) like '%${input}%'` : '';
    sqlfun(`select count(*) from product ${condition} `, null, (result) => {
        let count = Number.parseInt(result['rows'][0]['count']);
        if (count > 0) {
            let from = (page - 1) * pageSize;
            let sql = `select * from product ${condition} order by id limit ${pageSize} offset ${from} `;
            sqlfun(sql, null, (result) => {
                if (result.rows.length > 0) {
                    res.send({
                        status: 200,
                        data: result.rows,
                        pageSize: pageSize,
                        total: count,
                    });
                }
            });
        } else {
            res.send({
                status: 500,
                data: [],
                pageSize: pageSize,
                total: count,
            });
        }
    });
})
app.post('/api/addGood', (req: { body: any; }, res: any) => {
    console.log(req.body);
    let { name, count, price } = req.body;
    const sql = `insert into product (name,count,price) values('${name}','${count}','${req.body.price}');`;
    sqlfun(sql, null, (result) => {
        if (result.rowCount > 0) {
            res.send({
                status: 200,
                data: result.rowCount,
            });
        }
    });
})
app.post('/api/updateGood', (req: { body: any; }, res: any) => {
    console.log(req.body);
    let { name, count, price, id } = req.body;
    const sql = `update product set name='${name}',count='${count}',price='${price}' where id='${id}'`;
    sqlfun(sql, null, (result) => {
        if (result.rowCount > 0) {
            res.send({
                status: 200,
                data: result.rowCount,
            });
        }
    });
})
app.get('/api/delGood', (req: { query: { id: any; }; }, res: any) => {
    const sql = `delete from product where id='${req.query.id}';`;
    sqlfun(sql, null, (result) => {
        if (result.rowCount > 0) {
            res.send({
                status: 200,
                data: result.rowCount,
            });
        } else {
            res.send({
                status: 500,
                data: result.rowCount,
            });
        }
    });
})
app.get('/api/selectOneGood', (req: { query: { id: any; }; }, res: any) => {
    const sql = `select * from product where id='${req.query.id}';`;
    sqlfun(sql, null, (result) => {
        if (result.rowCount > 0) {
            res.send({
                status: 200,
                data: result.rows,
            });
        }
    });
})

app.post('/api/login', (req: any, res: any) => {
    if (req.body.user == 'aa' && req.body.pass == 'aa') {
        const token = generateToken(req.body.user)
        res.cookie("token", token, { maxAge: 1000 * 10 });
        res.send({ status: 200, token: token })
    } else {
        res.send({ status: 500 })
    } 
})


