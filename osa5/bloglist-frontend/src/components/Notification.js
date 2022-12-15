const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="correct">
      {message}
    </div>
  )
}

export default  Notification