module.exports = (Pages,query,countProduct) => {
    if(query.page){
        Pages.currentPage = parseInt(query.page);
    }
    Pages.skip = (Pages.currentPage - 1) * Pages.limits;
    const totalPages = Math.ceil(countProduct / Pages.limits);

    Pages.totalPages = totalPages;
    return Pages;
}