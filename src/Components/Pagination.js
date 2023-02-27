const Pagination = (props) =>{

    console.log(props)
    
    let numberOfPages = [];

    for(let i=1; i<=Math.ceil(props.users.length/props.itemsPerPage); i++){
        numberOfPages.push(i);
    }

    

    function showNextHandler(event){
        let currentPage = event.target.id
        props.setCurrentPage(currentPage)
    }

    let pages = numberOfPages.map((item) =>{
        return(
            <li id={item}   onClick = {showNextHandler}>{item}</li>
        )
    })

    return(
        <section>
            <ul className="pagination">
                {pages}
            </ul>
        </section>
    )
}

export default Pagination