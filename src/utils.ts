export const random = function(len: number){
    const hash = "abcdefgdjkhefujri832r748wguhwrbyvgrf389rwf";
    const hash_sz = hash.length;
    let req = "";
    for(let i = 0; i<len ;i++)
    {
        req += hash[Math.floor(Math.random()*hash_sz)];
    }
    return req;
}