$(document).ready(function () {

  let params =
    new URLSearchParams(
      window.location.search
    );

  let editId =
    params.get("id");

  let siswa = JSON.parse(
    localStorage.getItem("siswa")
  ) || [];

  let jenis = JSON.parse(
    localStorage.getItem(
      "jenis_pelanggaran"
    )
  ) || [];

  let pelanggaran = JSON.parse(
    localStorage.getItem(
      "pelanggaran"
    )
  ) || [];

  // =====================
  // LOAD SISWA
  // =====================

  siswa.forEach((item) => {

    $("#nis").append(`
      <option value="${item.nis}">
        ${item.nama}
      </option>
    `);

  });

  // =====================
  // LOAD JENIS
  // =====================

  jenis.forEach((item) => {

    $("#id_jenis").append(`
      <option value="${item.id_jenis}">
        ${item.nama_pelanggaran}
      </option>
    `);

  });

  // =====================
  // MODE EDIT
  // =====================

  if (editId) {

    let data =
      pelanggaran.find(
        (item) =>
          item.id_pelanggaran
          == editId
      );

    if (data) {

      $("#nis")
        .val(data.nis);

      $("#id_jenis")
        .val(data.id_jenis);

      $("#tanggal")
        .val(data.tanggal);

    }

  }

  // =====================
  // VALIDATE
  // =====================

  $("#form-pelanggaran")
    .validate({

      rules: {

        nis: {
          required: true
        },

        id_jenis: {
          required: true
        },

        tanggal: {
          required: true
        }

      },

      messages: {

        nis: {
          required:
            "Pilih siswa"
        },

        id_jenis: {
          required:
            "Pilih pelanggaran"
        },

        tanggal: {
          required:
            "Tanggal wajib diisi"
        }

      },

      submitHandler:
        function () {

          let pelanggaran =
            JSON.parse(
              localStorage.getItem(
                "pelanggaran"
              )
            ) || [];

          let dataBaru = {

            id_pelanggaran:
              editId
              ?? generateId(),

            nis:
              $("#nis").val(),

            id_jenis:
              $("#id_jenis").val(),

            tanggal:
              $("#tanggal").val()

          };

          // EDIT
          if (editId) {

            let index =
              pelanggaran.findIndex(
                (item) =>
                  item.id_pelanggaran
                  == editId
              );

            pelanggaran[index] =
              dataBaru;

            alert(
              "Data berhasil diupdate"
            );

          }

          // TAMBAH
          else {

            pelanggaran.push(
              dataBaru
            );

            alert(
              "Data berhasil ditambahkan"
            );

          }

          localStorage.setItem(
            "pelanggaran",
            JSON.stringify(
              pelanggaran
            )
          );

          window.location.href =
            "pelanggaran.html";

        }

    });

});

// =====================
// GENERATE ID
// =====================

function generateId() {

  let pelanggaran =
    JSON.parse(
      localStorage.getItem(
        "pelanggaran"
      )
    ) || [];

  if (pelanggaran.length == 0) {

    return "PL001";

  }

  let nomorTerbesar = 0;

  pelanggaran.forEach(
    (item) => {

      let nomor = parseInt(

        item.id_pelanggaran
          .replace("PL", "")

      );

      if (
        nomor > nomorTerbesar
      ) {

        nomorTerbesar = nomor;

      }

    }
  );

  nomorTerbesar++;

  return `PL${String(
    nomorTerbesar
  ).padStart(3, "0")}`;

}