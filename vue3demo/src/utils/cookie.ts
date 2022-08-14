/**
 * @description 保存cookie
 * @param {Object} json 需要存储cookie的对象
 * @param {Number} days 默认存储多少天
 */
function set(json: { [x: string]: string; }, days: number) {
    // 设置过期时间
    const date = new Date(
        new Date().getTime() + days * 24 * 60 * 60 * 1000
    ).toUTCString();

    for (const key in json) {
        document.cookie = key + "=" + json[key] + "; expires=" + date;
    }
}

/** 
 * @description 获取cookie
 * @param {String} name 需要获取cookie的key
 */
function get(name: string) {
    // console.log(document.cookie, '------')
    const arr = document.cookie.split(';')
    for (const s in arr) {
        if (arr[s].split('=')[0].trim() == name)
            return arr[s].split('=')[1].trim()
    }
    return null
}

/** 
 * @description 删除cookie
 * @param {String} name 需要删除cookie的key
 */
function clear(name: string) {
    console.log('clear cookie ',name)
    const json:any = {};
    json[name]=''
    set(json, 0)
}

export default {
    set,
    get,
    clear
}