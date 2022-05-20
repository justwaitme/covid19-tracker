export const dataTablesort = (data) => {
    const sortedData = [...data];
    sortedData.sort((a,b) => {
        if(a.cases > b.cases){
            return -1;
        }else{
            return 1;
        }
    })
    return sortedData
}

/*  
    we can do it like this way if you enjoy simplifying things
     const sortedData = [...data];
    sortedData.sort((a,b) =>  a.cases > b.cases ? -1 : 1 )
    return sortedData


*/