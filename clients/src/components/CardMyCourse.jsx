export default function CardMyCourse({ myCourse }) {
  return (
    <>
      {/* MyCourseCard */}
      <div className="col-4 mb-3">
        <div className="card p-3 rounded-3">
          <div className="row align-items-center">
            <div className="col-3">
              <img
                src={myCourse.Course.imageUrl}
                alt="logo"
                className="mx-auto d-block"
                style={{ width: 70 }}
              />
            </div>
            <div className="col-9">
              <h5 className="mb-0">{myCourse.Course.title}</h5>
              <p className="mb-0">
                Instructor : <strong>{myCourse.Course.instructor}</strong>
              </p>
              <p className="mb-2">Schedule :</p>
              <p className="mb-3">
                <span className="badge rounded-pill bg-warning text-dark">
                  {myCourse.Course.day}
                </span>
              </p>
              <div>
                <span>Status: </span>
                {myCourse.status}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End MyCourseCard */}
    </>
  );
}
