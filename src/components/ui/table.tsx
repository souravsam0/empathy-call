import * as React from "react";
import { View, Text, ScrollView, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface TableProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const Table = React.forwardRef<ScrollView, TableProps>(
  ({ style, children, ...props }, ref) => (
    <ScrollView
      ref={ref}
      style={[styles.tableContainer, style]}
      {...props}
    >
      <View style={styles.table}>
        {children}
      </View>
    </ScrollView>
  )
);
Table.displayName = "Table";

interface TableHeaderProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const TableHeader = React.forwardRef<View, TableHeaderProps>(
  ({ style, children, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.tableHeader, style]}
      {...props}
    >
      {children}
    </View>
  )
);
TableHeader.displayName = "TableHeader";

interface TableBodyProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const TableBody = React.forwardRef<View, TableBodyProps>(
  ({ style, children, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.tableBody, style]}
      {...props}
    >
      {children}
    </View>
  )
);
TableBody.displayName = "TableBody";

interface TableFooterProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const TableFooter = React.forwardRef<View, TableFooterProps>(
  ({ style, children, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.tableFooter, style]}
      {...props}
    >
      {children}
    </View>
  )
);
TableFooter.displayName = "TableFooter";

interface TableRowProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const TableRow = React.forwardRef<View, TableRowProps>(
  ({ style, children, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.tableRow, style]}
      {...props}
    >
      {children}
    </View>
  )
);
TableRow.displayName = "TableRow";

interface TableHeadProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const TableHead = React.forwardRef<View, TableHeadProps>(
  ({ style, textStyle, children, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.tableHead, style]}
      {...props}
    >
      <Text style={[styles.tableHeadText, textStyle]}>
        {children}
      </Text>
    </View>
  )
);
TableHead.displayName = "TableHead";

interface TableCellProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const TableCell = React.forwardRef<View, TableCellProps>(
  ({ style, textStyle, children, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.tableCell, style]}
      {...props}
    >
      <Text style={[styles.tableCellText, textStyle]}>
        {children}
      </Text>
    </View>
  )
);
TableCell.displayName = "TableCell";

interface TableCaptionProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const TableCaption = React.forwardRef<View, TableCaptionProps>(
  ({ style, textStyle, children, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.tableCaption, style]}
      {...props}
    >
      <Text style={[styles.tableCaptionText, textStyle]}>
        {children}
      </Text>
    </View>
  )
);
TableCaption.displayName = "TableCaption";

const styles = StyleSheet.create({
  tableContainer: {
    width: "100%",
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableBody: {
    width: "100%",
  },
  tableFooter: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableHead: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  tableHeadText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  tableCell: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  tableCellText: {
    fontSize: 14,
    color: "#1f2937",
  },
  tableCaption: {
    marginTop: 16,
    padding: 16,
  },
  tableCaptionText: {
    fontSize: 14,
    color: "#6b7280",
  },
});

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
