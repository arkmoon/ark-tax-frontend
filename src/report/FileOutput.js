import moment from 'moment';

export const fileOutput = (title, columns, rows) => (e) => {

  const compiledColumns = columns.map((column) => {
    return column.label;
  }).join(',');

  const compiledRows = rows.map((row) => {
    return Object.keys(row).map((cell) => {
      return row[cell];
    }).join(',');
  }).join('\r\n');

  e.preventDefault();
  let link = document.createElement('a');
  link.id = `download-${title}-csv`;
  link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`${compiledColumns}\r\n${compiledRows}`));
  link.setAttribute('download', `${title}_${moment().format('YYYY-MM-DD_HH-mm-ss')}.csv`);
  document.body.appendChild(link)
  document.querySelector(`#download-${title}-csv`).click();
  document.body.removeChild(link);
};
