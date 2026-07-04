import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const s = StyleSheet.create({
  page: { padding: 48, paddingBottom: 180, fontSize: 10, fontFamily: 'Helvetica', color: '#111', backgroundColor: '#fff' },

  // Header
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  logo: { width: 120, height: 48, objectFit: 'contain' },
  logoText: { fontSize: 28, fontFamily: 'Helvetica-Bold' },
  documentTitle: { fontSize: 32, fontFamily: 'Helvetica-Bold', textAlign: 'right' },

  // Company + meta
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 },
  companyText: { fontSize: 9, color: '#333', lineHeight: 1.6 },
  metaLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#111', marginBottom: 2 },
  metaValue: { fontSize: 9, color: '#333', marginBottom: 6 },

  // Quote To
  billLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#666', marginBottom: 4, letterSpacing: 0.5 },
  clientName: { fontSize: 9, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  clientText: { fontSize: 9, color: '#333', lineHeight: 1.6 },

  spacer: { marginBottom: 24 },
  dividerHeavy: { borderBottomWidth: 1, borderColor: '#111', marginVertical: 6 },

  // Table
  tableHeaderRow: { flexDirection: 'row', paddingBottom: 6, borderBottomWidth: 1, borderColor: '#111', marginBottom: 4 },
  tableRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 0.5, borderColor: '#eee' },
  colImg: { width: 60, marginRight: 10 },
  itemImage: { width: 60, height: 60, objectFit: 'contain', backgroundColor: '#f9fafb', borderRadius: 2 },
  colDesc: { flex: 4, fontSize: 9 },
  colQty: { flex: 1, textAlign: 'right', fontSize: 9 },
  colPrice: { flex: 1.5, textAlign: 'right', fontSize: 9 },
  colTotal: { flex: 1.5, textAlign: 'right', fontSize: 9 },
  tableHead: { fontFamily: 'Helvetica-Bold', fontSize: 8, letterSpacing: 0.5 },

  // Totals
  totalsBlock: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 },
  totalsInner: { width: 220 },
  totalsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  totalsLabel: { fontSize: 9, fontFamily: 'Helvetica-Bold' },
  totalsValue: { fontSize: 9 },
  totalAmountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 },
  totalAmountLabel: { fontSize: 10, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5 },
  totalAmountValue: { fontSize: 9, fontFamily: 'Helvetica-Bold' },

  // Absolute footer
  footer: { position: 'absolute', bottom: 48, left: 48, right: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  paymentLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5, marginBottom: 3 },
  paymentText: { fontSize: 9, color: '#333', marginBottom: 6 },
});

interface QuotationPDFProps {
  details: {
    quotationNumber: string;
    date: string;
    validUntil: string;
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
    currency: string;
    taxLabel: string;
    taxRate: number;
    logoUrl: string;
    mode: 'basic' | 'advanced';
  };
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    rate: number;
    imageUrl?: string;
  }>;
}

