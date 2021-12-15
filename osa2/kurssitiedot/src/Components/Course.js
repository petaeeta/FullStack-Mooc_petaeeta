import React from 'react'

const Header = (props) => {
    return(
      <div>
        <h2>{props.course}</h2>
      </div>
    )
}

const Content = (props) => {
    return(
      <div>
        {props.parts.map((props) => <Part name={props.name} amount={props.exercises} key={props.id}/>)}
      </div>
    )
}

const Part = (props) => {
    return(
      <div>
        <p>{props.name} {props.amount}</p>
      </div>
    )
}

const Total = ({ parts }) => {
    const coursePoints = parts.map(({exercises}) => exercises)
    return(
        <strong>Total of {coursePoints.reduce((a, b) => a + b)} exercises</strong>
    )
}

const Course = ({course}) => {
    return(
        <div>
            <h1>Web development curriculum</h1>
            {course.map((props) => {
                return(
                    <div key={props.id}>
                        <Header course={props.name} />
                        <Content parts={props.parts}/>
                        <Total parts={props.parts}/>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default Course