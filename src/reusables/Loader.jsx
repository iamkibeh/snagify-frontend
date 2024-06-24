import loading from '/loading-snagify.svg';
const Loader = () => {
    return (
        <>
        <div className="flex justify-center items-center h-[80%]">
            <img src={loading} alt="loading" width={100} height={100} />
        </div>
        </>
    );
};

export default Loader;