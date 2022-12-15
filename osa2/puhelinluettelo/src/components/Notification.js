const Notification = ({ message }) => {
    if(message === null){
        return null
    }
    return (
        <div className="completed">
            {message}
        </div>
    )
}
export default Notification