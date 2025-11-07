import { ref } from 'vue';
import { message } from 'ant-design-vue';

export const usePrint = () => {
  const printLoading = ref(false);

  const printOrderDetails = (order: any) => {
    if (!order) {
      message.error('Không có thông tin đơn hàng để in');
      return;
    }

    printLoading.value = true;
    
    const printContent = document.getElementById('printOrderTemplate')?.innerHTML;
    if (!printContent) {
      message.error('Không thể tạo nội dung in');
      printLoading.value = false;
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      message.error('Không thể mở cửa sổ in');
      printLoading.value = false;
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Hóa đơn đơn hàng #${order.id}</title>
        <style>
          @page {
            size: A4;
            margin: 15mm;
          }
          
          body { 
            font-family: Arial, sans-serif; 
            margin: 0;
            padding: 0;
            line-height: 1.3;
            font-size: 12px;
            height: 100vh;
            overflow: hidden;
          }
          
          .print-content { 
            max-width: 100%; 
            margin: 0 auto; 
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .text-red-500 { color: #ef4444; }
          .mb-2 { margin-bottom: 6px; }
          .mb-4 { margin-bottom: 10px; }
          .mb-6 { margin-bottom: 15px; }
          .mt-4 { margin-top: 10px; }
          .mt-6 { margin-top: 15px; }
          .my-4 { margin: 10px 0; }
          .text-2xl { font-size: 20px; }
          .text-lg { font-size: 16px; }
          .text-sm { font-size: 11px; }
          .font-bold { font-weight: bold; }
          .text-gray-600 { color: #666; }
          
          .header-section {
            flex-shrink: 0;
          }
          
          .content-section {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }
          
          .footer-section {
            flex-shrink: 0;
            margin-top: auto;
          }
          
          .info-table { 
            width: 100%; 
            margin-bottom: 8px;
            border-collapse: collapse;
          }
          .info-table td { 
            padding: 2px 6px; 
            border-bottom: 1px solid #eee;
            font-size: 11px;
          }
          .info-table td:first-child { 
            width: 120px; 
            font-weight: bold;
          }
          
          .details-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 10px;
            font-size: 11px;
          }
          .details-table th, 
          .details-table td { 
            border: 1px solid #ddd; 
            padding: 4px 6px; 
          }
          .details-table th { 
            background-color: #f2f2f2; 
            font-weight: bold; 
            text-align: center;
            font-size: 11px;
          }
          
          .total-table { 
            width: 250px; 
            margin-left: auto; 
            border-collapse: collapse;
            font-size: 11px;
          }
          .total-table td { 
            padding: 4px 6px; 
            border-bottom: 1px solid #ddd;
          }
          .final-total td { 
            border-top: 2px solid #000; 
            font-size: 13px; 
            font-weight: bold;
          }
          
          hr { 
            border: none; 
            border-top: 1px solid #ddd; 
            margin: 8px 0;
          }
          
          h3 {
            font-size: 13px;
            margin: 8px 0 4px 0;
          }
          
          .order-info, .customer-info, .order-details {
            margin-bottom: 8px;
          }
          
          .total-section {
            margin-bottom: 8px;
          }
          
          .notes {
            margin-bottom: 8px;
          }
          
          .notes p {
            font-size: 11px;
            margin: 2px 0;
          }
          
          @media print {
            body { 
              margin: 0; 
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .no-print { display: none; }
            
            @page {
              size: A4;
              margin: 15mm;
            }
            
            .print-content {
              page-break-inside: avoid;
              height: auto;
              min-height: 100vh;
            }
            
            .details-table {
              page-break-inside: avoid;
            }
            
            .total-section {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
      printLoading.value = false;
      message.success('In đơn hàng thành công!');
    }, 250);
  };

  return {
    printLoading,
    printOrderDetails
  };
};