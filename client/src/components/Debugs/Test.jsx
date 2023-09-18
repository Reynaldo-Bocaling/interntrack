import React from 'react';
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define your styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Create your PDF content component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Sample PDF Export</Text>
        <Text style={styles.content}>This is some sample content in your PDF.</Text>
        {/* Add more content here */}
      </View>
    </Page>
  </Document>
);

// Create your export function
const exportPDF = () => {
  return (
    <PDFDownloadLink document={<MyDocument />} fileName="sample.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
  );
};

// Your main component
const ExportPDF = () => {
  return (
    <div>
      <PDFViewer width="100%" height="500">
        <MyDocument />
      </PDFViewer>
      {exportPDF()}
    </div>
  );
};

export default ExportPDF;
