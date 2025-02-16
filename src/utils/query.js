export default async (dbConnection, query, params) => {
    return new Promise((resolve, reject) => {
        const handler = (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        };
        return dbConnection.query(query, params, handler);
    });
};