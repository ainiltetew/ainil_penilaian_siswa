$(document).ready(function () {
  

  let params =
    new URLSearchParams(window.location.search);

  let editNis = params.get("nis");

  // mode tambah
  if (!editNis) {

    $("#nis").val(
      generateNis()
    );

  }

  // =========================
  // MODE EDIT
  // =========================

  if (editNis) {

    let siswa = JSON.parse(
      localStorage.getItem("siswa")
    ) || [];

    let akun = JSON.parse(
      localStorage.getItem("akun")
    ) || [];

    let dataSiswa = siswa.find(
      (item) => item.nis == editNis
    );

    let dataAkun = akun.find(
      (item) => item.id_user == editNis
    );

    if (dataSiswa) {

      $("#nis").val(dataSiswa.nis);
      $("#nama").val(dataSiswa.nama);
      $("#tanggal_lahir")
        .val(dataSiswa.tanggal_lahir);

      $("#email").val(dataAkun?.email);

      $("#password")
        .val(dataAkun?.password);

      $("#agama").val(dataSiswa.agama);

      $("#asal").val(dataSiswa.asal);

      $(
        `input[name='jk'][value='${dataSiswa.jenis_kelamin}']`
      ).prop("checked", true);

    }
  }

  // =========================
  // VALIDATION
  // =========================

  $.validator.addMethod(
    "hurufOnly",

    function (value, element) {

      return this.optional(element)
        || /^[a-zA-Z\s]+$/.test(value);

    },

    "Hanya boleh huruf"
  );

  $("#form-siswa").validate({

    onfocusout: false,
    onkeyup: false,
    onclick: false,

    rules: {

      nis: {
        required: true,
        minlength: 3,
        maxlength: 10
      },

      nama: {
        required: true,
        minlength: 3,
        hurufOnly: true
      },

      email: {
        required: true,
        email: true
      },

      password: {
        required: true,
        minlength: 4
      },

      jk: {
        required: true
      },

      tanggal_lahir: {
        required: true
      },

      agama: {
        required: true
      },

      asal: {
        required: true,
        minlength: 3
      }

    },

    messages: {

      nis: {
        required: "NIS wajib diisi",
        number: "NIS hanya angka",
        minlength: "Minimal 3 digit",
        maxlength: "Maksimal 10 digit"
      },

      nama: {
        required: "Nama wajib diisi",
        minlength: "Minimal 3 huruf"
      },

      email: {
        required: "Email wajib diisi",
        email: "Format email tidak valid"
      },

      password: {
        required: "Password wajib diisi",
        minlength: "Minimal 4 karakter"
      },

      jk: {
        required: "Pilih jenis kelamin"
      },

      tanggal_lahir: {
        required: "Tanggal lahir wajib diisi"
      },

      agama: {
        required: "Pilih agama"
      },

      asal: {
        required: "Asal wajib diisi"
      }

    },

    submitHandler: function () {

      let siswa = JSON.parse(
        localStorage.getItem("siswa")
      ) || [];

      let akun = JSON.parse(
        localStorage.getItem("akun")
      ) || [];

      // =========================
      // VALIDASI NIS UNIK
      // =========================

      let cekNis = siswa.find(
        (item) =>
          item.nis == $("#nis").val()
          && item.nis != editNis
      );

      if (cekNis) {

        alert("NIS sudah digunakan");
        return;
      }

      // =========================
      // VALIDASI EMAIL UNIK
      // =========================

      let cekEmail = akun.find(
        (item) =>
          item.email == $("#email").val()
          && item.nis != editNis
      );

      if (cekEmail) {

        alert("Email sudah digunakan");
        return;
      }

      // =========================
      // DATA SISWA
      // =========================

      let dataSiswa = {

        nis: $("#nis").val(),

        nama: $("#nama").val(),

        jenis_kelamin:
          $("input[name='jk']:checked").val(),

        tanggal_lahir:
          $("#tanggal_lahir").val(),

        agama: $("#agama").val(),

        asal: $("#asal").val()

      };

      // =========================
      // DATA AKUN
      // =========================

      let dataAkun = {

        id: Date.now(),

        id_user: $("#nis").val(),

        email: $("#email").val(),

        password: $("#password").val(),

        role: "siswa"

      };

      // =========================
      // MODE EDIT
      // =========================

      if (editNis) {

        let indexSiswa = siswa.findIndex(
          (item) => item.nis == editNis
        );

        siswa[indexSiswa] = dataSiswa;

        let indexAkun = akun.findIndex(
          (item) => item.nis == editNis
        );

        akun[indexAkun] = dataAkun;

        alert("Data berhasil diupdate");

      }

      // =========================
      // MODE TAMBAH
      // =========================

      else {

        siswa.push(dataSiswa);

        akun.push(dataAkun);

        alert("Data berhasil ditambahkan");

      }

      localStorage.setItem(
        "siswa",
        JSON.stringify(siswa)
      );

      localStorage.setItem(
        "akun",
        JSON.stringify(akun)
      );

      window.location.href =
        "data_siswa.html";

    }

  });
function generateNis() {

  let siswa = JSON.parse(
    localStorage.getItem("siswa")
  ) || [];

  // kalau belum ada data
  if (siswa.length === 0) {
    return "S001";
  }

  // ambil nomor terbesar
  let nomorTerbesar = 0;

  siswa.forEach((item) => {

    // ambil angka dari S001
    let nomor = parseInt(
      item.nis.replace("S", "")
    );

    if (nomor > nomorTerbesar) {
      nomorTerbesar = nomor;
    }

  });

  // tambah 1
  nomorTerbesar++;

  // ubah jadi format 3 digit
  let nomorBaru =
    String(nomorTerbesar).padStart(3, "0");

  return `S${nomorBaru}`;
}


    const togglePassword =
    document.querySelector("#togglePassword");
  
    const password =
    document.querySelector("#password");
  
    const toggleIcon =
    document.querySelector("#toggleIcon");
  
    // cegah input kehilangan focus
    togglePassword.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
  
    togglePassword.addEventListener("click", function () {
  
    const type =
      password.getAttribute("type") === "password"
        ? "text"
        : "password";
  
    password.setAttribute("type", type);
  
    toggleIcon.classList.toggle("fa-eye");
    toggleIcon.classList.toggle("fa-eye-slash");
  

  });
  });