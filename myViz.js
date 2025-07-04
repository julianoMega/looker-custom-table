
var myViz = {
  render: function (data, config, element) {
    element.innerHTML = '';

    if (!data.tables.DEFAULT || data.tables.DEFAULT.length === 0) {
      element.innerHTML = '<p>Sem dados para exibir</p>';
      return;
    }

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.fontFamily = 'Arial, sans-serif';
    table.style.fontSize = '12px';

    const headerRow = document.createElement('tr');
    const firstRow = data.tables.DEFAULT[0];
    firstRow.forEach(cell => {
      const th = document.createElement('th');
      th.textContent = cell.field.name || cell.field.id;
      th.style.background = '#6b2e1f';
      th.style.color = 'white';
      th.style.padding = '4px';
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.tables.DEFAULT.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach((cell, idx) => {
        const td = document.createElement('td');
        td.textContent = formatCell(cell.displayValue || cell.value, idx);
        td.style.padding = '4px';
        td.style.textAlign = idx === 0 ? 'left' : 'right';

        if (typeof cell.value === 'string' && cell.value.includes('%')) {
          td.style.color = '#b85b2f';
        }

        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    element.appendChild(table);

    function formatCell(value, idx) {
      if (!isNaN(value) && value !== '') {
        return Intl.NumberFormat('pt-BR').format(value);
      }
      return value;
    }
  }
};

lookerStudio.visualizations.define(myViz);
