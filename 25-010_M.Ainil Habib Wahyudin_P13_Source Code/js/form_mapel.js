$(document).ready(function () {

  let params =
    new URLSearchParams(window.location.search);

  let editId =
    params.get("id");

  // =========================
  // LOAD DATA
  // =========================

  let mapel = JSON.parse(
    localStorage.getItem("mapel")
  ) || [];

  let guru = JSON.parse(
    localStorage.getItem("guru")
  ) || [];

  // =========================
  // AUTO GENERATE ID
  // =========================

  if (!editId) {

    $("#id_mapel").val(
      generateIdMapel()
    );

  }

  // =========================
  // LOAD SELECT GURU
  // =========================

  guru.forEach((item) => {

    $("#nip").append(`
      <option value="${item.nip}">
        ${item.nama}
      </option>
    `);

  });

  // =========================
  // MODE EDIT
  // =========================

  if (editId) {

    let dataMapel = mapel.find(
      (item) =>
        item.id_mapel == editId
    );

    if (dataMapel) {

      $("#id_mapel")
        .val(dataMapel.id_mapel);

      $("#nama_mapel")
        .val(dataMapel.nama_mapel);

      $("#nip")
        .val(dataMapel.nip);

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

  $("#form-mapel").validate({

    onfocusout: false,
    onkeyup: false,
    onclick: false,

    rules: {

      nama_mapel: {
        required: true,
        minlength: 3
      },

      nip: {
        required: true
      }

    },

    messages: {

      nama_mapel: {
        required: "Nama mapel wajib diisi",
        minlength: "Minimal 3 huruf"
      },

      nip: {
        required: "Pilih guru"
      }

    },

    submitHandler: function () {

      let mapel = JSON.parse(
        localStorage.getItem("mapel")
      ) || [];

      // cek nama mapel unik
      let cekMapel = mapel.find(
        (item) =>

          item.nama_mapel.toLowerCase()
          == $("#nama_mapel").val()
            .toLowerCase()

          && item.id_mapel != editId
      );

      if (cekMapel) {

        alert(
          "Nama mapel sudah ada"
        );

        return;
      }

      let dataMapel = {

        id_mapel:
          $("#id_mapel").val(),

        nama_mapel:
          $("#nama_mapel").val(),

        nip:
          $("#nip").val()

      };

      // =========================
      // MODE EDIT
      // =========================

      if (editId) {

        let index =
          mapel.findIndex(
            (item) =>
              item.id_mapel == editId
          );

        mapel[index] = dataMapel;

        alert(
          "Data berhasil diupdate"
        );

      }

      // =========================
      // MODE TAMBAH
      // =========================

      else {

        mapel.push(dataMapel);

        alert(
          "Data berhasil ditambahkan"
        );

      }

      localStorage.setItem(
        "mapel",
        JSON.stringify(mapel)
      );

      window.location.href =
        "mapel.html";

    }

  });

});

// =========================
// GENERATE ID MAPEL
// =========================

function generateIdMapel() {

  let mapel = JSON.parse(
    localStorage.getItem("mapel")
  ) || [];

  if (mapel.length === 0) {

    return "M001";

  }

  let nomorTerbesar = 0;

  mapel.forEach((item) => {

    let nomor = parseInt(
      item.id_mapel.replace("M", "")
    );

    if (nomor > nomorTerbesar) {

      nomorTerbesar = nomor;

    }

  });

  nomorTerbesar++;

  return `M${String(
    nomorTerbesar
  ).padStart(3, "0")}`;

}