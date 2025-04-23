import Barcode from 'react-barcode';

export default function BarcodeGenerator({ barCode }: { barCode: string }) {
  return (
    <div className="barcode-container">
      <Barcode
        value={barCode}
        width={1}
        height={30}
        format="CODE128"
        displayValue={true}
        font="Poppins, sans-serif"
        textAlign="center"
        textPosition="bottom"
        textMargin={1}
        fontSize={10}
        background="#ffffff"
        lineColor="#000000"
        margin={0}
      />
    </div>
  )
}