
const Pagination = ({ page, setPage }) => {
    return (
        <div className="flex justify-center my-4">

            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="mx-2 px-4 py-2 bg-sky-500 text-black border"
            >
                Prev
            </button>

            <span className="flex items-center mx-2">Page {page}</span>

            <button
                onClick={() => setPage(page + 1)}
                className="mx-2 px-4 py-2 bg-sky-500 text-black border"
            >
                Next
                
            </button>

        </div>
    )
};

export default Pagination;