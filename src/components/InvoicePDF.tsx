import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingBottom: 100, // Space for fixed footer
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
    backgroundColor: '#ffffff'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  logo: {
    maxHeight: 50,
    maxWidth: 140,
    marginBottom: 10,
    objectFit: 'contain'
  },
  companyName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 0
  },
  textContent: {
    color: '#1a1a1a',
    fontSize: 10,
    marginBottom: 1.5
  },
  title: {
    fontSize: 22,
    color: '#1a1a1a',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    letterSpacing: 1,
    marginBottom: 15
  },
  metaLabel: {
    color: '#1a1a1a',
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    marginTop: 2,
    marginBottom: 0
  },
  metaValue: {
    color: '#1a1a1a',
    fontSize: 10,
    textAlign: 'right',
    marginBottom: 0
  },
  billToTitle: {
    color: '#1a1a1a',
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 2
  },
  clientName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3
  },
  billToSection: {
    marginBottom: 20
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: 4,
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
    fontSize: 9
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #f3f4f6',
    paddingVertical: 4,
    fontSize: 9
  },
  colDesc: { flex: 4 },
  colQty: { flex: 1, textAlign: 'center' },
  colRate: { flex: 1.5, textAlign: 'right' },
  colAmt: { flex: 1.5, textAlign: 'right' },
  totalsSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontSize: 9
  },
  totalsBox: {
    width: 180
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  totalRowFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    fontFamily: 'Helvetica-Bold',
    borderTop: '1px solid #1a1a1a',
    marginTop: 2
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    flexDirection: 'row',
    gap: 40,
    paddingTop: 10
  },
  footerCol: {
    flex: 1
  },
  footerTitle: {
    color: '#1a1a1a',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 2
  },
  footerText: {
    color: '#1a1a1a',
    fontSize: 9,
    lineHeight: 1.2
  }
});

interface InvoicePDFProps {
  details: {
    invoiceNumber: string;
    date: string;
    dueDate: string;
    fromName: string;
    fromABN: string;
    fromPhone: string;
    fromEmail: string;
    fromAddress: string;
    toName: string;
    toABN: string;
    toPhone: string;
    toEmail: string;
    toAddress: string;
    notes: string;
    bankDetails: string;
    currency: string;
    taxLabel: string;
    taxRate: number;
    logoUrl: string;
  };
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    rate: number;
  }>;
}

export default function InvoicePDF({ details, items }: InvoicePDFProps) {
  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const taxAmount = subtotal * (details.taxRate / 100);
  const total = subtotal + taxAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1, paddingRight: 20 }}>
            {details.logoUrl ? (
              <Image src={details.logoUrl} style={styles.logo} />
            ) : null}
            {details.fromName ? <Text style={styles.companyName}>{details.fromName}</Text> : null}
            {details.fromABN && <Text style={styles.textContent}>ABN: {details.fromABN.replace(/^ABN:\s*/i, '')}</Text>}
            {details.fromAddress && details.fromAddress.split('\n').map((line, i) => <Text key={`fromA-${i}`} style={styles.textContent}>{line}</Text>)}
            {details.fromEmail && <Text style={styles.textContent}>{details.fromEmail}</Text>}
            {details.fromPhone && <Text style={styles.textContent}>{details.fromPhone}</Text>}
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.title}>INVOICE</Text>
            
            <Text style={styles.metaLabel}>INVOICE #:</Text>
            <Text style={styles.metaValue}>{details.invoiceNumber}</Text>
            
            <Text style={styles.metaLabel}>ISSUED:</Text>
            <Text style={styles.metaValue}>{details.date}</Text>
            
            <Text style={styles.metaLabel}>DUE:</Text>
            <Text style={styles.metaValue}>{details.dueDate}</Text>
          </View>
        </View>

        <View style={styles.billToSection}>
          <Text style={styles.billToTitle}>BILL TO:</Text>
          {details.toName ? <Text style={styles.clientName}>{details.toName}</Text> : null}
          {details.toABN && <Text style={styles.textContent}>ABN: {details.toABN.replace(/^ABN:\s*/i, '')}</Text>}
          {details.toAddress && details.toAddress.split('\n').map((line, i) => <Text key={`toA-${i}`} style={styles.textContent}>{line}</Text>)}
          {details.toEmail && <Text style={styles.textContent}>{details.toEmail}</Text>}
          {details.toPhone && <Text style={styles.textContent}>{details.toPhone}</Text>}
        </View>

        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>DESCRIPTION</Text>
            <Text style={styles.colQty}>QTY</Text>
            <Text style={styles.colRate}>PRICE</Text>
            <Text style={styles.colAmt}>TOTAL</Text>
          </View>

          {items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colRate}>{details.currency}{(item.rate || 0).toFixed(2)}</Text>
              <Text style={styles.colAmt}>{details.currency}{((item.quantity || 0) * (item.rate || 0)).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsSection} wrap={false}>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>SUBTOTAL</Text>
              <Text>{details.currency}{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>{details.taxLabel ? details.taxLabel.toUpperCase() : 'TAX'}</Text>
              <Text>{details.currency}{taxAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRowFinal}>
              <Text>TOTAL AMOUNT</Text>
              <Text>{details.currency}{total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <View style={styles.footerCol}>
            <Text style={styles.footerTitle}>BANK DETAILS</Text>
            <Text style={styles.footerText}>{details.bankDetails}</Text>
          </View>
          <View style={[styles.footerCol, { alignItems: 'flex-end', textAlign: 'right' }]}>
            <Text style={styles.footerTitle}>PAYMENT INFORMATION</Text>
            <Text style={styles.footerText}>{details.notes}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
