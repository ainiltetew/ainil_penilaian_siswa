async function loadSiswa() {

  let siswa = JSON.parse(
    localStorage.getItem("siswa")
  );

  let akun = JSON.parse(
    localStorage.getItem("akun")
  );

  // load siswa
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

  // load akun
  if (!akun) {

    let response = await fetch(
      "database/akun.json"
    );

    akun = await response.json();

    localStorage.setItem(
      "akun",
      JSON.stringify(akun)
    );
  }

  tampilkanTabel(siswa, akun);
}

function tampilkanTabel(siswa, akun) {

  let tbody =
    document.getElementById("tbody-siswa");

  tbody.innerHTML = "";

  siswa.forEach((item, index) => {

    let dataAkun = akun.find(
      (a) => a.id_user == item.nis
    );

    tbody.innerHTML += `
      <tr>

        <th>${index + 1}</th>

        <td>${item.nis}</td>
        <td>${item.nama}</td>
        <td>${dataAkun?.email ?? "-"}</td>
        <td>${item.jenis_kelamin}</td>
        <td>${item.agama}</td>
        <td>${item.asal}</td>

        <td>

          <button
            class="btn btn-warning btn-sm"
            onclick="editSiswa('${item.nis}')"
          >
            Edit
          </button>

          <button
            class="btn btn-danger btn-sm"
            onclick="hapusSiswa('${item.nis}')"
          >
            Hapus
          </button>

        </td>

      </tr>
    `;
  });
}

function editSiswa(nis) {

  window.location.href =
    `form_siswa.html?nis=${nis}`;
}

function hapusSiswa(nis) {

  let konfirmasi = confirm(
    "Yakin ingin menghapus data?"
  );

  if (!konfirmasi) return;

  // hapus siswa
  let siswa = JSON.parse(
    localStorage.getItem("siswa")
  ) || [];

  siswa = siswa.filter(
    (item) => item.nis != nis
  );

  localStorage.setItem(
    "siswa",
    JSON.stringify(siswa)
  );

  // hapus akun
  let akun = JSON.parse(
    localStorage.getItem("akun")
  ) || [];

  akun = akun.filter(
    (item) => item.nis != nis
  );

  localStorage.setItem(
    "akun",
    JSON.stringify(akun)
  );

  alert("Data berhasil dihapus");

  loadSiswa();
}

loadSiswa();