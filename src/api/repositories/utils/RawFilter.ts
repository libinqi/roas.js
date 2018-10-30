export function toJsonData(sqlData: any | any[]): any | any[] {
    if (sqlData instanceof Array) {
        const newDataArray = [];
        for (let item of sqlData) {
            newDataArray.push(toJsonData(item));
        }
        return newDataArray;
    }
    if (sqlData instanceof Object) {
        if (sqlData && sqlData.dataValues) {
            for (let key in sqlData.dataValues) {
                sqlData.dataValues[key] = toJsonData(sqlData.dataValues[key]);
            }
            return sqlData.dataValues;
        }
    }
    return sqlData;
}

// export function mapData(sqlData: any): any {
//     if (sqlData && sqlData.dataValues) {
//         for (let key in sqlData.dataValues) {
//             sqlData.dataValues[key] = mapData(sqlData.dataValues[key]);
//         }
//         return sqlData.dataValues;
//     }
//     return sqlData;
// }

// export function mapDataArray(sqlDataArray: any[]): any[] {
//     const newDataArray = [];
//     for (let sqlData of sqlDataArray) {
//         newDataArray.push(mapData(sqlData));
//     }
//     return newDataArray;
// }
