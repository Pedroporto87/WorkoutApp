import { TbCapture } from "react-icons/tb";
import html2canvas from 'html2canvas';
import '../styles/components/printScreen.scss'

export const PrintScreenButton = () => {
  const captureTable = () => {
    const tableElement = document.querySelector('.print-screen'); // Certifique-se de que este seletor aponte corretamente para a sua tabela
    html2canvas(tableElement).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'serie-workout-mate.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <button onClick={captureTable} className='capture-svg'> <TbCapture/></button>
  );
};
