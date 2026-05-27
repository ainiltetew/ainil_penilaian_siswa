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
  // JENIS PELANGGARAN
  // =====================

  let jenis = JSON.parse(
    localStorage.getItem(
      "jenis_pelanggaran"
    )
  );

  if (!jenis) {

    let response = await fetch(
      "database/jenis_pelanggaran.json"
    );

    jenis = await response.json();

    localStorage.setItem(
      "jenis_pelanggaran",
      JSON.stringify(jenis)
    );

  }

  // =====================
  // PELANGGARAN
  // =====================

  let pelanggaran = JSON.parse(
    localStorage.getItem(
      "pelanggaran"
    )
  );

  if (!pelanggaran) {

    let response = await fetch(
      "database/pelanggaran.json"
    );

    pelanggaran =
      await response.json();

    localStorage.setItem(
      "pelanggaran",
      JSON.stringify(pelanggaran)
    );

  }

  tampilkanTabel(
    siswa,
    jenis,
    pelanggaran
  );

}

function tampilkanTabel(
  siswa,
  jenis,
  pelanggaran
) {

  let tbody =
    document.getElementById(
      "tbody-pelanggaran"
    );

  tbody.innerHTML = "";

  pelanggaran.forEach(
    (item, index) => {

      let dataSiswa = siswa.find(
        (s) => s.nis == item.nis
      );

      let dataJenis = jenis.find(
        (j) =>
          j.id_jenis == item.id_jenis
      );

      tbody.innerHTML += `
        <tr>

          <th>${index + 1}</th>

          <td>${item.nis}</td>

          <td>
            ${dataSiswa?.nama ?? "-"}
          </td>

          <td>
            ${dataJenis?.nama_pelanggaran ?? "-"}
          </td>

          <td>
            ${dataJenis?.poin ?? "-"}
          </td>

          <td>
            ${item.tanggal}
          </td>

          <td>

            <button
              class="btn btn-warning btn-sm"
              onclick="
                editPelanggaran(
                  '${item.id_pelanggaran}'
                )
              "
            >
              Edit
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick="
                hapusPelanggaran(
                  '${item.id_pelanggaran}'
                )
              "
            >
              Hapus
            </button>

          </td>

        </tr>
      `;
    }
  );
}

function editPelanggaran(id) {

  window.location.href =
    `form_pelanggaran.html?id=${id}`;

}

function hapusPelanggaran(id) {

  let konfirmasi = confirm(
    "Yakin ingin menghapus?"
  );

  if (!konfirmasi) return;

  let pelanggaran =
    JSON.parse(
      localStorage.getItem(
        "pelanggaran"
      )
    ) || [];

  pelanggaran =
    pelanggaran.filter(
      (item) =>
        item.id_pelanggaran != id
    );

  localStorage.setItem(
    "pelanggaran",
    JSON.stringify(pelanggaran)
  );

  alert("Data berhasil dihapus");

  loadData();

}

loadData();