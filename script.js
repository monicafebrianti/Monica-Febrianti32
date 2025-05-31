document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('searchResults');

  if (!input || !resultsDiv) return;

  input.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    resultsDiv.innerHTML = '';

    if (query.length === 0) {
      return;
    }

    const matched = searchData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );

    if (matched.length === 0) {
      resultsDiv.innerHTML = '<li>Tidak ada hasil yang cocok.</li>';
      return;
    }

    matched.forEach(item => {
      const contentLower = item.content.toLowerCase();
      const idx = contentLower.indexOf(query);
      let snippet = '';

      if (idx >= 0) {
        const start = Math.max(0, idx - 20);
        const end = Math.min(item.content.length, idx + query.length + 20);
        snippet = item.content.substring(start, end);

        if (start > 0) snippet = '...' + snippet;
        if (end < item.content.length) snippet = snippet + '...';

        const regex = new RegExp(`(${query})`, 'gi');
        snippet = snippet.replace(regex, '<mark>$1</mark>');
      }

      const li = document.createElement('li');
      li.classList.add('result-item');
      li.innerHTML = `
        <div class="result-title"><a href="${item.url}">${item.title}</a></div>
        <div class="result-snippet">${snippet}</div>
      `;
      resultsDiv.appendChild(li);
    });
  });
});
