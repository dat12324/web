module.exports = (query) => {
    let Search = {
        keyword: '',
    }
    if (query.keyword) {
        Search.keyword = query.keyword
        const regex = new RegExp(Search.keyword, 'i'); // 'i' for case-insensitive
        Search.regex = regex;
    }
    return Search;
}