export default function QuotationPDF({ details, items }: QuotationPDFProps) {
  const subtotal = items.reduce((acc, item) => acc + ((item.quantity || 0) * (item.rate || 0)), 0);
  const applyTax = details.taxRate > 0;
  const taxAmount = applyTax ? subtotal * (details.taxRate / 100) : 0;
  const total = subtotal + taxAmount;
  const quoteNum = details.quotationNumber || 'DRAFT';

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Header: Logo | QUOTATION ── */}
        <View style={s.headerRow}>
          <View>
            {details.logoUrl
              ? <Image src={details.logoUrl} style={s.logo} />
              : (details.fromName ? <Text style={s.logoText}>{details.fromName}</Text> : null)
            }
          </View>
          <Text style={s.documentTitle}>QUOTATION</Text>
        </View>

        {/* ── Company details | Meta ── */}
        <View style={s.metaRow}>
          <View>
            {details.logoUrl && details.fromName && <Text style={[s.companyText, { fontFamily: 'Helvetica-Bold', marginBottom: 2 }]}>{details.fromName.toUpperCase()}</Text>}
            {details.fromABN && <Text style={s.companyText}>ABN: {details.fromABN.replace(/^ABN:\s*/i, '')}</Text>}
            {details.fromAddress && details.fromAddress.split('\n').map((line, i) => <Text key={`fromA-${i}`} style={s.companyText}>{line}</Text>)}
            {details.fromEmail && <Text style={s.companyText}>{details.fromEmail}</Text>}
            {details.fromPhone && <Text style={s.companyText}>{details.fromPhone}</Text>}
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.metaLabel}>QUOTE #:</Text>
            <Text style={s.metaValue}>{quoteNum}</Text>
            <Text style={s.metaLabel}>DATE:</Text>
            <Text style={s.metaValue}>{details.date}</Text>
            {details.validUntil && <>
              <Text style={s.metaLabel}>VALID UNTIL:</Text>
              <Text style={s.metaValue}>{details.validUntil}</Text>
            </>}
          </View>
        </View>

        {/* ── Quote To ── */}
        <View style={s.spacer}>
          <Text style={s.billLabel}>QUOTE FOR:</Text>
          {details.toName && <Text style={s.clientName}>{details.toName.toUpperCase()}</Text>}
          {details.toABN && <Text style={s.clientText}>ABN: {details.toABN.replace(/^ABN:\s*/i, '')}</Text>}
          {details.toAddress && details.toAddress.split('\n').map((line, i) => <Text key={`toA-${i}`} style={s.clientText}>{line}</Text>)}
          {details.toEmail && <Text style={s.clientText}>{details.toEmail}</Text>}
          {details.toPhone && <Text style={s.clientText}>{details.toPhone}</Text>}
        </View>

        {/* ── Line items table ── */}
        <View style={s.tableHeaderRow}>
          {details.mode === 'advanced' && <View style={s.colImg}><Text style={s.tableHead}>DESIGN</Text></View>}
          <Text style={[s.colDesc, s.tableHead]}>DESCRIPTION</Text>
          <Text style={[s.colQty, s.tableHead]}>QTY</Text>
          <Text style={[s.colPrice, s.tableHead]}>PRICE</Text>
          <Text style={[s.colTotal, s.tableHead]}>TOTAL</Text>
        </View>
        
        {items.map((item, i) => (
          <View key={i} style={s.tableRow}>
            {details.mode === 'advanced' && (
              <View style={s.colImg}>
                {item.imageUrl ? <Image src={item.imageUrl} style={s.itemImage} /> : <View style={s.itemImage} />}
              </View>
            )}
            <Text style={s.colDesc}>{item.description}</Text>
            <Text style={s.colQty}>{item.quantity}</Text>
            <Text style={s.colPrice}>{details.currency}{(item.rate || 0).toFixed(2)}</Text>
            <Text style={s.colTotal}>{details.currency}{((item.quantity || 0) * (item.rate || 0)).toFixed(2)}</Text>
          </View>
        ))}

        {/* ── Totals ── */}
        <View style={s.totalsBlock} wrap={false}>
          <View style={s.totalsInner}>
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>SUBTOTAL</Text>
              <Text style={s.totalsValue}>{details.currency}{subtotal.toFixed(2)}</Text>
            </View>
            {applyTax && (
              <View style={s.totalsRow}>
                <Text style={s.totalsLabel}>{details.taxLabel ? details.taxLabel.toUpperCase() : 'TAX'}</Text>
                <Text style={s.totalsValue}>{details.currency}{taxAmount.toFixed(2)}</Text>
              </View>
            )}
            <View style={s.dividerHeavy} />
            <View style={s.totalAmountRow}>
              <Text style={s.totalAmountLabel}>TOTAL AMOUNT</Text>
              <Text style={s.totalAmountValue}>{details.currency}{total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* ── Absolute footer: Notes/Terms ── */}
        <View style={[s.footer, { alignItems: 'flex-start' }]} fixed>
          <View style={{ flex: 1 }}>
            <Text style={s.paymentLabel}>NOTES / TERMS</Text>
            <Text style={s.paymentText}>{details.notes || 'Thank you for the opportunity to quote.'}</Text>
          </View>
        </View>

      </Page>
    </Document>
  )
}
