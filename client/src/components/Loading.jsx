import "../css/Loading.css"

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loader">
                <img src="/Images/loading.png" alt="loading"/>
                <div className="shadow"></div>
            </div>
        </div>
    );
};

export default Loading;
