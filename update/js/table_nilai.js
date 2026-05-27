async function loadData() {

  // =====================
  // SISWA
  // =====================

  let siswa = JSON.parse(
    localStorage.getItem("siswa")
  );

  if (!siswa) {

    let response = await fetch(
      "database/siswa.json"
    );

    siswa = await response.json();

    localStorage.setItem(
      "siswa",
      JSON.stringify(siswa)
    );

  }

  // =====================
  // MAPEL
  // =====================

  let mapel = JSON.parse(
    localStorage.getItem("mapel")
  );

  if (!mapel) {

    let response = await fetch(
      "database/mapel.json"
    );

    mapel = await response.json();

    localStorage.setItem(
      "mapel",
      JSON.stringify(mapel)
    );

  }

  // =====================
  // NILAI
  // =====================

  let nilai = JSON.parse(
    localStorage.getItem("nilai")
  );

  if (!nilai) {

    let response = await fetch(
      "database/nilai.json"
    );

    nilai = await response.json();

    localStorage.setItem(
      "nilai",
      JSON.stringify(nilai)
    );

  }

  loadSelectMapel(mapel);

  // ketika mapel dipilih
  $("#select-mapel").change(function () {

    let idMapel = $(this).val();

    tampilkanTabel(
      siswa,
      nilai,
      idMapel
    );

  });

}

// =====================
// LOAD SELECT
// =====================

function loadSelectMapel(mapel) {

  mapel.forEach((item) => {

    $("#select-mapel").append(`
      <option value="${item.id_mapel}">
        ${item.nama_mapel}
      </option>
    `);

  });

}

// =====================
// TABEL
// =====================

function tampilkanTabel(
  siswa,
  nilai,
  idMapel
) {

  let tbody =
    document.getElementById(
      "tbody-penilaian"
    );

  tbody.innerHTML = "";

  siswa.forEach((item, index) => {

    // cari nilai siswa
    let dataNilai = nilai.find(
      (n) =>

        n.nis == item.nis
        && n.id_mapel == idMapel
    );

    tbody.innerHTML += `
      <tr>

        <th>${index + 1}</th>

        <td>${item.nis}</td>

        <td>${item.nama}</td>

        <td>
          ${dataNilai?.tugas ?? "-"}
        </td>

        <td>
          ${dataNilai?.uts ?? "-"}
        </td>

        <td>
          ${dataNilai?.uas ?? "-"}
        </td>

        <td>

          <button
            class="btn btn-warning btn-sm"

            onclick="
              editNilai(
                '${item.nis}',
                '${idMapel}'
              )
            "
          >
            Input/Edit
          </button>

        </td>

      </tr>
    `;

  });

}

// =====================
// EDIT
// =====================

function editNilai(
  nis,
  idMapel
) {

  window.location.href =
    `form_nilai.html?nis=${nis}&id_mapel=${idMapel}`;

}

loadData();