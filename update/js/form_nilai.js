$(document).ready(function () {

  let params =
    new URLSearchParams(window.location.search);

  let nis =
    params.get("nis");

  let idMapel =
    params.get("id_mapel");

  let nilai = JSON.parse(
    localStorage.getItem("nilai")
  ) || [];

  // cari data lama
  let dataNilai = nilai.find(

    (item) =>

      item.nis == nis
      && item.id_mapel == idMapel

  );

  // mode edit
  if (dataNilai) {

    $("#tugas")
      .val(dataNilai.tugas);

    $("#uts")
      .val(dataNilai.uts);

    $("#uas")
      .val(dataNilai.uas);

  }

  // =====================
  // VALIDATE
  // =====================

  $("#form-nilai").validate({

    rules: {

      tugas: {
        required: true,
        min: 0,
        max: 100
      },

      uts: {
        required: true,
        min: 0,
        max: 100
      },

      uas: {
        required: true,
        min: 0,
        max: 100
      }

    },

    messages: {

      tugas: {
        required: "Nilai tugas wajib diisi",
        min: "Minimal 0",
        max: "Maksimal 100"
      },

      uts: {
        required: "Nilai UTS wajib diisi",
        min: "Minimal 0",
        max: "Maksimal 100"
      },

      uas: {
        required: "Nilai UAS wajib diisi",
        min: "Minimal 0",
        max: "Maksimal 100"
      }

    },

    submitHandler: function () {

      let nilai = JSON.parse(
        localStorage.getItem("nilai")
      ) || [];

      let dataBaru = {

        id: Date.now(),

        nis: nis,

        id_mapel: idMapel,

        tugas: $("#tugas").val(),

        uts: $("#uts").val(),

        uas: $("#uas").val()

      };

      // =====================
      // UPDATE
      // =====================

      if (dataNilai) {

        let index =
          nilai.findIndex(

            (item) =>

              item.nis == nis
              && item.id_mapel == idMapel

          );

        nilai[index] = dataBaru;

        alert(
          "Nilai berhasil diupdate"
        );

      }

      // =====================
      // INSERT
      // =====================

      else {

        nilai.push(dataBaru);

        alert(
          "Nilai berhasil ditambahkan"
        );

      }

      localStorage.setItem(
        "nilai",
        JSON.stringify(nilai)
      );

      window.location.href =
        "penilaian.html";

    }

  });

});