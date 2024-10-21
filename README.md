[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15291918&assignment_repo_type=AssignmentRepo)
# Live Code 3 - Hacktiv Course

## Ringkasan

Kalian akan membuat sebuah website aplikasi Full Stack Javascript client-server model (`NodeJS`, `ExpressJS`, `PostgreSQL`, `Sequelize`, `ReactJS`) yang dapat menampilkan daftar course hacktiv8. User dapat menambahkan course ke dalam _my courses_ dan dapat menyelesaikan course yang dipilih dengan meng-updatenya menjadi _completed_.

Feature-feature aplikasi ini adalah:

1. User dapat melakukan register.
2. User dapat melakukan login.
3. User dapat melihat list _Course_
4. User dapat _enroll_ terhadap _Course_ yang ada.
5. User dapat menyelesaikan _Course_ yang sudah di _enroll_.

Aplikasi ini akan dibuat dari _scratch_ atau dari awal oleh karena itu pastikan feature yang akan dibuat sesuai dengan yang diminta, kalian hanya diberikan `api_docs.md` sebagai panduan dalam membuat server dan client. Silahkan kalian buat feature by feature sesuai release yang disediakan `README.md` ini!

## Aturan dan Kebijakan

- Waktu Pengerjaan: **270 min (4 Jam 30 Min)**
- (-10) jika `node_modules` tidak di-_ignore_.
- (-5) jika `package.json` tidak ada atau tidak di-_push_.
- (-5) jika `.env` tidak di-_ignore_, bagi yang menggunakan dotenv.
- (-5) jika tidak menyertakan example value `.env`, bagi yang menggunakan dotenv.
- (-5) jika tidak menerapkan konsep SPA.
- (-5) Error tidak ditampilkan pada client.
- (-2) jika menggunakan `alert` bawaan browser (gunakan sweetalert atau sejenisnya)
- Data course diperbolehkan untuk dimasukkan _melalui_ seeding atau input manual pada database GUI (eg. pgadmin4 atau dbeaver).

> Student diharapkan menjunjung tinggi INTEGRITAS. Segala bentuk ketidakjujuran meliputi peniruan, plagiarisme, pemalsuan pengerjaan akan mendapatkan tindakan tegas dari akademik.

