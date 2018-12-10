import './styles.css';

(() => {
  function init() {
    document.getElementById('root')!.innerHTML = 'Hello World';
    console.log('Hello World');
  }

  window.onload = init;
})();
