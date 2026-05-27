$(document).ready(function () {

  let params =
    new URLSearchParams(window.location.search);

  let editNip = params.get("nip");

  // mode tambah
  if (!editNip) {

    $("#nip").val(
      generateNip()
    );

  }

  // =========================
  // MODE EDIT
  // =========================

  if (editNip) {

    let guru = JSON.parse(
      localStorage.getItem("guru")
    ) || [];

    let akun = JSON.parse(
      localStorage.getItem("akun")
    ) || [];

    let dataGuru = guru.find(
      (item) => item.nip == editNip
    );

    let dataAkun = akun.find(
      (item) => item.id_user == editNip
    );

    if (dataGuru) {

      $("#nip").val(dataGuru.nip);
      $("#nama").val(dataGuru.nama);
      $("#tanggal_lahir")
        .val(dataGuru.tanggal_lahir);

      $("#email").val(dataAkun?.email);

      $("#password")
        .val(dataAkun?.password);

      $("#agama").val(dataGuru.agama);

      $("#asal").val(dataGuru.asal);

      $("#no_telpon").val(dataGuru.no_telpon);

      $(
        `input[name='jk'][value='${dataGuru.jenis_kelamin}']`
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

  $("#form-guru").validate({

    onfocusout: false,
    onkeyup: false,
    onclick: false,

    rules: {

      nip: {
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
      },
      no_telpon: {
        required: true,
        minlength: 3
      }

    },

    messages: {

      nip: {
        required: "NIP wajib diisi",
        number: "NIP hanya angka",
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
      },
      no_telpon: {
        required: "No Telepon wajib diisi"
      }

    },

    submitHandler: function () {

      let guru = JSON.parse(
        localStorage.getItem("guru")
      ) || [];

      let akun = JSON.parse(
        localStorage.getItem("akun")
      ) || [];

      // =========================
      // VALIDASI NIP UNIK
      // =========================

      let cekNip = guru.find(
        (item) =>
          item.nip == $("#nip").val()
          && item.nip != editNip
      );

      if (cekNip) {

        alert("NIP sudah digunakan");
        return;
      }

      // =========================
      // VALIDASI EMAIL UNIK
      // =========================

      let cekEmail = akun.find(
        (item) =>
          item.email == $("#email").val()
          && item.id_user != editNip
      );

      if (cekEmail) {

        alert("Email sudah digunakan");
        return;
      }

      // =========================
      // DATA GURU
      // =========================

      let dataGuru = {

        nip: $("#nip").val(),

        nama: $("#nama").val(),

        jenis_kelamin:
          $("input[name='jk']:checked").val(),

        tanggal_lahir:
          $("#tanggal_lahir").val(),

        agama: $("#agama").val(),

        asal: $("#asal").val(),

        no_telpon: $("#no_telpon").val()

      };

      // =========================
      // DATA AKUN
      // =========================

      let dataAkun = {

        id: Date.now(),

        id_user: $("#nip").val(),

        email: $("#email").val(),

        password: $("#password").val(),

        role: "guru"

      };

      // =========================
      // MODE EDIT
      // =========================

      if (editNip) {

        let indexGuru = guru.findIndex(
          (item) => item.nip == editNip
        );

        guru[indexGuru] = dataGuru;

        let indexAkun = akun.findIndex(
          (item) => item.nip == editNip
        );

        akun[indexAkun] = dataAkun;

        alert("Data berhasil diupdate");

      }

      // =========================
      // MODE TAMBAH
      // =========================

      else {

        guru.push(dataGuru);

        akun.push(dataAkun);

        alert("Data berhasil ditambahkan");

      }

      localStorage.setItem(
        "guru",
        JSON.stringify(guru)
      );

      localStorage.setItem(
        "akun",
        JSON.stringify(akun)
      );

      window.location.href =
        "data_guru.html";

    }

  });

function generateNip() {

  let guru = JSON.parse(
    localStorage.getItem("guru")
  ) || [];

  // kalau belum ada data
  if (guru.length === 0) {
    return "G001";
  }

  // ambil nomor terbesar
  let nomorTerbesar = 0;

  guru.forEach((item) => {

    // ambil angka dari S001
    let nomor = parseInt(
      item.nip.replace("G", "")
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

  return `G${nomorBaru}`;
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