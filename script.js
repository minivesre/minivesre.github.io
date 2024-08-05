// Inisialisasi itemsArray dengan format objek
const itemsArray = JSON.parse(localStorage.getItem("items")) || [];

// Menampilkan item yang sudah ada di localStorage
function displayItems() {
    const toDoList = document.querySelector(".to-do-list");
    toDoList.innerHTML = ""; // Kosongkan daftar sebelum menambahkan item baru

    itemsArray.forEach((item, i) => {
        toDoList.innerHTML += `
            <div class="item ${item.completed ? 'completed' : ''}">
                <div class="input-controller">
                    <textarea disabled>${item.text}</textarea>
                    <div class="edit-controller">
                        <i class="fa-solid fa-trash deleteBtn" data-index="${i}"></i>
                        <i class="fa-regular fa-pen-to-square editBtn" data-index="${i}"></i>
                        <i class="fa-solid fa-check completeBtn" data-index="${i}"></i>
                    </div>
                </div>
                <div class="update-controller" style="display: none;">
                    <textarea>${item.text}</textarea>
                    <button class="saveBtn">Save</button>
                    <button class="cancelBtn">Cancel</button>
                </div>
            </div>`;
    });

    // Aktifkan event listeners
    activeDeleteListeners();
    activeEditListeners();
    activeSaveListeners();
    activeCancelListeners();
    activeCompleteListeners(); // Aktifkan listener untuk tombol selesai
}

// Menambahkan item baru ke array dan localStorage
function createItem(item) {
    if (item.value.trim() === "") return; // Jangan tambahkan item kosong
    itemsArray.push({ text: item.value, completed: false });
    localStorage.setItem("items", JSON.stringify(itemsArray));
    displayItems(); // Perbarui tampilan setelah menambahkan item
}

// Memperbarui item di array dan localStorage
function updateItem(text, i) {
    itemsArray[i].text = text;
    localStorage.setItem("items", JSON.stringify(itemsArray));
    displayItems(); // Perbarui tampilan setelah memperbarui item
}

// Menghapus item dari array dan localStorage
function deleteItem(i) {
    itemsArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    displayItems(); // Perbarui tampilan setelah menghapus item
}

// Menandai item sebagai selesai
function toggleComplete(index) {
    itemsArray[index].completed = !itemsArray[index].completed;
    localStorage.setItem("items", JSON.stringify(itemsArray));
    displayItems(); // Perbarui tampilan setelah menandai item selesai
}

// Menambahkan event listeners untuk tombol selesai
function activeCompleteListeners() {
    document.querySelectorAll(".completeBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            toggleComplete(index);
        });
    });
}

// Menambahkan event listeners untuk tombol delete
function activeDeleteListeners(){
    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            deleteItem(index);
        });
    });
}

// Menambahkan event listeners untuk tombol edit
function activeEditListeners(){
    document.querySelectorAll(".editBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const updateController = e.target.closest('.item').querySelector('.update-controller');
            const textarea = updateController.querySelector('textarea');
            updateController.style.display = 'block';
            textarea.disabled = false;
        });
    });
}

// Menambahkan event listeners untuk tombol save
function activeSaveListeners(){
    document.querySelectorAll(".saveBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.closest('.item').querySelector('.completeBtn').dataset.index;
            const textarea = e.target.closest('.update-controller').querySelector('textarea');
            updateItem(textarea.value, index);
        });
    });
}

// Menambahkan event listeners untuk tombol cancel
function activeCancelListeners(){
    document.querySelectorAll(".cancelBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const updateController = e.target.closest('.update-controller');
            updateController.style.display = 'none';
            const textarea = updateController.querySelector('textarea');
            textarea.disabled = true;
        });
    });
}

// Menyiapkan tampilan ketika halaman dimuat
window.onload = function () {
    displayItems();
}

// Menambahkan event listener untuk tombol enter
document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item");
    createItem(item);
});

// Menambahkan event listener untuk menekan Enter pada input
document.querySelector("#item").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Menghindari pengiriman formulir jika berada dalam formulir
        const item = document.querySelector("#item");
        createItem(item);
    }
});
