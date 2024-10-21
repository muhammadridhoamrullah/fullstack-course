export default function CardCourse({ course }) {
  return (
    <>
      {/* CourseCard */}
      <div className="col-4 mb-3">
        <div className="card p-3 rounded-3">
          <div className="row align-items-center">
            <div className="col-3">
              <img
                src={course.imageUrl}
                alt="logo"
                className="mx-auto d-block"
                style={{ width: 70 }}
              />
            </div>
            <div className="col-9">
              <h5 className="mb-0">{course.title}</h5>
              <p className="mb-0">
                Instructor : <strong>{course.instructor}</strong>
              </p>
              <p className="mb-0">Schedule :</p>
              <p className="mb-0">
                <span className="badge rounded-pill bg-warning text-dark">
                  {course.day}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End CourseCard */}
    </>
  );
}
