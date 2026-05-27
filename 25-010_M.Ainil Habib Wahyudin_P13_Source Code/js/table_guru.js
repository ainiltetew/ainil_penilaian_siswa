async function loadGuru() {

  let guru = JSON.parse(
    localStorage.getItem("guru")
  );

  let akun = JSON.parse(
    localStorage.getItem("akun")
  );

  // load siswa
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

  tampilkanTabel(guru, akun);
}

function tampilkanTabel(guru, akun) {

  let tbody =
    document.getElementById("tbody-guru");

  tbody.innerHTML = "";

  guru.forEach((item, index) => {

    let dataAkun = akun.find(
      (a) => a.id_user == item.nip
    );

    tbody.innerHTML += `
      <tr>

        <th>${index + 1}</th>

        <td>${item.nip}</td>
        <td>${item.nama}</td>
        <td>${dataAkun?.email ?? "-"}</td>
        <td>${item.jenis_kelamin}</td>
        <td>${item.agama}</td>
        <td>${item.asal}</td>
        <td>${item.no_telpon}</td>

        <td>

          <button
            class="btn btn-warning btn-sm"
            onclick="editGuru('${item.nip}')"
          >
            Edit
          </button>

          <button
            class="btn btn-danger btn-sm"
            onclick="hapusGuru('${item.nip}')"
          >
            Hapus
          </button>

        </td>

      </tr>
    `;
  });
}

function editGuru(nip) {

  window.location.href =
    `form_guru.html?nip=${nip}`;
}

function hapusGuru(nip) {

  let konfirmasi = confirm(
    "Yakin ingin menghapus data?"
  );

  if (!konfirmasi) return;

  // hapus guru
  let guru = JSON.parse(
    localStorage.getItem("guru")
  ) || [];

  guru = guru.filter(
    (item) => item.nip != nip
  );

  localStorage.setItem(
    "guru",
    JSON.stringify(guru)
  );

  // hapus akun
  let akun = JSON.parse(
    localStorage.getItem("akun")
  ) || [];

  akun = akun.filter(
    (item) => item.nip != nip
  );

  localStorage.setItem(
    "akun",
    JSON.stringify(akun)
  );

  alert("Data berhasil dihapus");

  loadGuru();
}

loadGuru();