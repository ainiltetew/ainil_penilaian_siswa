async function loadMapel() {

  let mapel = JSON.parse(
    localStorage.getItem("mapel")
  );

  let guru = JSON.parse(
    localStorage.getItem("guru")
  );

  // load mapel
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

  // load guru
  if (!guru) {

    let response = await fetch(
      "database/guru.json"
    );

    guru = await response.json();

    localStorage.setItem(
      "guru",
      JSON.stringify(guru)
    );

  }

  tampilkanTabel(mapel, guru);

}

function tampilkanTabel(mapel, guru) {

  let tbody =
    document.getElementById(
      "tbody-mapel"
    );

  tbody.innerHTML = "";

  mapel.forEach((item, index) => {

    let dataGuru = guru.find(
      (g) => g.nip == item.nip
    );

    tbody.innerHTML += `
      <tr>

        <th>${index + 1}</th>

        <td>${item.id_mapel}</td>

        <td>${item.nama_mapel}</td>

        <td>
          ${dataGuru?.nama ?? "-"}
        </td>

        <td>

          <button
            class="btn btn-warning btn-sm"
            onclick="editMapel('${item.id_mapel}')"
          >
            Edit
          </button>

          <button
            class="btn btn-danger btn-sm"
            onclick="hapusMapel('${item.id_mapel}')"
          >
            Hapus
          </button>

        </td>

      </tr>
    `;

  });

}

function editMapel(id) {

  window.location.href =
    `form_mapel.html?id=${id}`;

}

function hapusMapel(id) {

  let konfirmasi = confirm(
    "Yakin ingin menghapus data?"
  );

  if (!konfirmasi) return;

  let mapel = JSON.parse(
    localStorage.getItem("mapel")
  ) || [];

  mapel = mapel.filter(
    (item) =>
      item.id_mapel != id
  );

  localStorage.setItem(
    "mapel",
    JSON.stringify(mapel)
  );

  alert(
    "Data berhasil dihapus"
  );

  loadMapel();

}

loadMapel();