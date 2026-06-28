// ================================
// LOGIN UNIWELF / UNIWELL
// Usuario: Admin
// Contraseña: 12345
// ================================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const btn = document.getElementById("nextBtn");
    const loader = document.getElementById("loginLoader");

    if (!form || !btn) {
        console.error("No se encontró el formulario o el botón de login.");
        return;
    }

    function limpiarTexto(texto) {
        return texto
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuario = limpiarTexto(document.getElementById("usuario").value);
        const contrasena = limpiarTexto(document.getElementById("contrasena").value);

        btn.innerHTML = "Verificando...";
        btn.style.opacity = "0.15";
        btn.disabled = true;

        setTimeout(() => {
            if (usuario === "admin" && contrasena === "12345") {
                sessionStorage.setItem("uniwell_access", "granted");

                btn.innerHTML = "Acceso Correcto ✓";
                btn.style.background = "#16a380";

                if (loader) loader.classList.add("active");

                setTimeout(() => {
                    window.location.replace("presentacion.html");
                }, 2200);
            } else {
                btn.innerHTML = "Credenciales incorrectas";
                btn.style.background = "#c0392b";

                setTimeout(() => {
                    btn.innerHTML = "Iniciar sesión";
                    btn.style.opacity = "1";
                    btn.style.background = "";
                    btn.disabled = false;
                }, 1800);
            }
        }, 700);
    });
});
