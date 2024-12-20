// Ініціалізація конвертера Showdown
const converter = new showdown.Converter({
    simpleLineBreaks: true,
    ghCompatibleHeaderId: true,
});

// Захоплення елементів DOM
const markdownInput = document.getElementById('markdown-input');
const markdownPreview = document.getElementById('markdown-preview');

// Кнопки для форматування
const addHeadingButton = document.getElementById('add-heading');
const addLineButton = document.getElementById('add-line');
const addBulletListButton = document.getElementById('add-bullet-list');
const addNumberedListButton = document.getElementById('add-numbered-list');
const addQuoteButton = document.getElementById('add-quote');
const addCodeBlockButton = document.getElementById('add-code-block');
const loadButton = document.getElementById('load-btn');
const saveButton = document.getElementById('save-btn');
// Функція оновлення прев'ю
function updatePreview() {
    const markdownText = markdownInput.value;
    const htmlContent = converter.makeHtml(markdownText);
    markdownPreview.innerHTML = htmlContent;
}

// Додаємо анімацію для кнопок
function animateButton(button) {
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 200);
}

// Вставка тексту на новий рядок
function insertAtNewLine(text) {
    const cursorPos = markdownInput.selectionStart;
    const textBefore = markdownInput.value.substring(0, cursorPos);
    const textAfter = markdownInput.value.substring(cursorPos);
    const prefix = textBefore.endsWith("\n") || textBefore === "" ? "" : "\n";
    const newText = `${prefix}${text}\n`;
    markdownInput.value = textBefore + newText + textAfter;
    markdownInput.selectionStart = markdownInput.selectionEnd = cursorPos + newText.length;
    updatePreview();
}

// Обробники кнопок для форматування
addHeadingButton.addEventListener('click', () => {
    animateButton(addHeadingButton);
    insertAtNewLine("## Новий заголовок");
});

addLineButton.addEventListener('click', () => {
    animateButton(addLineButton);
    insertAtNewLine("---");
});

addBulletListButton.addEventListener('click', () => {
    animateButton(addBulletListButton);
    insertAtNewLine("- Елемент списку");
});

addNumberedListButton.addEventListener('click', () => {
    animateButton(addNumberedListButton);
    insertAtNewLine("1. Елемент списку");
});

addQuoteButton.addEventListener('click', () => {
    animateButton(addQuoteButton);
    insertAtNewLine("> Цитата");
});

addCodeBlockButton.addEventListener('click', () => {
    animateButton(addCodeBlockButton);
    insertAtNewLine("```\nКод\n```");
});
// Функція завантаження файлу
loadButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md';

    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            markdownInput.value = e.target.result;
            updatePreview();
        };
        reader.readAsText(file);
    });

    input.click();
});

// Функція збереження файлу
saveButton.addEventListener('click', () => {
    const markdownText = markdownInput.value;
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.md';
    link.click();
});
// Оновлення прев'ю під час введення тексту
markdownInput.addEventListener('input', updatePreview);

// Початковий рендеринг
updatePreview();

