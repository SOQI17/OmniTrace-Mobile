
import React from 'react';
import { jsPDF } from 'jspdf';
import { Asset } from '../types';
import { Printer } from 'lucide-react';
import { AssetLifecycleService } from '../services/AssetLifecycleService';

interface AssetLabelPDFProps {
  asset: Asset;
}

export const AssetLabelPDF: React.FC<AssetLabelPDFProps> = ({ asset }) => {
  
  const generatePDF = () => {
    // Label size: 5cm x 2.5cm
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [50, 25]
    });

    // Border (Safe Zone)
    doc.setLineWidth(0.2);
    doc.rect(1, 1, 48, 23);

    // Header
    doc.setFontSize(4);
    doc.text("OmniTrace Activos Médicos", 2, 4);

    // Part Number (Large Text)
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(asset.metadata.pn, 2, 8);

    // Metadata Block
    doc.setFontSize(3.5);
    doc.setFont("helvetica", "normal");
    doc.text(`S/N: ${asset.metadata.serial_ge}`, 2, 11);
    doc.text(`WF: ${asset.metadata.workflow_id}`, 2, 13);
    doc.text(`Ord: ${asset.metadata.numero_orden_ge}`, 2, 15);
    
    // Description (Truncated)
    const desc = asset.metadata.description.length > 25 
        ? asset.metadata.description.substring(0, 25) + '...' 
        : asset.metadata.description;
    doc.text(desc, 2, 18);

    // QR Code Area
    doc.setFillColor(0, 0, 0);
    doc.rect(34, 2, 13, 13, 'F'); 
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(2);
    doc.text("SCAN ME", 36, 8);

    // Decode check (Human readable ID)
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(3);
    const idShort = asset.id.substring(0, 8);
    doc.text(`ID: ${idShort}`, 34, 18);
    
    // Condition
    doc.setFont("helvetica", "bold");
    doc.text(asset.metadata.condicion, 34, 21);

    // Save
    doc.save(`ETIQUETA_${asset.metadata.pn}_${asset.metadata.workflow_id}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      disabled={!asset.warehouse.qr_hash}
      className={`flex items-center gap-2 px-4 py-3 rounded shadow-sm text-sm font-medium transition-colors w-full justify-center
        ${!asset.warehouse.qr_hash 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
    >
      <Printer size={16} />
      <span>Imprimir (50x25mm)</span>
    </button>
  );
};