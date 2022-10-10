const Header = ({name}) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
        <Total parts={parts} />
      </div>
    )
  }
  const Total = ({parts}) => {
    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    return(
      <p style={{fontWeight: 'bold'}}>Total of {total} exercises</p>
    )
  }  
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts} />
      </div>
    )
  }

  export default Course