Demo aplikasi bisa di cek pada link berikut: [Hacktiv Course](https://drive.google.com/file/d/1vDi-8f0xT4T4U89GlgCxIQ6Y1vL2gezZ/view?usp=sharing).

## Bobot penilaian

- RESTful API
- Protecting App
- Basic Web Development & Layouting
- UI Library
- State Management
- Testing

## Components

Buatlah client side kalian yang terdiri dari beberapa component-component berikut:

- Login Page.
- Home Page.
- AddCourse Page.
- MyCourse Page.
- Course Card.
- MyCourse Card.
- Navbar.

## Release 0 - Setup Project

Lakukan setup project full stack dengan menginstall package yang sudah diajarkan sebelumnya. Adapun folder yang dibuat hanya ada `server` & `client`. Pada project ini terdapat:

1. `api_docs.md`: API Docs sebagai guideline pembuatan server.
2. server: untuk pembuatan REST API.
3. template: CSS template yang bisa membantu dalam pembuatan client.
4. server/`__tests__`: Testing untuk server

### 0.1 Setup: Server

Aplikasi ini memiliki 3 entitas atau table. Buatlah Model sesuai `api_docs.md` pada folder server dan buatlah relasi yang sesuai antara User, Course dan MyCourse. `User` memiliki relasi many to many terhadap `Course` melalui table conjuction `MyCourse`. Jangan lupa implementasi _error handling_ untuk error yang ada pada server.

### Deployed server

Server ini sebagai backup ketika kalian mengalami kesulitan dalam pengerjaan server.

- url: [Hacktiv Course API](https://api.p2.lc3s6.foxhub.space).
- registered user:

  ```json
  [
    { 
      "email" : "user1@mail.com", 
      "password": "user1" 
    },
    { 
      "email" : "user2@mail.com", 
      "password": "user2" 
    }
  ]
  ```

Jika ingin membuat user baru, silahkan lakukan register user dengan email yg belum terdaftar sesuai `api_docs.md`

### 0.2 Setup: Client

Aplikasi ini menggunakan `ReactJS`. Buatlah folder `client` dengan menggunakan `vite` dan `react-router` pada client side.

## Release 1 - Authentication: Register & Login

### 1.1 Server Side - Register

- Buatlah sebuah endpoint `POST /register` dengan request, status code, response success, response error (+global error) sesuai `api_doc.md` no 1.
- Pastikan kalian melakukan _hash_ password menggunakan `bcrypt` sebelum kalian simpan pada database.

### 1.2 Server Side - Login

- Buatlah sebuah endpoint `POST /login` dengan request, status code, response success, response error (+global error) sesuai `api_doc.md` no 2.
- Buatlah proses untuk _generate_ **access token**  menggunakan `jsonwebtoken`, pastikan kalian hanya menyimpan data rahasia pada env.

### 1.3 Client Side - Login

- CATATAN: untuk proses register tidak perlu dibuat client side, Register hanya dilakukan dengan HTTP Client.
- Buatlah halaman `/login` untuk menampilkan form login user seperti demo.
- Jika proses login berhasil maka akan menuju halaman `/` atau home dan menampilkan semua _courses_ yang ada dari server.
- Pastikan ketika user sudah berhasil login, ketika direfresh maka user tidak harus login lagi.

### 1.4 Client Side: Logout

- Buatlah tombol logout dan ketika proses logout berhasil maka akan kembali ke tampilan login.
- Pastikan ketika user sudah berhasil logout, ketika direfresh maka user akan ke tampilan login.

## Release 2 - Fetch Courses

Feature ini bertujuan untuk memberikan kepada user list course yang ada pada aplikasi.

### 2.1 Server Side: GET Courses

- Buatlah sebuah endpoint `GET /courses` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no 3.
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint.
- Buatlah initial data course sesuai data json yang diberikan, boleh menggunakan seeding atau input manual pada database GUI.

### 2.2 Client Side: Halaman Home

- Buatlah halaman `/` untuk menampilkan list courses di client dari server yang sudah dibuat sesuai `api_doc.md`.
- Terapkan konsep _component_ untuk setiap bagian yang bersifat `reuseable`.
- Gunakan _State Management_ untuk fetching, mengelola dan menyimpan data courses yang diambil dari server.
- **TAMBAHAN**: Pastikan hanya User yang sudah login yang bisa melihat halaman Home.

## Release 3 - Enroll Course

Feature ini bertujuan agar user bisa mendaftar pada course yang diinginkan.

### 3.1 Server Side: POST course

- Buatlah sebuah endpoint `POST /mycourses/:courseId` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no 4.
- **TAMBAHAN**: user tidak boleh mendaftar pada course yang sama.

### 3.2 Client Side: Feature Enroll Course

- Pada halaman Add Course, Integrasikan tombol `Enroll` di form sehingga dapat menambahkan Course ke daftar mycourse User yang sedang login.
- Jika berhasil menambahkan Course maka user akan diarahkan ke Halaman My Courses.
- Jika berhasil maka list My Courses user akan bertambah otomatis di client (Pastikan website kalian reaktif).

## Release 4 - Fetch My Courses

Feature ini bertujuan agar user bisa melihat daftar courses yang sudah ditambahkan

### 4.1 Server Side: GET My Courses

- Buatlah sebuah endpoint `GET /mycourses` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no 5.
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint.
- **Data yang di _fetch_ hanya milik User yang sedang login**.

### 4.2 Client: Halaman My Courses

- Buatlah halaman `/mycourses` untuk menampilkan list my courses User di client dari server yang sudah dibuat sesuai `api_doc.md`.
- Buatlah Navigasi untuk menuju halaman `/mycourses`.
- Buatlah Card untuk menampilkan list dari My Courses dan tambahkan tombol `Complete Course` pada setiap Card yang ada.
- Terapkan konsep component untuk setiap bagian yang bersifat `reuseable`.
- Gunakan _State Management_ untuk fetching, mengelola dan menyimpan data my courses yang diambil dari server.

## Release 5 - Update My Courses

Feature ini bertujuan agar user dapat menyelesaikan course yang dipilih dengan mengubah status course menjadi `completed`.

### 5.1 Server Side: PATCH My Courses

- Buatlah sebuah endpoint `PATCH /mycourses/:id` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no 6.
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint.
- **Authorization Check**: Pastikan, data yang diubah hanya data yang dibuat oleh user tersebut.

### 5.2 Client Side: Feature Update Course Status

- Pada halaman My Course, Integrasikan tombol `Complete Course` sehingga user dapat mengubah status Course menjadi `completed`.
- Jika berhasil update Status My Course maka list my course akan berubah sesuai dengan data yang di-_update_ tanpa harus di refresh (Pastikan website kalian reaktif).
- Gunakan _State Management_ untuk fetching, mengelola dan menyimpan data course yang diambil dari server.
~
## Github Live Code Workflow

Dalam pengerjaan live code, kalian diminta untuk melakukan `commit` sebagai check point pengerjaan. Jika pengerjaan release sudah selesai, segera lakukan `add commit push` dengan message relase yang jelas.

- Contoh 1: `git commit -m "Release 0.1 Setup: Server, Done"`.
- Contoh 2: `git commit -m "Release 3.1 Server: POST favourites, Done"`.
- Contoh 3: `git commit -m "2.2 Client: Halaman Home, Done No TAMBAHAN"`.

## Testing

Kalian bisa menguji apakah REST API yang sudah kalian buat sesuai dengan docs yang diharapkan dengan testing berikut:

1. Drop db testing: `sequelize --env test db:drop`.
2. Create db testing: `sequelize --env test db:create`.
3. Migrate db testing: `sequelize --env test db:migrate`.
4. Ketika run test, `app.listen` nya boleh dicomment atau bikin di file `bin/www` dan di file `app.js` lakukan `module.exports = app`.
5. Pada package.json tambahkan script `"test": "jest --runInBand --forceExit"`.
