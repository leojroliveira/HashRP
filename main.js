document.getElementById('checkButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const fileName = file.name.toUpperCase();
        const parts = fileName.split('-');

        if (parts.length === 4 && parts[3].endsWith('.CSV')) {
            const hashInName = parts[3].slice(0, -4).toLowerCase(); // Remove .CSV e converte para minúsculas

            const reader = new FileReader();
            reader.onload = function (event) {
                const data = event.target.result;
                crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const calculatedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toLowerCase();

                    const resultElement = document.getElementById('result');

                    if (calculatedHash === hashInName) {
                        resultElement.innerText = 'O hash é válido!';
                    } else {
                        resultElement.innerText = 'O hash não é válido!';
                    }
                }).catch(err => {
                    document.getElementById('result').innerText = 'Erro ao calcular o hash: ' + err.message;
                });
            };
            reader.readAsArrayBuffer(file);
        } else {
            document.getElementById('result').innerText = 'Formato de nome de arquivo inválido.';
        }
    } else {
        document.getElementById('result').innerText = 'Por favor, selecione um arquivo.';
    }
});
