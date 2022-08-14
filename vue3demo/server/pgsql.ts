// import pg from 'pg';
const pg = require('pg'); 

const config = {
    database: 'study',
    user: 'postgres',
    password: 'kimoji',
    port: 5432
};

const pool = new pg.Pool(config);

function sqlfun(sql: string, arr: null, callback: { (result: any): void; (result: any): void; (result: any): void; (arg0: { rows: string | any[]; }): void; }) {
    console.info('sql>>\t',sql);
    pool.connect(function (err: string, client: { query: (arg0: any, arg1: any, arg2: (err: any, result: any) => void) => void; }, done: () => void) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query(sql, arr,
            function (err: any, result) {
                done();
                if (err) {
                    console.log(err);
                }
                console.info('result.rowCount >>\t',result['rowCount']);
                callback(result);
            })
    })
};

// module.exports = sqlfun;
export default sqlfun  
