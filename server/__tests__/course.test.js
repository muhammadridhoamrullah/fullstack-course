const request = require("supertest");
const app = require("../app");
const { User, Course, MyCourse, sequelize } = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");

let validToken, validToken2, invalidToken, idMyCourse;
const userTest1 = {
  email: "user.test1@mail.com",
  name: "User Test 1",
  password: "usertest1",
};

const userTest2 = {
  email: "user.test2@mail.com",
  name: "User Test 2",
  password: "usertest2",
};

beforeAll((done) => {
  User.create(userTest1)
    .then((registeredUser) => {
      validToken = signToken({
        id: registeredUser.id,
        email: registeredUser.email,
      });
      invalidToken =
        '12345678eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9';
      return User.create(userTest2);
    })
    .then((registeredUser2) => {
      validToken2 = signToken({
        id: registeredUser2.id,
        email: registeredUser2.email,
      });
      return queryInterface.bulkInsert('Courses',
        [
          {
            title: "Intro Vue",
            instructor: "Samuel Aditia",
            day: "Monday,Thursday,Saturday",
            imageUrl: "https://docs.vuejs.id/images/logo.png",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "REST API",
            instructor: "Wendy",
            day: "Wednesday,Friday",
            imageUrl: "https://billwerk.io/wp-content/uploads/sites/2/2019/05/icons-restapi-350x350.png",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "JQuery & Bootstrap",
            instructor: "Ayu Sudi",
            day: "Tuesday,Thursday",
            imageUrl: "https://www.kindpng.com/picc/m/445-4450455_css-logo-jquery-html-css-and-jquery-hd.png",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Vue Component",
            instructor: "Ganang Prakoso",
            day: "Monday,Wednesday,Friday",
            imageUrl: "https://docs.vuejs.id/images/logo.png",
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        {}
      );
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll(done => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(_ => {
      return Course.destroy({ truncate: true, cascade: true, restartIdentity: true })
    })
    .then(_ => {
      return MyCourse.destroy({ truncate: true, cascade: true, restartIdentity: true })
    })
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("GET /courses", () => {
  test("200 success get courses", (done) => {
    request(app)
      .get("/courses")
      .set("Authorization", `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get course with invalid token", (done) => {
    request(app)
      .get("/courses")
      .set("Authorization", `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get course without token", (done) => {
    request(app)
      .get("/courses")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /mycourses/:courseId", () => {
  test("201 success POST mycourses", (done) => {
    request(app)
      .post(`/mycourses/1`)
      .set("Authorization", `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("CourseId", 1);
        expect(body).toHaveProperty("UserId", expect.any(Number));
        expect(body).toHaveProperty("status", "Uncompleted");
        idMyCourse = body.id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 POST selected course with invalid token", (done) => {
    request(app)
      .post(`/mycourses/1`)
      .set("Authorization", `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 POST selected course without token", (done) => {
    request(app)
      .post(`/mycourses/1`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 POST selected course not found", (done) => {
    request(app)
      .post(`/mycourses/99`)
      .set("Authorization", `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Course not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /mycourses", () => {
  test("200 success get all selected course", (done) => {
    request(app)
      .get("/mycourses")
      .set("Authorization", `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get selected course with invalid token", (done) => {
    request(app)
      .get("/mycourses")
      .set("Authorization", `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get selected course without token", (done) => {
    request(app)
      .get("/mycourses")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("UPDATE /mycourses/:id", () => {
  test("200 success update selected course", (done) => {
    request(app)
      .patch(`/mycourses/${idMyCourse}`)
      .set("Authorization", `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Course has been completed");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


  test("403 update selected course with unauthorized user", (done) => {
    request(app)
      .patch(`/mycourses/${idMyCourse}`)
      .set("Authorization", `Bearer ${validToken2}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "You are not authorized");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 update selected course with invalid token", (done) => {
    request(app)
      .patch(`/mycourses/${idMyCourse}`)
      .set("Authorization", `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 update selected course without token", (done) => {
    request(app)
      .patch(`/mycourses/${idMyCourse}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 update selected course not found", (done) => {
    request(app)
      .patch(`/mycourses/99`)
      .set("Authorization", `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Course not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});