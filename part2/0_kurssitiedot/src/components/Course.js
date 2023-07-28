const Header = ({ courses }) => {
    console.log("HeadercourseProp", courses)
    return (
        <h1>{courses.name}</h1>
    )
}

const Total = ({ courseTotal }) => {
    return (
        <p><strong>Number of exercises {courseTotal}</strong></p>
    )
}


const Content = ({ courses, totalCoursesValue }) => {

    return (

        <>
            {courses.parts.map(course => {
                //console.log("course", course)
                return (
                    <Part part={course.name} exercise={course.exercises} key={course.id} />)
            }

            )}
            <Total courseTotal={totalCoursesValue} />
        </>
    )
}
const Part = ({ part, exercise }) => {
    console.log("part", part, exercise)
    return (
        <p>
            {part} {exercise}
        </p>
    )
}

const CourseContent = ({ course }) => {
    console.log("org CourseContent", course)
    // let totalCoursesValue = 0;
    // for (let item of courses.parts) {
    //     totalCoursesValue += item.exercises
    // }

    const totalCoursesValue = course.parts.reduce((s, p) => s + p.exercises, 0)
    console.log("totalCoursesValue", totalCoursesValue)

    return (

        <>
            {/* {course.parts.map(course => {
                //console.log("course", course)
                return (
                    <Part part={course.name} exercise={course.exercises} key={course.id} />)
            }

            )} */}
            <Header courses={course} />
            <Content courses={course} totalCoursesValue={totalCoursesValue} />

        </>
    )
}



const Course = ({ courses }) => {
    console.log("org courses", courses)

    return (
        <>
            {courses.map(course => {
                console.log("course mapping course", course)
                return (
                    <CourseContent course={course} key={course.id} />
                )
            })
            }
        </>


    )
}

export default Course